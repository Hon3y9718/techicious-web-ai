import { Logo } from "@/components/icons/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">Techicious</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              We serve Delicious Tech.
            </p>
            <div className="flex space-x-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="https://twitter.com"><Twitter className="h-5 w-5" /></Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="https://github.com"><Github className="h-5 w-5" /></Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="https://linkedin.com"><Linkedin className="h-5 w-5" /></Link>
                </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:col-span-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold font-headline mb-2">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="/careers" className="text-muted-foreground hover:text-primary">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold font-headline mb-2">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#services" className="text-muted-foreground hover:text-primary">Web Development</Link></li>
                <li><Link href="/#services" className="text-muted-foreground hover:text-primary">Mobile Development</Link></li>
                <li><Link href="/#services" className="text-muted-foreground hover:text-primary">AI Development</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold font-headline mb-2">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary">Portfolio</Link></li>
                <li><Link href="/products" className="text-muted-foreground hover:text-primary">Products</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Techicious. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
