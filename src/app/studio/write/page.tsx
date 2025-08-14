
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useTheme } from "next-themes";
import type { PreviewType } from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

// Dynamically import editor to prevent SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full animate-pulse rounded-md bg-muted" />,
});

export default function EditorPage() {
  const { theme } = useTheme();
  const [title, setTitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [content, setContent] = useState("## Welcome!\nStart writing here...");

  const generatedMarkdown = `---
title: "${title}"
heroImage: "${heroImage}"
date: "${new Date().toISOString().split("T")[0]}"
---

${content}`;

  return (
    <div className="container mx-auto max-w-5xl py-8 md:py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Create a New Post
          </h1>
          <p className="text-muted-foreground">
            Craft your next masterpiece for the Resource Hub.
          </p>
        </header>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg font-semibold">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your brilliant blog post title"
              className="text-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-image" className="text-lg font-semibold">
              Hero Image URL
            </Label>
            <Input
              id="hero-image"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              placeholder="https://example.com/your-image.png"
               className="h-12"
            />
          </div>
        </div>

        <div>
          <Label className="text-lg font-semibold">Content</Label>
          <Tabs defaultValue="live" className="mt-2">
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <div data-color-mode={theme}>
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || "")}
                  preview="edit"
                  height={500}
                />
              </div>
            </TabsContent>
             <TabsContent value="preview">
               <div data-color-mode={theme}>
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || "")}
                  preview="preview"
                  height={500}
                />
              </div>
            </TabsContent>
             <TabsContent value="live">
              <div data-color-mode={theme}>
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || "")}
                  preview="live"
                  height={500}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              <ChevronsUpDown className="mr-2 h-4 w-4" />
              View Generated Markdown
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Generated Markdown</CardTitle>
                </CardHeader>
              <CardContent>
                <pre className="mt-4 p-4 rounded-md bg-secondary text-secondary-foreground overflow-x-auto text-sm">
                  <code>{generatedMarkdown}</code>
                </pre>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
