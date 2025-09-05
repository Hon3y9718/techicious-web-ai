
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { firestore } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Save, ArrowLeft } from "lucide-react";

const parseWebLinks = (text: string) => {
    if (!text.trim()) return [];
    return text
        .split('\n')
        .map(line => {
            const parts = line.split(' - ');
            if (parts.length < 2) return null;
            const title = parts[0].trim();
            const url = parts.slice(1).join(' - ').trim();
            if (!title || !url) return null;
            return { title, url };
        })
        .filter(Boolean) as { title: string; url: string }[];
};

export default function NewProjectPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tech, setTech] = useState("");
  const [hint, setHint] = useState("");
  const [webLinks, setWebLinks] = useState("");
  const [androidLink, setAndroidLink] = useState("");
  const [iosLink, setIosLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleSave = async (status: 'draft' | 'published') => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in.", variant: "destructive" });
      return;
    }
    if (!title || !description || !tech) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const projectData: any = {
        title,
        description,
        image,
        tech: tech.split(',').map(t => t.trim()).filter(t => t),
        hint,
        webLinks: parseWebLinks(webLinks),
        appLinks: {
            android: androidLink || null,
            ios: iosLink || null,
        },
        status,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (status === 'published') {
        projectData.publishedAt = serverTimestamp();
      }

      await addDoc(collection(firestore, "portfolio"), projectData);
      toast({
        title: status === 'published' ? "Project Published!" : "Draft Saved!",
        description: `The project "${title}" has been saved.`,
      });
      router.push("/studio/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user) {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="flex-1 w-full h-full p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/studio/projects">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Link>
            </Button>
          <h2 className="text-3xl font-bold tracking-tight">Create New Project</h2>
          <p className="text-muted-foreground">Fill in the details for your new portfolio piece.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} disabled={isLoading} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" placeholder="https://placehold.co/600x400.png" value={image} onChange={(e) => setImage(e.target.value)} disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hint">Image AI Hint</Label>
            <Input id="hint" placeholder="e.g. 'website mockup' (max 2 words)" value={hint} onChange={(e) => setHint(e.target.value)} disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tech">Technologies (comma-separated)</Label>
            <Input id="tech" placeholder="e.g. Next.js, Firebase, Tailwind CSS" value={tech} onChange={(e) => setTech(e.target.value)} disabled={isLoading} required />
          </div>

          <div className="space-y-4 pt-4 border-t">
             <h3 className="text-lg font-medium">Project Links</h3>
             <div className="space-y-2">
                <Label htmlFor="webLinks">Website Links (one per line, format: Title - URL)</Label>
                <Textarea id="webLinks" placeholder="e.g. Live Site - https://example.com" value={webLinks} onChange={(e) => setWebLinks(e.target.value)} disabled={isLoading} rows={4} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="androidLink">Google Play Link</Label>
                <Input id="androidLink" placeholder="https://play.google.com/store/apps/details?id=..." value={androidLink} onChange={(e) => setAndroidLink(e.target.value)} disabled={isLoading} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="iosLink">Apple App Store Link</Label>
                <Input id="iosLink" placeholder="https://apps.apple.com/app/..." value={iosLink} onChange={(e) => setIosLink(e.target.value)} disabled={isLoading} />
              </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
              <Button onClick={() => handleSave('draft')} disabled={isLoading} variant="outline" size="lg">
                  {isLoading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save as Draft</>}
              </Button>
              <Button onClick={() => handleSave('published')} disabled={isLoading} size="lg">
                  {isLoading ? "Publishing..." : <> <Send className="mr-2 h-4 w-4" /> Publish Project</>}
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
