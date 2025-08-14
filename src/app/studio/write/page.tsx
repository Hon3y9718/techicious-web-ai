
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, Save } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { firestore } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

// Dynamically import editor to prevent SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full animate-pulse rounded-md bg-muted" />,
});

export default function CreatePostPage() {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [content, setContent] = useState("## Welcome!\nStart writing here...");
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!user) {
        toast({ title: "Error", description: "You must be logged in.", variant: "destructive" });
        return;
    }
    if (!title.trim() || !content.trim()) {
        toast({ title: "Error", description: "Title and content cannot be empty.", variant: "destructive" });
        return;
    }

    setIsLoading(true);
    try {
        const slug = createSlug(title);
        const postData: any = {
            title,
            heroImage,
            content,
            slug,
            status,
            authorId: user.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        if (status === 'published') {
            postData.publishedAt = serverTimestamp();
        }

        await addDoc(collection(firestore, "blogs"), postData);

        toast({
            title: status === 'published' ? "Post Published!" : "Draft Saved!",
            description: status === 'published' ? "Your new blog post is live." : "Your draft has been saved.",
        });
        
        router.push('/studio/posts');

    } catch (error) {
        console.error("Error saving post: ", error);
        toast({
            title: "Save Failed",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };


  if (authLoading || !user) {
    return (
       <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-8 md:py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Create a New Post
          </h1>
          <p className="text-muted-foreground">
            Craft your next masterpiece for the Resource Hub.
          </p>
        </header>

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
            <Button onClick={() => handleSave('draft')} disabled={isLoading} variant="outline" size="lg">
                {isLoading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save as Draft</>}
            </Button>
            <Button onClick={() => handleSave('published')} disabled={isLoading} size="lg">
                {isLoading ? "Publishing..." : <> <Send className="mr-2 h-4 w-4" /> Publish Post </>}
            </Button>
        </div>
      </div>
    </div>
  );
}
