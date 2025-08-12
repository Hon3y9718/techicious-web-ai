import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Code, Cpu, FileText, Rocket, Search } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

const techLogos = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", alt: "Flutter" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg", alt: "Android" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg", alt: "iOS" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", alt: "Firebase" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", alt: "Google Cloud" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", alt: "Kubernetes" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", alt: "TailwindCSS" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", alt: "Java" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-grid-slate-100/[0.05] dark:bg-grid-slate-900/[0.2] relative">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                We Serve Delicious Tech
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Techicious is your partner in building brilliant, modern web applications. Because tech should be delicious.
              </p>
              <div className="space-x-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline">
                    See Our Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Our Core Services</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                From robust web platforms to intelligent AI, we build solutions that drive results.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Rocket className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Web &amp; Mobile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Blazing-fast, scalable, and secure applications for web and mobile, built with modern frameworks.
                  </p>
                </CardContent>
              </Card>
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Cpu className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">AI Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Leverage the power of AI with custom solutions and integrations using Genkit and other modern AI tools.
                  </p>
                </CardContent>
              </Card>
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Full-Stack Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    End-to-end development, from concept and design to deployment and maintenance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="ai-capabilities" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Unlock the Future with AI</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Integrate intelligent features into your applications. Here's a taste of what we can build with AI.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">AI Chatbots</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Engage users with intelligent, 24/7 customer support and lead generation bots.
                  </p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Content Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Automate content creation for blogs, marketing, or product descriptions.
                  </p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Intelligent Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                     Implement powerful semantic search to understand user intent, not just keywords.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="expertise" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Expertise</div>
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">The Tech We Love</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We thrive on the cutting edge. Our expertise in these technologies allows us to build powerful, efficient, and scalable solutions for our clients.
              </p>
              <ul className="grid gap-4">
                <li className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full"><Code className="w-4 h-4 text-primary" /></div>
                  <span className="font-medium">Next.js for performant, server-rendered React applications.</span>
                </li>
                 <li className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full"><Rocket className="w-4 h-4 text-primary" /></div>
                  <span className="font-medium">Firebase for scalable backends, databases, and authentication.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full"><Bot className="w-4 h-4 text-primary" /></div>
                  <span className="font-medium">Genkit for building and deploying production-ready AI flows.</span>
                </li>
              </ul>
            </div>
            <div className="relative flex h-full min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl">
              <div>
                <div className="flex justify-center items-center gap-2">
                  {[...techLogos].slice(0, 3).map((logo) => (
                    <div key={logo.alt} className="w-20 h-20 bg-background/50 rounded-full flex items-center justify-center m-1 transform transition-transform duration-300 hover:scale-110">
                      <Image src={logo.src} alt={logo.alt} width={48} height={48} className="h-12 w-12" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center gap-2 -mt-6">
                  {[...techLogos].slice(3, 7).map((logo) => (
                    <div key={logo.alt} className="w-20 h-20 bg-background/50 rounded-full flex items-center justify-center m-1 transform transition-transform duration-300 hover:scale-110">
                      <Image src={logo.src} alt={logo.alt} width={48} height={48} className="h-12 w-12" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center gap-2 -mt-6">
                   {[...techLogos].slice(7, 12).map((logo) => (
                    <div key={logo.alt} className="w-20 h-20 bg-background/50 rounded-full flex items-center justify-center m-1 transform transition-transform duration-300 hover:scale-110">
                      <Image src={logo.src} alt={logo.alt} width={48} height={48} className="h-12 w-12" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center gap-2 -mt-6">
                  {[...techLogos].slice(12, 16).map((logo) => (
                    <div key={logo.alt} className="w-20 h-20 bg-background/50 rounded-full flex items-center justify-center m-1 transform transition-transform duration-300 hover:scale-110">
                      <Image src={logo.src} alt={logo.alt} width={48} height={48} className="h-12 w-12" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center gap-2 -mt-6">
                  {[...techLogos].slice(16, 19).map((logo) => (
                    <div key={logo.alt} className="w-20 h-20 bg-background/50 rounded-full flex items-center justify-center m-1 transform transition-transform duration-300 hover:scale-110">
                      <Image src={logo.src} alt={logo.alt} width={48} height={48} className="h-12 w-12" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Ready to Build Something Amazing?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Check out our portfolio to see the amazing things we've built, or get in touch to discuss your next big idea.
              </p>
              <Link href="/portfolio">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Explore Our Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
