
"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { marked } from "marked";


async function getPost(slug: string) {
    const postsCollection = collection(firestore, 'blogs');
    const q = query(postsCollection, where('slug', '==', slug), where('status', '==', 'published'));
    const postSnapshot = await getDocs(q);

    if (postSnapshot.empty) {
        return null;
    }

    const doc = postSnapshot.docs[0];
    const data = doc.data();

    return {
        id: doc.id,
        ...data,
        publishedAt: data.publishedAt.toDate(),
    };
}


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();


  useEffect(() => {
    const fetchPost = async () => {
        const fetchedPost = await getPost(params.slug);
        if (fetchedPost) {
            setPost(fetchedPost);
        }
        setLoading(false);
    };

    fetchPost();
  }, [params.slug]);


  if (loading) {
    return (
         <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <p>Loading post...</p>
        </div>
    )
  }

  if (!post) {
    notFound();
  }

  const html = marked(post.content); // Convert markdown to HTML

  return (
    <>
      <section className="w-full pt-12">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
               <div className="flex items-center gap-2">
                 <User className="h-4 w-4" />
                 <span>By Admin</span>
               </div>
               <div className="flex items-center gap-2">
                 <Calendar className="h-4 w-4" />
                 <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
               </div>
            </div>
          </div>
          <Image
            src={post.heroImage || "https://placehold.co/1200x600.png"}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full max-h-[600px] object-cover rounded-lg my-8 md:my-12"
            data-ai-hint="blog post header"
          />
        </div>
      </section>
      
      <section className="w-full pb-12 md:pb-24 lg:pb-32">
        <div className="container px-4 md:px-6">
          <article className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
             <div dangerouslySetInnerHTML={{ __html: html }} />
          </article>
        </div>
      </section>
    </>
  );
}
