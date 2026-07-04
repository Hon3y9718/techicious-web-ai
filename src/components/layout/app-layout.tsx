
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ChatWidget from "@/components/chatbot/chat-widget";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioPage = pathname.startsWith('/studio');

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isStudioPage && <Header />}
      <main className="flex-1">{children}</main>
      {!isStudioPage && <Footer />}
      {/* {!isStudioPage && <ChatWidget />} */}
    </div>
  );
}
