
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { firestore } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Save } from "lucide-react";

export default function NewJobPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
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
    if (!title || !location || !department || !description || !requirements) {
      toast({ title: "Error", description: "Please fill all fields.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const jobData: any = {
        title,
        location,
        department,
        description,
        requirements: requirements.split('\n').filter(req => req.trim() !== ''),
        status,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (status === 'published') {
        jobData.publishedAt = serverTimestamp();
      }

      await addDoc(collection(firestore, "jobs"), jobData);
      toast({
        title: status === 'published' ? "Job Published!" : "Draft Saved!",
        description: `The job opening for "${title}" has been created.`,
      });
      router.push("/studio/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
      toast({
        title: "Error",
        description: "Failed to create job.",
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
        <header className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Create New Job Opening</h2>
          <p className="text-muted-foreground">Fill in the details for the new position.</p>
        </header>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} disabled={isLoading} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements (one per line)</Label>
            <Textarea id="requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={7} disabled={isLoading} />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button onClick={() => handleSave('draft')} disabled={isLoading} variant="outline" size="lg">
              {isLoading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save as Draft</>}
            </Button>
            <Button onClick={() => handleSave('published')} disabled={isLoading} size="lg">
              {isLoading ? "Publishing..." : <><Send className="mr-2 h-4 w-4" /> Publish Job</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
