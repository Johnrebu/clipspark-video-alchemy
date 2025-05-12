
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="export">Export Options</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="animate-fade-in space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Your full name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Your email" defaultValue="john.doe@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Company name" defaultValue="Acme Inc" />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Badge>Free Plan</Badge>
                <Button variant="outline">Update Account</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Update your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter your current password" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <Button variant="outline">Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the appearance of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer bg-brand-dark-purple">
                    <div className="w-full h-10 bg-background rounded-md"></div>
                    <span className="text-sm">Dark (Default)</span>
                    <Badge>Active</Badge>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer bg-white">
                    <div className="w-full h-10 bg-slate-100 rounded-md"></div>
                    <span className="text-sm text-slate-900">Light</span>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer bg-gradient-to-r from-slate-900 to-slate-700">
                    <div className="w-full h-10 bg-slate-800 rounded-md"></div>
                    <span className="text-sm">System</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Other Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animation">Interface Animations</Label>
                    <Switch id="animation" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound">Interface Sounds</Label>
                    <Switch id="sound" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sidebar">Always Show Sidebar</Label>
                    <Switch id="sidebar" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API integrations with third-party services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="elevenlabsKey">ElevenLabs API Key</Label>
                    <Badge variant="outline" className="text-brand-purple">Text-to-Speech</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input id="elevenlabsKey" type="password" placeholder="Enter your ElevenLabs API key" defaultValue="•••••••••••••••••" className="flex-1" />
                    <Button variant="outline">Verify</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pexelsKey">Pexels API Key</Label>
                    <Badge variant="outline" className="text-brand-purple">Stock Media</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input id="pexelsKey" type="password" placeholder="Enter your Pexels API key" className="flex-1" />
                    <Button variant="outline">Verify</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="openaiKey">OpenAI API Key</Label>
                    <Badge variant="outline" className="text-brand-purple">Text Analysis</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input id="openaiKey" type="password" placeholder="Enter your OpenAI API key" className="flex-1" />
                    <Button variant="outline">Verify</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Export Settings</CardTitle>
              <CardDescription>
                Configure default settings for video exports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Export Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="resolution">Resolution</Label>
                    <select id="resolution" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="1080p">1080p (Full HD)</option>
                      <option value="720p">720p (HD)</option>
                      <option value="480p">480p (SD)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format">Format</Label>
                    <select id="format" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="mp4">MP4</option>
                      <option value="webm">WebM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frameRate">Frame Rate</Label>
                  <select id="frameRate" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option value="30">30 fps</option>
                    <option value="60">60 fps</option>
                    <option value="24">24 fps (Cinematic)</option>
                  </select>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="watermark">Include Watermark</Label>
                    <Switch id="watermark" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="subtitles">Generate Subtitles</Label>
                    <Switch id="subtitles" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Media Export Presets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">YouTube</p>
                      <Switch id="youtube" defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground">1080p, 16:9, MP4</p>
                  </div>
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Instagram</p>
                      <Switch id="instagram" />
                    </div>
                    <p className="text-xs text-muted-foreground">1080x1080, 1:1, MP4</p>
                  </div>
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">TikTok</p>
                      <Switch id="tiktok" />
                    </div>
                    <p className="text-xs text-muted-foreground">1080x1920, 9:16, MP4</p>
                  </div>
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">LinkedIn</p>
                      <Switch id="linkedin" />
                    </div>
                    <p className="text-xs text-muted-foreground">1080p, 16:9, MP4</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
