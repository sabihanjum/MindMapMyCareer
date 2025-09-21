'use client';

import { useEffect, useState } from 'react';
import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, BarChart3, Bot, BookOpen, Trophy, FileQuestion, Target } from "lucide-react";
import Link from "next/link";
import { getCurrentUser } from '@/lib/actions';
import type { User } from '@/lib/user-store';
import { Skeleton } from '@/components/ui/skeleton';

const progressData = {
  level: 5,
  points: 450,
  pathways: 3,
  quizzes: 5,
  badges: 4,
};

const leaderboard = [
  { rank: 1, name: "Aarav", points: 1250 },
  { rank: 2, name: "Sanya", points: 1100 },
  { rank: 3, name: "Rohan", points: 980 },
  { rank: 4, name: "Priya", points: 450 },
  { rank: 5, name: "Diya", points: 300 },
];

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        };
        fetchUser();
    }, []);

    const userRank = user ? leaderboard.find(p => p.name === user.name.split(' ')[0]) : null;

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8 bg-background">
        <header>
            {user ? (
                <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
                    Welcome <span className="text-primary">{user.name.split(' ')[0]}!</span>
                </h1>
            ) : (
                <Skeleton className="h-9 w-64" />
            )}
            <p className="text-primary font-bold">Welcome to MindMapMyCareer</p>
        </header>

        <main className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Main Stats */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Your Level</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold text-primary">{progressData.level}</p>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Total Points</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold text-primary">{progressData.points}</p>
                </CardContent>
            </Card>

            {/* Sub Stats */}
            <StatCard title="Pathways Explored" value={progressData.pathways} icon={<Target className="text-blue-500"/>} color="blue" />
            <StatCard title="Quizzes Taken" value={progressData.quizzes} icon={<FileQuestion className="text-orange-500"/>} color="orange" />
            <StatCard title="Badges Earned" value={progressData.badges} icon={<Trophy className="text-green-500"/>} color="green" />
            <StatCard title="Current Rank" value={userRank?.rank || 'N/A'} icon={<BarChart3 className="text-yellow-500"/>} color="yellow" />

            {/* Leaderboard and Quick Links */}
            <div className="lg:col-span-4 grid grid-cols-1 xl:grid-cols-3 gap-6">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline">Leaderboard</CardTitle>
                        <CardDescription>See how you rank among your peers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">Rank</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">Points</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leaderboard.map((player) => (
                                    <TableRow key={player.rank} className={user && userRank && player.name === user.name.split(' ')[0] ? "bg-secondary" : ""}>
                                        <TableCell className="font-medium">{player.rank}</TableCell>
                                        <TableCell>{player.name}</TableCell>
                                        <TableCell className="text-right font-mono">{player.points}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                  <Link href="/pathways">
                      <Card className="hover:border-primary hover:bg-card transition-all">
                          <CardHeader className="flex flex-row items-center justify-between">
                              <CardTitle className="font-headline text-lg">My Pathways</CardTitle>
                              <Target className="h-5 w-5 text-muted-foreground"/>
                          </CardHeader>
                      </Card>
                  </Link>
                  <Link href="/chatbot">
                      <Card className="hover:border-primary hover:bg-card transition-all">
                           <CardHeader className="flex flex-row items-center justify-between">
                              <CardTitle className="font-headline text-lg">AI Chatbot</CardTitle>
                              <Bot className="h-5 w-5 text-muted-foreground"/>
                          </CardHeader>
                      </Card>
                  </Link>
                   <Link href="/quiz">
                    <Card className="hover:border-primary hover:bg-card transition-all">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-headline text-lg">Start a Quiz</CardTitle>
                            <FileQuestion className="h-5 w-5 text-muted-foreground"/>
                        </CardHeader>
                    </Card>
                  </Link>
              </div>
            </div>
        </main>
      </div>
    </AppLayout>
  );
}


function StatCard({ title, value, icon, color }: { title: string, value: number | string, icon: React.ReactNode, color: 'blue' | 'orange' | 'green' | 'yellow' }) {
  const colorClasses = {
    blue: 'border-b-blue-500',
    orange: 'border-b-orange-500',
    green: 'border-b-green-500',
    yellow: 'border-b-yellow-500'
  }
  return (
    <Card className={`border-b-4 ${colorClasses[color]}`}>
      <CardHeader>
        <CardDescription className="flex items-center justify-between text-foreground">
          {title}
          {icon}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
