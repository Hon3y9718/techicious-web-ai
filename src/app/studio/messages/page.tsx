
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Message = { 
  id: string; 
  name: string; 
  email: string;
  subject: string;
  message: string;
  createdAt: any;
};

export default function MessagesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
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
        const messagesCollection = collection(firestore, "contacts");
        const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"));
        const messagesSnapshot = await getDocs(messagesQuery);
        const messagesList = messagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate() } as Message));
        setMessages(messagesList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast({
          title: "Error",
          description: "Failed to fetch messages.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async (messageId: string) => {
    try {
      await deleteDoc(doc(firestore, "contacts", messageId));
      toast({
        title: `Message Deleted`,
        description: `The message has been successfully deleted.`,
      });
      fetchData();
    } catch (error) {
      console.error(`Error deleting message:`, error);
      toast({
        title: "Error",
        description: "Failed to delete the message.",
        variant: "destructive",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full h-full p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inbox</h2>
          <p className="text-muted-foreground">Messages from your contact form.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            {messages.length > 0 ? (
                messages.map((message) => (
                    <AccordionItem value={message.id} key={message.id} className="px-4">
                        <AccordionTrigger className="hover:no-underline">
                             <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="font-medium">{message.name}</div>
                                    <div className="text-muted-foreground hidden md:block">{message.subject}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                     <div className="text-sm text-muted-foreground hidden md:block">
                                        {new Date(message.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    <AlertDialog>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem className="text-red-500 focus:text-red-500" onSelect={(e) => e.preventDefault()}>
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                         <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                This will permanently delete this message.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                onClick={() => handleDelete(message.id)}
                                                className="bg-destructive hover:bg-destructive/90"
                                                >
                                                Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4">
                           <div className="prose prose-sm dark:prose-invert max-w-none">
                                <h4>Email: <a href={`mailto:${message.email}`}>{message.email}</a></h4>
                                <p>{message.message}</p>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))
            ) : (
                <div className="text-center h-48 flex items-center justify-center">
                    <p>No messages yet.</p>
                </div>
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
