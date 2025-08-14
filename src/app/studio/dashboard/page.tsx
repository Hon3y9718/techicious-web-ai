
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Trash2, Pencil, ExternalLink } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Post = { id: string; title: string; slug: string; createdAt: any; };
type Project = { id: string; title: string; description: string; };
type Job = { id: string; title: string; location: string; };

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
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
        // Fetch Posts
        const postsCollection = collection(firestore, 'blogs');
        const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
        const postsSnapshot = await getDocs(postsQuery);
        const postsList = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
            slug: doc.data().slug,
            createdAt: doc.data().createdAt?.toDate(),
        }));
        setPosts(postsList);

        // Fetch Projects
        const projectsCollection = collection(firestore, 'portfolio');
        const projectsQuery = query(projectsCollection, orderBy('title', 'asc'));
        const projectsSnapshot = await getDocs(projectsQuery);
        const projectsList = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(projectsList);
        
        // Fetch Jobs
        const jobsCollection = collection(firestore, 'jobs');
        const jobsQuery = query(jobsCollection, orderBy('title', 'asc'));
        const jobsSnapshot = await getDocs(jobsQuery);
        const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
        setJobs(jobsList);

      } catch (error) {
        console.error("Error fetching data: ", error);
        toast({ title: "Error", description: "Failed to fetch dashboard data.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async (collectionName: string, docId: string, title: string) => {
    try {
        await deleteDoc(doc(firestore, collectionName, docId));
        toast({
            title: `${title} Deleted`,
            description: `The item has been successfully deleted.`,
        });
        fetchData(); // Refresh all data
    } catch (error) {
        console.error(`Error deleting item from ${collectionName}:`, error);
        toast({ title: "Error", description: "Failed to delete the item.", variant: "destructive" });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Content Dashboard</CardTitle>
          <CardDescription>Manage your website's content here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="posts">
            <TabsList className="mb-4">
              <TabsTrigger value="posts">Blog Posts</TabsTrigger>
              <TabsTrigger value="projects">Portfolio Projects</TabsTrigger>
              <TabsTrigger value="jobs">Job Openings</TabsTrigger>
            </TabsList>
            
            {/* Blog Posts Tab */}
            <TabsContent value="posts">
              <div className="flex justify-end mb-4">
                 <Link href="/studio/write">
                    <Button><PlusCircle className="mr-2 h-4 w-4" />New Post</Button>
                </Link>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Published On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length > 0 ? posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild><Link href={`/blog/${post.slug}`} target="_blank"><ExternalLink className="mr-2 h-4 w-4" />View</Link></DropdownMenuItem>
                              <DropdownMenuItem asChild><Link href={`/studio/write/${post.slug}`}><Pencil className="mr-2 h-4 w-4" />Edit</Link></DropdownMenuItem>
                              <AlertDialogTrigger asChild><DropdownMenuItem className="text-red-500 focus:text-red-500"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem></AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the post titled "{post.title}".</AlertDialogDescription></AlertDialogHeader>
                            <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete('blogs', post.id, 'Post')} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={3} className="h-24 text-center">No posts yet.</TableCell></TableRow>}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Portfolio Projects Tab */}
            <TabsContent value="projects">
               <div className="flex justify-end mb-4">
                 {/* <Link href="/studio/projects/new">
                    <Button><PlusCircle className="mr-2 h-4 w-4" />New Project</Button>
                </Link> */}
              </div>
              <Table>
                 <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.length > 0 ? projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell className="max-w-sm truncate">{project.description}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {/* <DropdownMenuItem asChild><Link href={`/studio/projects/edit/${project.id}`}><Pencil className="mr-2 h-4 w-4" />Edit</Link></DropdownMenuItem> */}
                              <AlertDialogTrigger asChild><DropdownMenuItem className="text-red-500 focus:text-red-500"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem></AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the project titled "{project.title}".</AlertDialogDescription></AlertDialogHeader>
                            <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete('portfolio', project.id, 'Project')} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={3} className="h-24 text-center">No projects yet.</TableCell></TableRow>}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Job Openings Tab */}
            <TabsContent value="jobs">
               <div className="flex justify-end mb-4">
                 {/* <Link href="/studio/jobs/new">
                    <Button><PlusCircle className="mr-2 h-4 w-4" />New Job</Button>
                </Link> */}
              </div>
              <Table>
                 <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.length > 0 ? jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                               {/* <DropdownMenuItem asChild><Link href={`/studio/jobs/edit/${job.id}`}><Pencil className="mr-2 h-4 w-4" />Edit</Link></DropdownMenuItem> */}
                              <AlertDialogTrigger asChild><DropdownMenuItem className="text-red-500 focus:text-red-500"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem></AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                           <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the job opening for "{job.title}".</AlertDialogDescription></AlertDialogHeader>
                            <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete('jobs', job.id, 'Job')} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={3} className="h-24 text-center">No job openings yet.</TableCell></TableRow>}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
