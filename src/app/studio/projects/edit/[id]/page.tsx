
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { firestore } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export default function EditProjectPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const projectId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tech, setTech] = useState("");
  const [hint, setHint] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const projectDoc = await getDoc(doc(firestore, "portfolio", projectId));
        if (projectDoc.exists()) {
          const projectData = projectDoc.data();
          setTitle(projectData.title);
          setDescription(projectData.description);
          setImage(projectData.image || "");
          setTech(projectData.tech.join(", "));
          setHint(projectData.hint || "");
        } else {
          toast({ title: "Error", description: "Project not found.", variant: "destructive" });
          router.push("/studio/projects");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast({ title: "Error", description: "Failed to fetch project details.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId, router, toast]);

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const projectRef = doc(firestore, "portfolio", projectId);
      await updateDoc(projectRef, {
        title,
        description,
        image,
        tech: tech.split(',').map(t => t.trim()).filter(t => t),
        hint,
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Project Updated",
        description: `The project "${title}" has been successfully updated.`,
      });
      router.push("/studio/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "Failed to update project.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user || isLoading) {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="flex-1 w-full h-full p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Edit Project</h2>
          <p className="text-muted-foreground">Update the details for your portfolio piece.</p>
        </header>

        <form onSubmit={handleUpdateProject} className="space-y-6">
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
          
          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : <><Send className="mr-2 h-4 w-4" /> Save Changes</>}
          </Button>
        </form>
      </div>
    </div>
  );
}
