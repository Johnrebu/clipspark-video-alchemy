
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Play } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  projectName: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, projectName }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `${projectName.replace(/\s+/g, '_')}_video.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5 text-brand-purple" />
          Generated Video
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video 
            controls 
            className="w-full h-auto max-h-96"
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex justify-center">
          <Button onClick={handleDownload} variant="outline" className="flex gap-2">
            <Download className="h-4 w-4" />
            Download Video
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
