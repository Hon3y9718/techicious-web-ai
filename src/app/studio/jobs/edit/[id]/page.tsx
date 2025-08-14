
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { firestore } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Save, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const [status, setStatus] = useState<'draft' | 'published' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      setIsFetching(true);
      try {
        const jobDoc = await getDoc(doc(firestore, "jobs", jobId));
        if (jobDoc.exists()) {
          const jobData = jobDoc.data();
          setTitle(jobData.title);
          setLocation(jobData.location);
          setDepartment(jobData.department);
          setDescription(jobData.description);
          setRequirements(jobData.requirements.join("\n"));
          setStatus(jobData.status || 'draft');
        } else {
          toast({ title: "Error", description: "Job not found.", variant: "destructive" });
          router.push("/studio/jobs");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        toast({ title: "Error", description: "Failed to fetch job details.", variant: "destructive" });
      } finally {
        setIsFetching(false);
      }
    };

    fetchJob();
  }, [jobId, router, toast]);

  const handleUpdate = async (newStatus: 'draft' | 'published') => {
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
      const updateData: any = {
        title,
        location,
        department,
        description,
        requirements: requirements.split('\n').filter(req => req.trim() !== ''),
        status: newStatus,
        updatedAt: serverTimestamp(),
      };

      if (newStatus === 'published' && status === 'draft') {
        updateData.publishedAt = serverTimestamp();
      }

      await updateDoc(jobRef, updateData);
      toast({
        title: newStatus === 'published' ? "Job Published!" : "Draft Updated!",
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

  if (authLoading || !user || isFetching) {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="flex-1 w-full h-full p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/studio/jobs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Jobs
                </Link>
            </Button>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight">Edit Job Opening</h2>
              {status && <Badge variant={status === 'published' ? 'default' : 'secondary'}>{status}</Badge>}
            </div>
            <p className="text-muted-foreground">Update the details for the position.</p>
        </div>

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
                {isLoading ? "Saving..." : <><Send className="mr-2 h-4 w-4" /> Update Job</>}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
