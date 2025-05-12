
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, FileText, Settings, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="max-w-3xl w-full px-4 py-12 space-y-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-brand-purple to-blue-500 bg-clip-text text-transparent">
          Text2Video AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Transform your text into engaging video presentations using AI technology
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            size="lg"
            onClick={() => navigate('/new')}
            className="bg-brand-purple hover:bg-brand-purple/90"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/projects')}
          >
            View Examples
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <Video className="h-8 w-8 text-brand-purple mb-2" />
              <CardTitle>Text to Video</CardTitle>
              <CardDescription>
                Instantly transform your written content into professional videos
              </CardDescription>
            </CardHeader>
            <CardContent>
              Our AI-powered tool analyzes your text and converts it into engaging visual presentations.
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-brand-purple mb-2" />
              <CardTitle>Easy Customization</CardTitle>
              <CardDescription>
                Adjust style, voice, music and more with simple controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              Tailor every aspect of your video to match your brand and message perfectly.
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Settings className="h-8 w-8 text-brand-purple mb-2" />
              <CardTitle>Advanced Tools</CardTitle>
              <CardDescription>
                Fine-tune your video with our intuitive editor
              </CardDescription>
            </CardHeader>
            <CardContent>
              Make precise adjustments with our timeline-based editor and export in multiple formats.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
