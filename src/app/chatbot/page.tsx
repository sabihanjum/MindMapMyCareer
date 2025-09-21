import { ChatInterface } from "@/components/chatbot/chat-interface";
import { Bot } from "lucide-react";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b p-4">
        <h1 className="font-headline text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Bot/>
          AI Career Advisor
        </h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about careers, skills, or interviews!
        </p>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
}
