
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Post = { 
  id: string; 
  title: string; 
  slug: string; 
  status: 'draft' | 'published';
  publishedAt: any; 
};

export default function PostsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
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
        const postsCollection = collection(firestore, 'blogs');
        const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
        const postsSnapshot = await getDocs(postsQuery);
        const postsList = postsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                slug: data.slug,
                status: data.status,
                publishedAt: data.publishedAt?.toDate(),
            } as Post
        });
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast({ title: "Error", description: "Failed to fetch posts.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async (postId: string, title: string) => {
    try {
        await deleteDoc(doc(firestore, 'blogs', postId));
        toast({
            title: `Post Deleted`,
            description: `The post "${title}" has been successfully deleted.`,
        });
        fetchData(); 
    } catch (error) {
        console.error(`Error deleting post:`, error);
        toast({ title: "Error", description: "Failed to delete the post.", variant: "destructive" });
    }
  };
  
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 w-full">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
                <p className="text-muted-foreground">Manage your articles and resources.</p>
            </div>
            <Link href="/studio/write">
                <Button><PlusCircle className="mr-2 h-4 w-4" />New Post</Button>
            </Link>
        </div>
        <Card>
            <CardContent className="p-0">
                 <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Published On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {posts.length > 0 ? posts.map((post) => (
                        <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>
                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                {post.status === 'published' ? 'Published' : 'Draft'}
                            </Badge>
                        </TableCell>
                        <TableCell>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'N/A'}</TableCell>
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
                                <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(post.id, post.title)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                        </TableRow>
                    )) : <TableRow><TableCell colSpan={4} className="h-24 text-center">No posts yet.</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
