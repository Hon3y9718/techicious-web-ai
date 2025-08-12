import { teamMembers } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <section className="w-full py-20 md:py-32 lg:py-40 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              About Techicious
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              We are a team of passionate developers, designers, and strategists dedicated to building the future of the web.
            </p>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Our Mission & Vision</h2>
              <p className="text-muted-foreground text-lg">
                Our mission is to empower businesses by crafting exceptional software that is not only functional but also a joy to use. We believe in the power of technology to solve complex problems and drive progress.
              </p>
              <p className="text-muted-foreground text-lg">
                Our vision is to be a leading force in digital innovation, known for our technical excellence, creative solutions, and unwavering commitment to our clients' success.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Our Core Values</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Innovation</h3>
                    <p className="text-muted-foreground">We constantly explore new technologies and approaches to deliver cutting-edge solutions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Collaboration</h3>
                    <p className="text-muted-foreground">We work closely with our clients, fostering a partnership built on trust and communication.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Quality</h3>
                    <p className="text-muted-foreground">We are committed to the highest standards of quality, from code to customer service.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Meet the Team</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              The brilliant minds behind our success.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <Avatar className="mx-auto h-24 w-24 mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
