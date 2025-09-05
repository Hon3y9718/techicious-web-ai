
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GooglePlayButton } from "@/components/icons/google-play-button";
import { AppStoreButton } from "@/components/icons/app-store-button";

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  hint: string;
  appLinks?: {
      android?: string;
      ios?: string;
  }
};

async function getProducts() {
    const productsCollection = collection(firestore, 'products');
    const q = query(
        productsCollection,
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc')
    );
    const productsSnapshot = await getDocs(q);
    const productsList = productsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
        } as Product;
    });
    return productsList;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);


  return (
    <>
      <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Our Products
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover the tools and applications we've built to help developers and businesses thrive.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
           {loading ? (
             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="h-full">
                        <div className="w-full h-56 bg-muted animate-pulse" />
                        <CardHeader>
                            <div className="h-8 w-3/4 bg-muted animate-pulse rounded-md" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
                            <div className="h-4 w-5/6 bg-muted animate-pulse rounded-md" />
                            <div className="flex flex-wrap gap-2 pt-2">
                                <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
                                <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
             </div>
          ) : products.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col group">
                  <Link href={product.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="overflow-hidden">
                        <Image
                            src={product.image || "https://placehold.co/600x400.png"}
                            alt={product.title}
                            width={600}
                            height={400}
                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={product.hint}
                        />
                    </div>
                  </Link>
                  <CardHeader>
                    <Link href={product.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="flex justify-between items-start">
                        <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                          {product.title}
                        </CardTitle>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:text-primary group-hover:rotate-45" />
                      </div>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col">
                    <p className="text-muted-foreground flex-grow">{product.description}</p>
                     <div className="flex flex-wrap gap-2">
                        {product.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                    {(product.appLinks?.android || product.appLinks?.ios) && (
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            {product.appLinks?.ios && (
                                <Link href={product.appLinks.ios} target="_blank" rel="noopener noreferrer">
                                    <AppStoreButton className="h-10" />
                                </Link>
                            )}
                            {product.appLinks?.android && (
                                <Link href={product.appLinks.android} target="_blank" rel="noopener noreferrer">
                                <GooglePlayButton />
                                </Link>
                            )}
                        </div>
                    )}
                  </CardContent>
              </Card>
            ))}
          </div>
           ) : (
                <div className="text-center text-muted-foreground py-16">
                    <h2 className="text-2xl font-headline font-semibold">No Products Found</h2>
                    <p className="mt-2">Check back soon to see what we've been working on.</p>
                </div>
            )}
        </div>
      </section>
    </>
  );
}
