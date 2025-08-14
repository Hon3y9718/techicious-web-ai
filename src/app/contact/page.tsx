
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"
import { firestore } from "@/lib/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

export default function ContactPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    try {
        await addDoc(collection(firestore, "contacts"), {
            name,
            email,
            subject,
            message,
            createdAt: serverTimestamp(),
        });

        toast({
            title: "Message Sent!",
            description: "Thanks for reaching out. We'll get back to you soon.",
        });
        form.reset();
    } catch (error) {
        console.error("Error sending message:", error);
        toast({
            title: "Error Sending Message",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <>
      <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Have an idea in mind or just want to say hi? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold font-headline">Contact Information</h2>
                    <p className="text-muted-foreground mt-2">Fill up the form and our team will get back to you within 24 hours.</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary" />
                        <span className="text-muted-foreground">+91 9717468168</span>
                    </div>
                     <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary" />
                        <span className="text-muted-foreground">sales@techicious.com</span>
                    </div>
                     {/* <div className="flex items-center gap-4">
                        <MapPin className="h-6 w-6 text-primary" />
                        <span className="text-muted-foreground"></span>
                    </div> */}
                </div>
            </div>
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-semibold">Name</Label>
                    <Input id="name" name="name" placeholder="Enter your name" required disabled={isLoading} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Enter your email" required disabled={isLoading} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-semibold">Subject</Label>
                  <Input id="subject" name="subject" placeholder="What is this about?" required disabled={isLoading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-semibold">Message</Label>
                  <Textarea id="message" name="message" placeholder="Tell us about your project or inquiry" required rows={5} disabled={isLoading} />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
