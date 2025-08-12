import { portfolioProjects } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PortfolioPage() {
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
          <div className="grid gap-8 md:grid-cols-2">
            {portfolioProjects.map((project) => (
              <div key={project.slug} className="group">
                <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
                    <div className="overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={project.hint}
                        />
                    </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map(tech => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
