
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Search, MoreVertical, Edit, Trash, Copy, Download, Share } from 'lucide-react';

// Mock data for projects
const projects = [
  { 
    id: 1, 
    title: 'Product Launch Video', 
    created: '2023-09-15', 
    duration: '1:30', 
    status: 'completed', 
    resolution: '1080p'
  },
  { 
    id: 2, 
    title: 'Marketing Campaign for Q4', 
    created: '2023-09-10', 
    duration: '2:15', 
    status: 'completed', 
    resolution: '720p'
  },
  { 
    id: 3, 
    title: 'Website Tutorial Series', 
    created: '2023-09-05', 
    duration: '4:00', 
    status: 'in-progress', 
    resolution: '1080p'
  },
  { 
    id: 4, 
    title: 'Customer Testimonial', 
    created: '2023-08-28', 
    duration: '1:45', 
    status: 'completed', 
    resolution: '1080p'
  },
  { 
    id: 5, 
    title: 'Year-End Review', 
    created: '2023-08-15', 
    duration: '3:20', 
    status: 'draft', 
    resolution: '720p'
  },
];

const Projects = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">My Projects</h2>
          <p className="text-muted-foreground mt-1">Manage and organize your video projects</p>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-8" />
          </div>
          <Button asChild>
            <a href="/new">Create New</a>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Resolution</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.created}</TableCell>
                  <TableCell>{project.duration}</TableCell>
                  <TableCell>{project.resolution}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === 'completed' 
                          ? 'default' 
                          : project.status === 'in-progress'
                            ? 'outline'
                            : 'secondary'
                      }
                    >
                      {project.status === 'completed' && 'Completed'}
                      {project.status === 'in-progress' && 'In Progress'}
                      {project.status === 'draft' && 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Copy className="h-4 w-4" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Share className="h-4 w-4" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Download className="h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                          <Trash className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Projects;
