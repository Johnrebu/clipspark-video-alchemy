
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VideoGenerationOptions {
  text: string;
  projectName: string;
  voiceStyle?: string;
  voiceGender?: string;
  narrationSpeed?: string;
  videoStyle?: string;
  musicType?: string;
  aspectRatio?: string;
}

export const useVideoGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const { toast } = useToast();

  const generateVideo = async (options: VideoGenerationOptions) => {
    try {
      setIsGenerating(true);
      setGenerationStatus('Starting video generation...');

      console.log('Starting video generation with options:', options);

      // Start video generation
      const { data, error } = await supabase.functions.invoke('generate-video', {
        body: options
      });

      if (error) {
        throw error;
      }

      console.log('Video generation response:', data);

      if (data.predictionId) {
        setGenerationStatus('Video generation in progress...');
        await pollForCompletion(data.predictionId);
      }
    } catch (error: any) {
      console.error('Error generating video:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate video",
        variant: "destructive",
      });
      setIsGenerating(false);
      setGenerationStatus('');
    }
  };

  const pollForCompletion = async (predictionId: string) => {
    const maxAttempts = 60; // 5 minutes max
    let attempts = 0;

    const poll = async () => {
      try {
        attempts++;
        console.log(`Polling attempt ${attempts} for prediction ${predictionId}`);

        const { data, error } = await supabase.functions.invoke('generate-video', {
          body: { predictionId }
        });

        if (error) {
          throw error;
        }

        console.log('Polling response:', data);

        if (data.status === 'succeeded') {
          setVideoUrl(data.output?.[0] || data.output);
          setGenerationStatus('Video generated successfully!');
          setIsGenerating(false);
          toast({
            title: "Success",
            description: "Your video has been generated successfully!",
          });
          return;
        } else if (data.status === 'failed') {
          throw new Error(data.error || 'Video generation failed');
        } else if (data.status === 'canceled') {
          throw new Error('Video generation was canceled');
        } else {
          // Still processing
          setGenerationStatus(`Processing... (${data.status})`);
          if (attempts < maxAttempts) {
            setTimeout(poll, 5000); // Poll every 5 seconds
          } else {
            throw new Error('Video generation timed out');
          }
        }
      } catch (error: any) {
        console.error('Error polling for completion:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to check video status",
          variant: "destructive",
        });
        setIsGenerating(false);
        setGenerationStatus('');
      }
    };

    poll();
  };

  return {
    generateVideo,
    isGenerating,
    generationStatus,
    videoUrl,
  };
};
