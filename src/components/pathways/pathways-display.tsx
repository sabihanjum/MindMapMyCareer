import { GenerateCareerPathwaysOutput } from "@/ai/flows/generate-career-pathways";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { ArrowLeft, Lightbulb, Star } from "lucide-react";

interface PathwaysDisplayProps {
  result: GenerateCareerPathwaysOutput;
  onReset: () => void;
}

export function PathwaysDisplay({ result, onReset }: PathwaysDisplayProps) {
  const { careerPathways, upskillingRecommendations } = result;
  
  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onReset} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Start Over
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Star className="text-accent"/>
            Recommended Career Pathways
          </CardTitle>
          <CardDescription>
            Based on your profile, here are some career paths you might excel in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {careerPathways.map((path, index) => (
                 <div key={index} className="flex items-start gap-3 rounded-lg border p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <p className="flex-1 pt-1.5 text-sm font-medium">{path}</p>
                 </div>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Lightbulb className="text-accent"/>
            Upskilling Recommendations
          </CardTitle>
          <CardDescription>
            To pursue these paths, consider developing the following skills.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {upskillingRecommendations.map((rec, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="font-medium text-left">{rec}</AccordionTrigger>
                        <AccordionContent>
                           We recommend online courses from platforms like Coursera or Udemy, looking for local workshops, and finding projects to practice this skill.
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
