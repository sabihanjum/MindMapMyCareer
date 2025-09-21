'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent } from '../ui/card';
import { Loader2, Zap } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  skills: z.string().min(3, 'Please list at least one skill.'),
  interests: z.string().min(3, 'Please list at least one interest.'),
  aspirations: z.string().min(10, 'Please describe your aspirations in a bit more detail.'),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfilerFormProps {
  onSubmit: (data: FormValues) => Promise<void>;
}

export function ProfilerForm({ onSubmit }: ProfilerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: '',
      interests: '',
      aspirations: '',
    },
  });

  const handleFormSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  };

  return (
    <Card>
        <CardContent className="p-6">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg">Your Skills</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Python, Public Speaking, Graphic Design" {...field} />
                    </FormControl>
                    <FormDescription>
                        List your current skills, separated by commas.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg">Your Interests</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Gaming, Renewable Energy, Creative Writing" {...field} />
                    </FormControl>
                    <FormDescription>
                        What are you passionate about? Separate with commas.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="aspirations"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-lg">Your Aspirations</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., I want to build apps that help people, or I want to work in a field that fights climate change."
                        className="min-h-[100px]"
                        {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        Briefly describe your career goals or what you hope to achieve.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Zap className="mr-2 h-4 w-4" />
                            Generate My Pathways
                        </>
                    )}
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
