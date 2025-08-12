"use client";

import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import { useState } from "react";
import ChatPanel from "./chat-panel";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          size="icon"
          className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </div>
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
    </>
  );
}
