
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

type Job = { 
  id: string; 
  title: string; 
  location: string; 
  status: 'draft' | 'published';
};

export default function JobsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
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
        const jobsCollection = collection(firestore, "jobs");
        const jobsQuery = query(jobsCollection, orderBy("createdAt", "desc"));
        const jobsSnapshot = await getDocs(jobsQuery);
        const jobsList = jobsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Job));
        setJobs(jobsList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast({
          title: "Error",
          description: "Failed to fetch jobs.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async (jobId: string, title: string) => {
    try {
      await deleteDoc(doc(firestore, "jobs", jobId));
      toast({
        title: `Job Deleted`,
        description: `The job opening for "${title}" has been successfully deleted.`,
      });
      fetchData();
    } catch (error) {
      console.error(`Error deleting job:`, error);
      toast({
        title: "Error",
        description: "Failed to delete the job.",
        variant: "destructive",
      });
    }
  };

  const handlePublish = async (jobId: string, title: string) => {
    try {
      const jobRef = doc(firestore, "jobs", jobId);
      await updateDoc(jobRef, {
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Job Published!",
        description: `"${title}" is now live.`,
      });
      fetchData();
    } catch (error) {
      console.error("Error publishing job:", error);
      toast({ title: "Error", description: "Failed to publish job.", variant: "destructive" });
    }
  };
  
  const handleRowClick = (id: string) => {
    router.push(`/studio/jobs/edit/${id}`);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-full p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Openings</h2>
          <p className="text-muted-foreground">Find your next great hire.</p>
        </div>
        <Link href="/studio/jobs/new">
          <Button><PlusCircle className="mr-2 h-4 w-4" />New Job</Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <TableRow key={job.id} onClick={() => handleRowClick(job.id)} className="cursor-pointer">
                    <TableCell className="font-medium">{job.title}</TableCell>
                     <TableCell>
                        <Badge variant={job.status === 'published' ? 'default' : 'secondary'}>
                            {job.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{job.location}</TableCell>
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
                                <Link href={`/studio/jobs/edit/${job.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </Link>
                            </DropdownMenuItem>
                            {job.status === 'draft' && (
                                <DropdownMenuItem onClick={() => handlePublish(job.id, job.title)}>
                                    <Send className="mr-2 h-4 w-4" /> Publish
                                </DropdownMenuItem>
                            )}
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-red-500 focus:text-red-500" onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the job opening for "{job.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(job.id, job.title)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No job openings yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
