
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, Video, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock recent projects data
  const recentProjects = [
    { id: 1, title: 'Marketing Video', date: '2 days ago', progress: 100 },
    { id: 2, title: 'Product Demo', date: '1 week ago', progress: 100 },
    { id: 3, title: 'Tutorial Series', date: 'Just now', progress: 70 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Welcome to Text2Video AI</h2>
        <Button asChild>
          <Link to="/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        <Card className="bg-gradient-to-br from-brand-purple/20 to-transparent border border-brand-purple/30">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Create a new video in minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="default" className="w-full" asChild>
                <Link to="/new" className="flex items-center justify-between">
                  <span>New Blank Project</span>
                  <Plus className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                <span>Use Template</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div 
                  key={project.id}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-accent cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-brand-purple" />
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {project.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    {project.progress === 100 ? (
                      <span className="text-xs bg-green-500/20 text-green-500 py-1 px-2 rounded-full">
                        Complete
                      </span>
                    ) : (
                      <span className="text-xs bg-brand-purple/20 text-brand-purple py-1 px-2 rounded-full">
                        {project.progress}% done
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips & Resources</CardTitle>
            <CardDescription>Get the most out of Text2Video AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-accent cursor-pointer">
                <div className="bg-brand-purple/20 p-2 rounded-md">
                  <Zap className="h-4 w-4 text-brand-purple" />
                </div>
                <div>
                  <p className="font-medium">Writing for Video</p>
                  <p className="text-xs text-muted-foreground">Tips to optimize your text</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-accent cursor-pointer">
                <div className="bg-brand-purple/20 p-2 rounded-md">
                  <Video className="h-4 w-4 text-brand-purple" />
                </div>
                <div>
                  <p className="font-medium">Video Style Guide</p>
                  <p className="text-xs text-muted-foreground">Choose the right style</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-accent cursor-pointer">
                <div className="bg-brand-purple/20 p-2 rounded-md">
                  <Zap className="h-4 w-4 text-brand-purple" />
                </div>
                <div>
                  <p className="font-medium">AI Features Tutorial</p>
                  <p className="text-xs text-muted-foreground">Master AI tools</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
