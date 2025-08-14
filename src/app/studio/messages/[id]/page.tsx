
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { firestore } from "@/lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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


type Message = { 
  id: string; 
  name: string; 
  email: string;
  subject: string;
  message: string;
  createdAt: any;
};

export default function MessageDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const messageId = params.id as string;

  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!messageId || !user) return;

    const fetchMessage = async () => {
      setIsLoading(true);
      try {
        const messageDoc = await getDoc(doc(firestore, "contacts", messageId));
        if (messageDoc.exists()) {
          const messageData = messageDoc.data();
          setMessage({
              id: messageDoc.id,
              ...messageData,
              createdAt: messageData.createdAt.toDate()
          } as Message);
        } else {
          toast({ title: "Error", description: "Message not found.", variant: "destructive" });
          router.push("/studio/messages");
        }
      } catch (error) {
        console.error("Error fetching message:", error);
        toast({ title: "Error", description: "Failed to fetch message details.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, [messageId, user, router, toast]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(firestore, "contacts", messageId));
      toast({
        title: `Message Deleted`,
        description: `The message has been successfully deleted.`,
      });
      router.push("/studio/messages");
    } catch (error) {
      console.error(`Error deleting message:`, error);
      toast({
        title: "Error",
        description: "Failed to delete the message.",
        variant: "destructive",
      });
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading message...</p>
      </div>
    );
  }
  
  if (!message) {
      return null;
  }

  return (
    <div className="flex-1 w-full h-full p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" asChild>
                <Link href="/studio/messages">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Inbox
                </Link>
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this message. This action cannot be undone.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                        Delete
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">{message.subject}</CardTitle>
                <CardDescription className="pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                         <div>
                            <strong>From:</strong> {message.name} &lt;<a href={`mailto:${message.email}`} className="text-primary hover:underline">{message.email}</a>&gt;
                        </div>
                         <span className="text-xs text-muted-foreground mt-2 sm:mt-0">
                            {new Date(message.createdAt).toLocaleString()}
                        </span>
                    </div>
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
                <div className="prose dark:prose-invert max-w-none">
                    <p>{message.message}</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
