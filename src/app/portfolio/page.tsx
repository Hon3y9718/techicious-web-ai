
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { GooglePlayButton } from "@/components/icons/google-play-button";
import { AppStoreButton } from "@/components/icons/app-store-button";


type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  hint: string;
  webLinks?: { title: string; url: string }[];
  appLinks?: {
      android?: string;
      ios?: string;
  }
};

async function getPortfolioProjects() {
    const projectsCollection = collection(firestore, 'portfolio');
    const q = query(
        projectsCollection,
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc')
    );
    const projectsSnapshot = await getDocs(q);
    const projectsList = projectsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
        } as Project;
    });
    return projectsList;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getPortfolioProjects();
      setProjects(fetchedProjects);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <>
      <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Our Work
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We take pride in our work. Explore some of our recent projects that showcase our expertise and commitment to quality.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          {loading ? (
             <div className="grid gap-8 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="h-full">
                        <div className="w-full h-64 bg-muted animate-pulse" />
                        <CardHeader>
                            <div className="h-8 w-3/4 bg-muted animate-pulse rounded-md" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
                            <div className="h-4 w-5/6 bg-muted animate-pulse rounded-md" />
                            <div className="flex flex-wrap gap-2 pt-2">
                                <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
                                <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />
                                <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
             </div>
          ) : projects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <div key={project.id} className="group">
                  <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col">
                      <div className="overflow-hidden">
                          <Image
                              src={project.image || "https://placehold.co/600x400.png"}
                              alt={project.title}
                              width={600}
                              height={400}
                              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                              data-ai-hint={project.hint}
                          />
                      </div>
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow flex flex-col">
                      <p className="text-muted-foreground flex-grow">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                          {project.tech.map(tech => (
                              <Badge key={tech} variant="secondary">{tech}</Badge>
                          ))}
                      </div>
                       {(project.webLinks && project.webLinks.length > 0) || (project.appLinks?.android || project.appLinks?.ios) ? (
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            {project.webLinks?.map(link => (
                                <Link key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline">
                                        {link.title} <ArrowUpRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            ))}
                            {project.appLinks?.ios && (
                                <Link href={project.appLinks.ios} target="_blank" rel="noopener noreferrer">
                                    <AppStoreButton className="h-10" />
                                </Link>
                            )}
                            {project.appLinks?.android && (
                                <Link href={project.appLinks.android} target="_blank" rel="noopener noreferrer">
                                   <GooglePlayButton />
                                </Link>
                            )}
                        </div>
                       ) : null}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center text-muted-foreground py-16">
                <h2 className="text-2xl font-headline font-semibold">No Projects Found</h2>
                <p className="mt-2">Check back soon to see what we've been working on.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
