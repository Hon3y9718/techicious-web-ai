
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

type Job = {
    id: string;
    title: string;
    location: string;
    department: string;
    description: string;
    requirements: string[];
};

async function getJobOpenings() {
    const jobsCollection = collection(firestore, 'jobs');
    const q = query(jobsCollection, orderBy('title', 'asc'));
    const jobsSnapshot = await getDocs(q);
    const jobsList = jobsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data
        } as Job;
    });
    return jobsList;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const fetchedJobs = await getJobOpenings();
      setJobs(fetchedJobs);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <>
      <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Join Our Team
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Be part of a team that's building the future. We're looking for talented individuals who are passionate about technology and innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl mb-8">Current Openings</h2>
          {loading ? (
             <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-20 w-full bg-muted animate-pulse rounded-md" />
                ))}
             </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <AccordionItem key={job.id} value={job.id}>
                    <AccordionTrigger className="text-lg font-semibold font-headline hover:no-underline">
                      <div className="text-left">
                          {job.title}
                          <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4" /> {job.department} &middot; {job.location}
                          </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                          <p>{job.description}</p>
                          <h4>Requirements:</h4>
                          <ul>
                              {job.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                              ))}
                          </ul>
                      </div>
                      <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Apply Now</Button>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  There are no open positions at the moment. Please check back later!
                </p>
              )}
            </Accordion>
          )}
        </div>
      </section>
    </>
  );
}
