
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
    let REPLICATE_API_KEY = Deno.env.get('REPLICATE_API_KEY')
    console.log('Raw API Key retrieved:', REPLICATE_API_KEY ? 'Present' : 'Missing')
    console.log('API Key length:', REPLICATE_API_KEY?.length || 0)
    
    if (!REPLICATE_API_KEY) {
      throw new Error('REPLICATE_API_KEY is not set in Supabase secrets')
    }

    // Clean the API key - remove any export statements or extra text
    REPLICATE_API_KEY = REPLICATE_API_KEY.trim()
    
    // If the key contains "export" or "=" it means it's the full export statement
    if (REPLICATE_API_KEY.includes('export') || REPLICATE_API_KEY.includes('=')) {
      console.log('API key contains export statement, extracting actual key...')
      // Extract just the key part after the equals sign
      const keyMatch = REPLICATE_API_KEY.match(/r8_[A-Za-z0-9]+/)
      if (keyMatch) {
        REPLICATE_API_KEY = keyMatch[0]
        console.log('Extracted key:', REPLICATE_API_KEY.substring(0, 10) + '...')
      } else {
        throw new Error('Could not extract valid API key from the secret value')
      }
    }

    // Validate API key format
    if (!REPLICATE_API_KEY.startsWith('r8_')) {
      throw new Error('Invalid Replicate API key format. Key should start with "r8_"')
    }

    console.log('Using API key:', REPLICATE_API_KEY.substring(0, 10) + '...')

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
    
    console.log("Creating prediction with dimensions:", { width, height })
    
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
