import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Type, Volume2, Music } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { useVideoGeneration } from '@/hooks/useVideoGeneration';
import VideoPlayer from '@/components/VideoPlayer';
import FileUpload from '@/components/FileUpload';

const NewProject = () => {
  const [text, setText] = useState("");
  const [projectName, setProjectName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [voiceStyle, setVoiceStyle] = useState("conversational");
  const [voiceGender, setVoiceGender] = useState("female");
  const [narrationSpeed, setNarrationSpeed] = useState("medium");
  const [videoStyle, setVideoStyle] = useState("cinematic");
  const [musicType, setMusicType] = useState("ambient");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const { toast } = useToast();
  const { generateVideo, isGenerating, generationStatus, videoUrl } = useVideoGeneration();

  const handleTextExtracted = (extractedText: string) => {
    setText(extractedText);
  };

  const analyzeText = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
      toast({
        title: "Analysis complete",
        description: "Your text has been analyzed and is ready for video creation",
      });
    }, 2000);
  };

  const handleGenerateVideo = async () => {
    if (!projectName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }

    await generateVideo({
      text,
      projectName,
      voiceStyle,
      voiceGender,
      narrationSpeed,
      videoStyle,
      musicType,
      aspectRatio,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Create New Project</h2>
        <p className="text-muted-foreground mt-1">Transform your text into engaging videos with AI</p>
      </div>

      <Tabs defaultValue="text" className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="text" className="flex gap-2">
              <Type className="h-4 w-4" />
              Text Input
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex gap-2">
              <Type className="h-4 w-4" />
              Upload File
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <Label htmlFor="projectName">Project Name</Label>
            <Input 
              id="projectName"
              placeholder="Enter project name" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-60"
            />
          </div>
        </div>

        <TabsContent value="text" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Text</CardTitle>
              <CardDescription>
                Type or paste the text you want to convert into a video
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter your text here..." 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="animate-fade-in">
          <FileUpload onTextExtracted={handleTextExtracted} />
        </TabsContent>
      </Tabs>

      {text && (
        <div className="space-y-6 animate-fade-in">
          <Button
            onClick={analyzeText}
            className="w-full md:w-auto"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
          </Button>

          {isAnalyzed && (
            <>
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-brand-purple" />
                      Voice Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="voiceStyle">Voice Style</Label>
                      <Select value={voiceStyle} onValueChange={setVoiceStyle}>
                        <SelectTrigger id="voiceStyle">
                          <SelectValue placeholder="Select voice style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="energetic">Energetic</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="conversational">Conversational</SelectItem>
                          <SelectItem value="calm">Calm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="voiceGender">Voice Gender</Label>
                      <Select value={voiceGender} onValueChange={setVoiceGender}>
                        <SelectTrigger id="voiceGender">
                          <SelectValue placeholder="Select voice gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="narrationSpeed">Narration Speed</Label>
                      <Select value={narrationSpeed} onValueChange={setNarrationSpeed}>
                        <SelectTrigger id="narrationSpeed">
                          <SelectValue placeholder="Select speed" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="fast">Fast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Music className="h-5 w-5 text-brand-purple" />
                      Music & Style
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="videoStyle">Video Style</Label>
                      <Select value={videoStyle} onValueChange={setVideoStyle}>
                        <SelectTrigger id="videoStyle">
                          <SelectValue placeholder="Select video style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cinematic">Cinematic</SelectItem>
                          <SelectItem value="whiteboard">Whiteboard</SelectItem>
                          <SelectItem value="animated">Animated</SelectItem>
                          <SelectItem value="vlog">Vlog</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="musicType">Music Type</Label>
                      <Select value={musicType} onValueChange={setMusicType}>
                        <SelectTrigger id="musicType">
                          <SelectValue placeholder="Select music type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ambient">Ambient</SelectItem>
                          <SelectItem value="upbeat">Upbeat</SelectItem>
                          <SelectItem value="dramatic">Dramatic</SelectItem>
                          <SelectItem value="none">No Music</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                      <Select value={aspectRatio} onValueChange={setAspectRatio}>
                        <SelectTrigger id="aspectRatio">
                          <SelectValue placeholder="Select ratio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                          <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                          <SelectItem value="1:1">Square (1:1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  className="w-full md:w-auto" 
                  onClick={handleGenerateVideo}
                  disabled={isGenerating}
                >
                  {isGenerating ? generationStatus : 'Generate Video'}
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {videoUrl && (
        <div className="space-y-6 animate-fade-in">
          <Separator />
          <VideoPlayer videoUrl={videoUrl} projectName={projectName} />
        </div>
      )}
    </div>
  );
};

export default NewProject;
