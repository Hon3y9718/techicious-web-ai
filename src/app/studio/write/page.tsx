
"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { Bold, Italic, Heading2, Link, List, ListOrdered, Quote, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Tool = {
  name: 'bold' | 'italic' | 'heading' | 'link' | 'ul' | 'ol' | 'quote' | 'code';
  icon: React.ElementType;
  action: (textarea: HTMLTextAreaElement) => void;
};

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyStyle = (syntaxStart: string, syntaxEnd: string = syntaxStart) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = `${content.substring(0, start)}${syntaxStart}${selectedText}${syntaxEnd}${content.substring(end)}`;
    
    setContent(newText);
    textarea.focus();
    setTimeout(() => {
      textarea.selectionStart = start + syntaxStart.length;
      textarea.selectionEnd = end + syntaxStart.length;
    }, 0);
  };
  
  const applyList = (syntax: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const lines = content.substring(0, start).split('\n');
      const currentLineIndex = lines.length - 1;
      const currentLine = lines[currentLineIndex];
      
      const newLines = [...lines];
      if (currentLine.trim().startsWith(syntax)) {
        newLines[currentLineIndex] = currentLine.replace(syntax, '');
      } else {
        newLines[currentLineIndex] = `${syntax} ${currentLine}`;
      }
      
      const newContent = newLines.join('\n') + content.substring(start);
      setContent(newContent);
      textarea.focus();
  };

  const tools: Tool[] = [
    { name: 'bold', icon: Bold, action: () => applyStyle('**') },
    { name: 'italic', icon: Italic, action: () => applyStyle('*') },
    { name: 'heading', icon: Heading2, action: () => applyStyle('\n## ', '') },
    { name: 'quote', icon: Quote, action: () => applyStyle('\n> ', '') },
    { name: 'code', icon: Code, action: () => applyStyle('`') },
    { name: 'ul', icon: List, action: () => applyList('-') },
    { name: 'ol', icon: ListOrdered, action: () => applyList('1.') },
    { name: 'link', icon: Link, action: () => {
        const url = prompt("Enter URL:");
        if (url) applyStyle('[', `](${url})`);
    }},
  ];

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        applyStyle('  ', '');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-headline font-bold mb-2">Create a New Post</h1>
          <p className="text-muted-foreground">Craft your next masterpiece for the Resource Hub.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <main>
            <div className="space-y-6">
              <Input
                type="text"
                placeholder="Post Title..."
                className="text-3xl font-bold h-auto border-0 focus-visible:ring-0 px-0 shadow-none !bg-transparent"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
              
              <div className="bg-background border rounded-lg">
                <div className="p-2 border-b flex items-center gap-1">
                  {tools.map(tool => (
                    <Button key={tool.name} variant="ghost" size="icon" onClick={() => tool.action(textareaRef.current!)}>
                       <tool.icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
                <Textarea
                  ref={textareaRef}
                  placeholder="Start writing your story..."
                  className="w-full h-[400px] border-0 resize-none focus-visible:ring-0 px-4 py-4 !bg-transparent"
                  value={content}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </main>
          
          <aside>
            <Card>
              <CardHeader>
                <CardTitle>Markdown Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary p-4 rounded-md overflow-x-auto">
                    <pre className="text-sm whitespace-pre-wrap">
                        {`---\ntitle: "${title}"\nslug: "${title.toLowerCase().replace(/\s+/g, '-').slice(0, 50)}"\nauthor: "Your Name"\ndate: "${new Date().toISOString().split('T')[0]}"\nsummary: "A brief summary of the post."\n---\n\n${content}`}
                    </pre>
                </div>
                <div className="mt-4 flex gap-2">
                    <Button>Publish Post</Button>
                    <Button variant="outline">Save Draft</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    Note: Publish & Save are for demonstration. Copy the markdown above to create a new blog post in <Badge variant="outline" className="ml-1">src/lib/data.ts</Badge>.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
