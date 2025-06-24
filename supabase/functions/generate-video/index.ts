import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Replicate from "https://esm.sh/replicate@0.25.2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const REPLICATE_API_KEY = Deno.env.get('REPLICATE_API_KEY')
    console.log('API Key retrieved:', REPLICATE_API_KEY ? 'Present' : 'Missing')
    
    if (!REPLICATE_API_KEY) {
      throw new Error('REPLICATE_API_KEY is not set')
    }

    const replicate = new Replicate({
      auth: REPLICATE_API_KEY,
    })

    const body = await req.json()
    console.log("Request body:", body)

    // If it's a status check request
    if (body.predictionId) {
      console.log("Checking status for prediction:", body.predictionId)
      const prediction = await replicate.predictions.get(body.predictionId)
      console.log("Status check response:", prediction)
      return new Response(JSON.stringify(prediction), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // If it's a video generation request
    if (!body.text || !body.projectName) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: text and projectName are required" 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    console.log("Generating video with text:", body.text)
    
    // Parse aspect ratio for width and height
    const [widthStr, heightStr] = body.aspectRatio?.split(':') || ['16', '9']
    const aspectWidth = parseInt(widthStr) || 16
    const aspectHeight = parseInt(heightStr) || 9
    
    // Calculate dimensions based on aspect ratio (keeping reasonable sizes)
    let width = 512
    let height = 512
    
    if (aspectWidth > aspectHeight) {
      // Landscape
      width = 576
      height = Math.round(576 * aspectHeight / aspectWidth)
    } else if (aspectHeight > aspectWidth) {
      // Portrait
      height = 576
      width = Math.round(576 * aspectWidth / aspectHeight)
    }
    
    // Using zeroscope text-to-video model
    const prediction = await replicate.predictions.create({
      version: "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      input: {
        prompt: body.text,
        model_name: "zeroscope_v2_XL",
        width: width,
        height: height,
        num_frames: 24,
        num_inference_steps: 50,
        guidance_scale: 17.5,
        use_float16: true
      }
    })

    console.log("Video generation started:", prediction)
    return new Response(JSON.stringify({ 
      predictionId: prediction.id,
      status: prediction.status 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error("Error in generate-video function:", error)
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.toString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
