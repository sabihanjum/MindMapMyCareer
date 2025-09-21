'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Bot, Loader2, Send, User, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { answerCareerQueryAction } from '@/lib/actions';
import type { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';

const initialMessages: ChatMessage[] = [
    {
        role: 'assistant',
        content: 'Hello! I am your AI Career Advisor. How can I help you explore your future career today?'
    }
]

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const tempAssistantMessage: ChatMessage = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, userMessage, tempAssistantMessage]);
    setInput('');

    startTransition(async () => {
      const result = await answerCareerQueryAction({ question: input });
      
      let newAssistantMessage: ChatMessage;
      if ('answer' in result) {
        newAssistantMessage = { role: 'assistant', content: result.answer };
      } else {
        newAssistantMessage = { role: 'assistant', content: `Error: ${result.error}` };
      }

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = newAssistantMessage;
        return newMessages;
      });
    });
  };
  
  const quickQuestions = [
    "What skills are needed for data science?",
    "How do I prepare for a software engineer interview?",
    "What are some careers in renewable energy?",
    "Compare product manager and project manager roles."
  ]

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 border border-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-md rounded-xl px-4 py-3 text-sm shadow-sm',
                  message.role === 'user'
                    ? 'rounded-br-none bg-primary text-primary-foreground'
                    : 'rounded-bl-none bg-card'
                )}
              >
                {message.content ? (
                    <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: message.content.replace(/\\n/g, '<br />') }} />
                ) : (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                )}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
        {messages.length <= 1 && (
            <div className="p-4 pt-0">
                <Card className="bg-secondary/50">
                    <CardContent className="p-4">
                        <p className="text-sm font-medium mb-2 flex items-center gap-1"><Zap className="w-4 h-4 text-accent"/> Quick Starts</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {quickQuestions.map(q => (
                                <button key={q} onClick={() => setInput(q)} className="text-left text-sm p-2 rounded-md hover:bg-background transition-colors text-muted-foreground">{q}</button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your career..."
            className="flex-1"
            disabled={isPending}
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
