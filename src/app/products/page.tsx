import { techiciousProducts } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {techiciousProducts.map((product) => (
              <Link key={product.slug} href={product.link || '#'} target="_blank" rel="noopener noreferrer" className="group">
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={600}
                            height={400}
                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                            data-ai-hint={product.hint}
                        />
                    </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                        {product.title}
                      </CardTitle>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:text-primary group-hover:rotate-45" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{product.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
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
