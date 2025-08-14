
"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { Bold, Italic, Heading2, Link, List, ListOrdered, Quote, Code, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


type Tool = {
  name: 'bold' | 'italic' | 'heading' | 'link' | 'ul' | 'ol' | 'quote' | 'code';
  icon: React.ElementType;
  action: (textarea: HTMLTextAreaElement) => void;
};

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOpen, setIsOpen] = useState(false)

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
        <div className="space-y-6">
          <Input
            type="text"
            placeholder="Title"
            className="text-4xl font-extrabold font-headline h-auto border-0 focus-visible:ring-0 px-0 shadow-none !bg-transparent tracking-tighter"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
          
          <div className="flex items-start gap-4">
             <div className="bg-background border rounded-lg sticky top-20">
                <div className="p-2 flex flex-col items-center gap-1">
                  {tools.map(tool => (
                    <Button key={tool.name} variant="ghost" size="icon" onClick={() => tool.action(textareaRef.current!)}>
                       <tool.icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            <Textarea
              ref={textareaRef}
              placeholder="Tell your story..."
              className="w-full text-lg border-0 resize-none focus-visible:ring-0 px-0 !bg-transparent leading-relaxed"
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={15}
            />
          </div>

          <div className="flex gap-2">
            <Button>Publish Post</Button>
            <Button variant="outline">Save Draft</Button>
          </div>
           <p className="text-xs text-muted-foreground mt-2">
              Note: Publish & Save are for demonstration. Use the markdown below to create a new blog post.
          </p>

          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
          >
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-0 hover:bg-transparent">
                  <ChevronDown className="h-4 w-4 mr-2 transition-transform duration-200" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}} />
                  View Generated Markdown
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                 <Card>
                  <CardContent className="pt-6">
                    <div className="bg-secondary p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm whitespace-pre-wrap">
                            {`---\ntitle: "${title}"\nslug: "${title.toLowerCase().replace(/\s+/g, '-').slice(0, 50)}"\nauthor: "Your Name"\ndate: "${new Date().toISOString().split('T')[0]}"\nsummary: "A brief summary of the post."\n---\n\n${content}`}
                        </pre>
                    </div>
                     <p className="text-xs text-muted-foreground mt-4">
                        Copy the markdown above to create a new blog post in <Badge variant="outline" className="ml-1">src/lib/data.ts</Badge>.
                    </p>
                  </CardContent>
                </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
