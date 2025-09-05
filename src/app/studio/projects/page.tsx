
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Trash2, Pencil, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
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
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";


type Project = { 
    id: string; 
    title: string; 
    description: string; 
    status: 'draft' | 'published';
};


export default function ProjectsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

   useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const fetchData = async () => {
    if (user) {
      setLoading(true);
      try {
        const projectsCollection = collection(firestore, 'portfolio');
        const projectsQuery = query(projectsCollection, orderBy('createdAt', 'desc'));
        const projectsSnapshot = await getDocs(projectsQuery);
        const projectsList = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(projectsList);

      } catch (error) {
        console.error("Error fetching data: ", error);
        toast({ title: "Error", description: "Failed to fetch projects.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async (projectId: string, title: string) => {
    try {
        await deleteDoc(doc(firestore, 'portfolio', projectId));
        toast({
            title: `Project Deleted`,
            description: `The project "${title}" has been successfully deleted.`,
        });
        fetchData(); 
    } catch (error) {
        console.error(`Error deleting project:`, error);
        toast({ title: "Error", description: "Failed to delete the project.", variant: "destructive" });
    }
  };

  const handlePublish = async (projectId: string, title: string) => {
    try {
      const projectRef = doc(firestore, "portfolio", projectId);
      await updateDoc(projectRef, {
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Project Published!",
        description: `"${title}" is now live.`,
      });
      fetchData();
    } catch (error) {
      console.error("Error publishing project:", error);
      toast({ title: "Error", description: "Failed to publish project.", variant: "destructive" });
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`/studio/projects/edit/${id}`);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
     <div className="flex-1 w-full space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Portfolio Projects</h2>
                <p className="text-muted-foreground">Showcase your best work.</p>
            </div>
            <Link href="/studio/projects/new">
                <Button><PlusCircle className="mr-2 h-4 w-4" />New Project</Button>
            </Link>
        </div>
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {projects.length > 0 ? projects.map((project) => (
                        <TableRow key={project.id} onClick={() => handleRowClick(project.id)} className="cursor-pointer">
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>
                            <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                                {project.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="max-w-sm truncate text-muted-foreground">{project.description}</TableCell>
                        <TableCell className="text-right">
                            <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/studio/projects/edit/${project.id}`}>
                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    {project.status === 'draft' && (
                                        <DropdownMenuItem onClick={() => handlePublish(project.id, project.title)}>
                                            <Send className="mr-2 h-4 w-4" /> Publish
                                        </DropdownMenuItem>
                                    )}
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem className="text-red-500 focus:text-red-500" onSelect={(e) => e.preventDefault()}>
                                            <Trash2 className="mr-2 h-4 w-4" />Delete
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the project titled "{project.title}".</AlertDialogDescription></AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(project.id, project.title)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                        </TableRow>
                    )) : <TableRow><TableCell colSpan={4} className="h-24 text-center">No projects yet.</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
