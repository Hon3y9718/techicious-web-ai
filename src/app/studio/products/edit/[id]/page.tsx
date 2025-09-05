
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

const parseWebLinks = (text: string) => {
    if (!text.trim()) return [];
    return text
        .split('\n')
        .map(line => {
            const parts = line.split(' - ');
            if (parts.length < 2) return null;
            const title = parts[0].trim();
            const url = parts.slice(1).join(' - ').trim();
            if (!title || !url) return null;
            return { title, url };
        })
        .filter(Boolean) as { title: string; url: string }[];
};

const formatWebLinks = (links: { title: string; url: string }[]): string => {
    if (!links || links.length === 0) return "";
    return links.map(link => `${link.title} - ${link.url}`).join("\n");
};

export default function EditProductPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const productId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [webLinks, setWebLinks] = useState("");
  const [hint, setHint] = useState("");
  const [androidLink, setAndroidLink] = useState("");
  const [iosLink, setIosLink] = useState("");
  const [status, setStatus] = useState<'draft' | 'published' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setIsFetching(true);
      try {
        const productDoc = await getDoc(doc(firestore, "products", productId));
        if (productDoc.exists()) {
          const productData = productDoc.data();
          setTitle(productData.title);
          setDescription(productData.description);
          setImage(productData.image || "");
          setTags(productData.tags.join(", "));
          setWebLinks(formatWebLinks(productData.webLinks || []));
          setHint(productData.hint || "");
          setAndroidLink(productData.appLinks?.android || "");
          setIosLink(productData.appLinks?.ios || "");
          setStatus(productData.status || 'draft');
        } else {
          toast({ title: "Error", description: "Product not found.", variant: "destructive" });
          router.push("/studio/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({ title: "Error", description: "Failed to fetch product details.", variant: "destructive" });
      } finally {
        setIsFetching(false);
      }
    };

    fetchProduct();
  }, [productId, router, toast]);

  const handleUpdate = async (newStatus: 'draft' | 'published') => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in.", variant: "destructive" });
      return;
    }
    if (!title || !description || !tags) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const productRef = doc(firestore, "products", productId);
      const updateData: any = {
        title,
        description,
        image,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        webLinks: parseWebLinks(webLinks),
        hint,
        appLinks: {
            android: androidLink || null,
            ios: iosLink || null,
        },
        status: newStatus,
        updatedAt: serverTimestamp(),
      };

      if (newStatus === 'published' && status === 'draft') {
        updateData.publishedAt = serverTimestamp();
      }

      await updateDoc(productRef, updateData);
      toast({
        title: newStatus === 'published' ? "Product Published!" : "Draft Updated!",
        description: `The product "${title}" has been successfully updated.`,
      });
      router.push("/studio/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product.",
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
                <Link href="/studio/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Link>
            </Button>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
            {status && <Badge variant={status === 'published' ? 'default' : 'secondary'}>{status}</Badge>}
          </div>
          <p className="text-muted-foreground">Update the details for your product.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
           <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isLoading} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} disabled={isLoading} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" placeholder="https://placehold.co/600x400.png" value={image} onChange={(e) => setImage(e.target.value)} disabled={isLoading} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="hint">Image AI Hint</Label>
            <Input id="hint" placeholder="e.g. 'SaaS dashboard' (max 2 words)" value={hint} onChange={(e) => setHint(e.target.value)} disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" placeholder="e.g. SaaS, AI, Developer Tool" value={tags} onChange={(e) => setTags(e.target.value)} disabled={isLoading} required />
          </div>
           <div className="space-y-2">
            <Label htmlFor="webLinks">Website Links (one per line, format: Title - URL)</Label>
            <Textarea id="webLinks" placeholder="e.g. Live Site - https://example.com" value={webLinks} onChange={(e) => setWebLinks(e.target.value)} disabled={isLoading} rows={4} />
          </div>

          <div className="space-y-4 pt-4 border-t">
             <h3 className="text-lg font-medium">Application Links</h3>
               <div className="space-y-2">
                <Label htmlFor="androidLink">Google Play Link</Label>
                <Input id="androidLink" placeholder="https://play.google.com/store/apps/details?id=..." value={androidLink} onChange={(e) => setAndroidLink(e.target.value)} disabled={isLoading} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="iosLink">Apple App Store Link</Label>
                <Input id="iosLink" placeholder="https://apps.apple.com/app/..." value={iosLink} onChange={(e) => setIosLink(e.target.value)} disabled={isLoading} />
              </div>
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
                    {isLoading ? "Saving..." : <> <Send className="mr-2 h-4 w-4" /> Update Product</>}
                </Button>
            )}
        </div>
        </form>
      </div>
    </div>
  );
}
