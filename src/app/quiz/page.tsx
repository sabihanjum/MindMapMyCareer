'use client';
import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { generateQuizAction } from '@/lib/actions';
import type { QuizQuestion } from '@/ai/flows/generate-quiz';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileQuestion, CheckCircle, XCircle, Award } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    async function fetchQuiz() {
      setIsLoading(true);
      const result = await generateQuizAction({ topic: 'Software Development', count: 5 });
      if ('questions' in result) {
        setQuestions(result.questions);
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }
    fetchQuiz();
  }, []);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };
  
  const handleRestart = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setIsLoading(true);
    async function fetchQuiz() {
      const result = await generateQuizAction({ topic: 'Software Development', count: 5 });
      if ('questions' in result) {
        setQuestions(result.questions);
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }
    fetchQuiz();
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <header>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <FileQuestion />
            Software Development Quiz
          </h1>
          <p className="text-muted-foreground">Test your knowledge and earn points!</p>
        </header>

        <main className="max-w-2xl mx-auto w-full">
          {isLoading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-16">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <div className="text-center">
                  <p className="font-headline text-lg font-semibold">Generating your quiz...</p>
                  <p className="text-muted-foreground">Our AI is preparing questions for you.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="border-destructive bg-destructive/10">
              <CardContent className="p-6">
                <p className="font-semibold text-destructive text-center">{error}</p>
                 <div className="mt-4 text-center">
                   <Button onClick={handleRestart}>Try Again</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!isLoading && !error && questions.length > 0 && !quizFinished && (
            <Card>
              <CardHeader>
                <Progress value={progress} className="mb-4 h-2" />
                <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                <CardDescription className="text-lg pt-2 text-foreground">{currentQuestion.question}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={selectedAnswer?.toString()}
                  onValueChange={(value) => setSelectedAnswer(Number(value))}
                  disabled={isAnswered}
                >
                  {currentQuestion.options.map((option, index) => {
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const isSelected = index === selectedAnswer;
                    
                    return (
                        <Label
                          key={index}
                          className={cn(
                            "flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-colors",
                            "hover:bg-accent/50",
                            isSelected && "bg-secondary",
                            isAnswered && isCorrect && "border-green-500 bg-green-500/10 text-green-700",
                            isAnswered && isSelected && !isCorrect && "border-red-500 bg-red-500/10 text-red-700"
                          )}
                        >
                          <RadioGroupItem value={index.toString()} id={`q${currentQuestionIndex}-o${index}`} />
                          <span>{option}</span>
                           {isAnswered && isCorrect && <CheckCircle className="ml-auto h-5 w-5 text-green-500" />}
                           {isAnswered && isSelected && !isCorrect && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
                        </Label>
                    )
                  })}
                </RadioGroup>
                <div className="flex justify-end">
                    {!isAnswered ? (
                        <Button onClick={handleAnswerSubmit} disabled={selectedAnswer === null}>Submit</Button>
                    ) : (
                        <Button onClick={handleNextQuestion}>
                            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </Button>
                    )}
                </div>
              </CardContent>
            </Card>
          )}
          
          {quizFinished && (
             <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto w-fit rounded-full bg-yellow-100 p-4 text-yellow-500">
                        <Award className="h-12 w-12" />
                    </div>
                    <CardTitle className="mt-4 text-3xl font-headline">Quiz Complete!</CardTitle>
                    <CardDescription>You've earned {score * 10} points.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-5xl font-bold">
                        {score} / {questions.length}
                    </p>
                    <p className="text-lg font-medium">
                        You answered {((score / questions.length) * 100).toFixed(0)}% of the questions correctly.
                    </p>
                    <Button onClick={handleRestart} size="lg">Play Again</Button>
                </CardContent>
             </Card>
          )}
        </main>
      </div>
    </AppLayout>
  );
}
