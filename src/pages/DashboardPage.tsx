import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';

// Mock project data
const initialProjects = [
  {
    id: 'proj-12345',
    name: 'E-commerce Landing Page',
    lastModified: '2 days ago',
  },
  {
    id: 'proj-67890',
    name: 'Internal Admin Panel',
    lastModified: '5 hours ago',
  },
  {
    id: 'proj-abcde',
    name: 'Marketing Campaign Tracker',
    lastModified: '1 week ago',
  },
];

interface Project {
  id: string;
  name: string;
  lastModified: string;
}

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [newProjectName, setNewProjectName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteProject = (id: string) => {
    setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
  };

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      // Basic validation
      alert('Project name cannot be empty.');
      return;
    }
    const newProject = {
      id: `proj-${Date.now()}`,
      name: newProjectName,
      lastModified: 'Just now',
    };
    // In a real app, you'd send this to a backend.
    // Here we just update local state and navigate.
    setProjects((prev) => [...prev, newProject]);
    setNewProjectName('');
    setIsDialogOpen(false); // Close dialog
    navigate(`/app-editor?id=${newProject.id}`); // Navigate to editor page, path from App.tsx
  };

  const CreateProjectDialog = (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New App
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Application</DialogTitle>
          <DialogDescription>
            Give your new project a name. You can change this later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-name" className="text-right">
              Name
            </Label>
            <Input
              id="project-name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., My Awesome App"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
             <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleCreateProject}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
            {CreateProjectDialog}
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  lastModified={project.lastModified}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 mt-16 bg-background">
              <h2 className="text-xl font-semibold text-foreground mb-2">You have no projects yet!</h2>
              <p className="text-muted-foreground mb-6">
                Get started by creating your first application.
              </p>
              <DialogTrigger asChild>
                 <Button size="lg">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Your First App
                </Button>
              </DialogTrigger>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;