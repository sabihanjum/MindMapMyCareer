import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <BrainCircuit className="h-6 w-6" />
      <span className="font-headline text-xl font-bold tracking-tight">
        MindMapMyCareer
      </span>
    </div>
  );
}
