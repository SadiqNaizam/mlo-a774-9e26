import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface ProjectCardProps {
  id: string;
  name: string;
  lastModified: string; // e.g., "2 days ago"
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, lastModified, onDelete }) => {
  const { toast } = useToast();
  console.log(`ProjectCard loaded for: ${name}`);

  const handleDelete = () => {
    onDelete(id);
    toast({
      title: "Project Deleted",
      description: `The project "${name}" has been successfully deleted.`,
    });
  };

  return (
    <Card className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold truncate">{name}</CardTitle>
        <CardDescription>Last modified: {lastModified}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Can add a preview or more details here in the future */}
        <div className="text-sm text-muted-foreground">
          This card represents your application. Click 'Edit' to open it in the editor.
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4 border-t">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                project "{name}" and remove all its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button asChild size="sm">
          <Link to={`/app-editor?id=${id}`}> {/* Passing ID as a query param for now */}
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;