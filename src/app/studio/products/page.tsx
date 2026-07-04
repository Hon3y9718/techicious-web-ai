
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Trash2, Pencil, Send, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Product = { 
    id: string; 
    title: string; 
    description: string; 
    status: 'draft' | 'published';
};

export default function ProductsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

   useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const fetchData = async () => {
    if (user) {
      setLoading(true);
      try {
        const productsCollection = collection(firestore, 'products');
        const productsQuery = query(productsCollection, orderBy('createdAt', 'desc'));
        const productsSnapshot = await getDocs(productsQuery);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productsList);

      } catch (error) {
        console.error("Error fetching data: ", error);
        toast({ title: "Error", description: "Failed to fetch products.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async (productId: string, title: string) => {
    try {
        await deleteDoc(doc(firestore, 'products', productId));
        toast({
            title: `Product Deleted`,
            description: `The product "${title}" has been successfully deleted.`,
        });
        fetchData(); 
    } catch (error) {
        console.error(`Error deleting product:`, error);
        toast({ title: "Error", description: "Failed to delete the product.", variant: "destructive" });
    }
  };

  const handlePublish = async (productId: string, title: string) => {
    try {
      const productRef = doc(firestore, "products", productId);
      await updateDoc(productRef, {
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Product Published!",
        description: `"${title}" is now live.`,
      });
      fetchData();
    } catch (error) {
      console.error("Error publishing product:", error);
      toast({ title: "Error", description: "Failed to publish product.", variant: "destructive" });
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`/studio/products/edit/${id}`);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
     <div className="flex-1 w-full space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <p className="text-muted-foreground">Manage your company's products.</p>
            </div>
            <Link href="/studio/products/new">
                <Button><PlusCircle className="mr-2 h-4 w-4" />New Product</Button>
            </Link>
        </div>
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {products.length > 0 ? products.map((product) => (
                        <TableRow key={product.id} onClick={() => handleRowClick(product.id)} className="cursor-pointer">
                        <TableCell className="font-medium">{product.title}</TableCell>
                        <TableCell>
                            <Badge variant={product.status === 'published' ? 'default' : 'secondary'}>
                                {product.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="max-w-sm truncate text-muted-foreground">{product.description}</TableCell>
                        <TableCell className="text-right">
                            <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/studio/products/edit/${product.id}`}>
                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    {product.status === 'draft' && (
                                        <DropdownMenuItem onClick={() => handlePublish(product.id, product.title)}>
                                            <Send className="mr-2 h-4 w-4" /> Publish
                                        </DropdownMenuItem>
                                    )}
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem className="text-red-500 focus:text-red-500" onSelect={(e) => e.preventDefault()}>
                                            <Trash2 className="mr-2 h-4 w-4" />Delete
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the product titled "{product.title}".</AlertDialogDescription></AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(product.id, product.title)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                        </TableRow>
                    )) : <TableRow><TableCell colSpan={4} className="h-24 text-center">No products yet.</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
