
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Type, Volume2, Music } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

const NewProject = () => {
  const [text, setText] = useState("");
  const [projectName, setProjectName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const { toast } = useToast();

  const handleTextUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, we'd parse the file content
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been uploaded`,
        });
      };
      reader.readAsText(file);
    }
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
              <Upload className="h-4 w-4" />
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
          <Card>
            <CardHeader>
              <CardTitle>Upload a Document</CardTitle>
              <CardDescription>
                Upload a .txt or .docx file containing your text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-lg p-10 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Drag and drop your file here</h3>
                    <p className="text-sm text-muted-foreground">
                      Supported formats: .txt, .docx
                    </p>
                  </div>
                  <label className="cursor-pointer">
                    <Input 
                      type="file" 
                      className="hidden"
                      accept=".txt,.docx" 
                      onChange={handleTextUpload}
                    />
                    <Button variant="outline">Select File</Button>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
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
                      <Select defaultValue="conversational">
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
                      <Select defaultValue="female">
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
                      <Select defaultValue="medium">
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
                      <Select defaultValue="cinematic">
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
                      <Select defaultValue="ambient">
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
                      <Select defaultValue="16:9">
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
                <Button className="w-full md:w-auto">
                  Generate Video
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NewProject;
