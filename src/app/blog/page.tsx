
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

async function getBlogPosts() {
    const postsCollection = collection(firestore, 'blogs');
    const q = query(postsCollection, orderBy('createdAt', 'desc'));
    const postsSnapshot = await getDocs(q);
    const postsList = postsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            slug: data.slug,
            title: data.title,
            content: data.content,
            heroImage: data.heroImage,
            createdAt: data.createdAt.toDate(),
        };
    });
    return postsList;
}


export default async function BlogPage() {
    const blogPosts = await getBlogPosts();
  return (
    <>
      <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Resource Hub
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Insights, tutorials, and thoughts on software development, AI, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                  <Image
                    src={post.heroImage || "https://placehold.co/800x400.png"}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="blog post"
                  />
                  <CardHeader>
                    <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">{post.content.substring(0, 150)}...</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                       <div className="flex items-center gap-2">
                         <User className="h-4 w-4" />
                         <span>Admin</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <Calendar className="h-4 w-4" />
                         <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
