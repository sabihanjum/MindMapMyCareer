'use client';

import { useState } from 'react';
import { ProfilerForm } from '@/components/pathways/profiler-form';
import { PathwaysDisplay } from '@/components/pathways/pathways-display';
import { generateCareerPathwaysAction } from '@/lib/actions';
import type { GenerateCareerPathwaysOutput } from '@/ai/flows/generate-career-pathways';
import { Loader2, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/components/layout/app-layout';

export default function PathwaysPage() {
  const [pathwaysResult, setPathwaysResult] = useState<GenerateCareerPathwaysOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { skills: string; interests: string; aspirations: string }) => {
    setIsLoading(true);
    setError(null);
    setPathwaysResult(null);

    try {
      const result = await generateCareerPathwaysAction(data);
      if ('careerPathways' in result) {
        setPathwaysResult(result);
      } else {
        setError(result.error);
      }
    } catch (e) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPathwaysResult(null);
    setError(null);
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <header>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-primary">
            Discover Your Career Path
          </h1>
          <p className="text-muted-foreground">
            {pathwaysResult
              ? 'Here are your personalized recommendations.'
              : 'Tell us about yourself to get started.'}
          </p>
        </header>
        <main>
          {!pathwaysResult && !isLoading && <ProfilerForm onSubmit={handleSubmit} />}
          {isLoading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <div className="text-center">
                  <p className="font-headline text-lg font-semibold">Generating your pathways...</p>
                  <p className="text-muted-foreground">Our AI is crafting personalized recommendations for you.</p>
                </div>
              </CardContent>
            </Card>
          )}
          {error && (
            <Card className="border-destructive bg-destructive/10">
              <CardContent className="p-6">
                <p className="font-semibold text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}
          {pathwaysResult && <PathwaysDisplay result={pathwaysResult} onReset={handleReset} />}
        </main>
      </div>
    </AppLayout>
  );
}
