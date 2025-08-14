
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

export default function EditJobPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const jobId = params.id as string;

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

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      setIsLoading(true);
      try {
        const jobDoc = await getDoc(doc(firestore, "jobs", jobId));
        if (jobDoc.exists()) {
          const jobData = jobDoc.data();
          setTitle(jobData.title);
          setLocation(jobData.location);
          setDepartment(jobData.department);
          setDescription(jobData.description);
          setRequirements(jobData.requirements.join("\n"));
        } else {
          toast({ title: "Error", description: "Job not found.", variant: "destructive" });
          router.push("/studio/jobs");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        toast({ title: "Error", description: "Failed to fetch job details.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId, router, toast]);

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const jobRef = doc(firestore, "jobs", jobId);
      await updateDoc(jobRef, {
        title,
        location,
        department,
        description,
        requirements: requirements.split('\n').filter(req => req.trim() !== ''),
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Job Updated",
        description: `The job opening for "${title}" has been updated.`,
      });
      router.push("/studio/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      toast({
        title: "Error",
        description: "Failed to update job.",
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
          <h2 className="text-3xl font-bold tracking-tight">Edit Job Opening</h2>
          <p className="text-muted-foreground">Update the details for the position.</p>
        </header>

        <form onSubmit={handleUpdateJob} className="space-y-6">
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
          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : <><Send className="mr-2 h-4 w-4" /> Save Changes</>}
          </Button>
        </form>
      </div>
    </div>
  );
}
