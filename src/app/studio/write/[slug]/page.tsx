
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, Save, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { firestore } from "@/lib/firebase";
import { collection, doc, getDocs, query, where, updateDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full animate-pulse rounded-md bg-muted" />,
});

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<'draft' | 'published' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [postId, setPostId] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.slug) return;
      setIsFetching(true);
      try {
        const postsCollection = collection(firestore, 'blogs');
        const q = query(postsCollection, where('slug', '==', params.slug));
        const postSnapshot = await getDocs(q);

        if (!postSnapshot.empty) {
            const postDoc = postSnapshot.docs[0];
            const postData = postDoc.data();
            setPostId(postDoc.id);
            setTitle(postData.title);
            setHeroImage(postData.heroImage || "");
            setContent(postData.content);
            setStatus(postData.status || 'draft');
        } else {
            toast({ title: "Error", description: "Post not found.", variant: "destructive" });
            router.push('/studio/posts');
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
        toast({ title: "Error", description: "Failed to load post data.", variant: "destructive" });
      } finally {
        setIsFetching(false);
      }
    };
    fetchPost();
  }, [params.slug, router, toast]);

  const handleUpdate = async (newStatus: 'draft' | 'published') => {
    if (!user || !postId) {
        toast({ title: "Error", description: "You must be logged in to update.", variant: "destructive" });
        return;
    }
    if (!title.trim() || !content.trim()) {
        toast({ title: "Error", description: "Title and content cannot be empty.", variant: "destructive" });
        return;
    }

    setIsLoading(true);
    try {
        const postRef = doc(firestore, "blogs", postId);
        const updateData: any = {
            title,
            heroImage,
            content,
            status: newStatus,
            updatedAt: serverTimestamp(),
        };

        if (newStatus === 'published' && status === 'draft') {
            updateData.publishedAt = serverTimestamp();
        }

        await updateDoc(postRef, updateData);

        toast({
            title: newStatus === 'published' ? "Post Published!" : "Draft Updated!",
            description: "Your changes have been saved.",
        });
        router.push('/studio/posts');

    } catch (error) {
        console.error("Error updating post: ", error);
        toast({
            title: "Update Failed",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  if (authLoading || !user || isFetching) {
    return (
       <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-8 md:py-12">
      <div className="space-y-6">
        <div className="space-y-2">
            <Button variant="ghost" asChild>
                <Link href="/studio/posts">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Posts
                </Link>
            </Button>
            <div className="flex items-center gap-4">
              <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Edit Post
              </h1>
              {status && <Badge variant={status === 'published' ? 'default' : 'secondary'}>{status === 'published' ? 'Published' : 'Draft'}</Badge>}
            </div>
          <p className="text-muted-foreground">
            Make changes to your post and save them.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg font-semibold">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your brilliant blog post title"
              className="text-xl h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-image" className="text-lg font-semibold">
              Hero Image URL
            </Label>
            <Input
              id="hero-image"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              placeholder="https://example.com/your-image.png"
              className="h-12"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <Label className="text-lg font-semibold">Content</Label>
           <div data-color-mode={theme} className="mt-2">
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || "")}
              preview="live"
              height={500}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
            {status === 'draft' ? (
                <>
                    <Button onClick={() => handleUpdate('draft')} disabled={isLoading} variant="outline" size="lg">
                        {isLoading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Draft</>}
                    </Button>
                     <Button onClick={() => handleUpdate('published')} disabled={isLoading} size="lg">
                        {isLoading ? "Publishing..." : <><Send className="mr-2 h-4 w-4" /> Publish</>}
                    </Button>
                </>
            ) : (
                 <Button onClick={() => handleUpdate('published')} disabled={isLoading} size="lg" className="w-full">
                    {isLoading ? "Saving..." : <> <Send className="mr-2 h-4 w-4" /> Update Post</>}
                </Button>
            )}
        </div>

      </div>
    </div>
  );
}
