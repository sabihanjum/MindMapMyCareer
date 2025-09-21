import AppLayout from "@/components/layout/app-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BarChart, BookOpen, Bot, Award, Star, Trophy, Target, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const user = {
  name: "Priya",
  level: 5,
  points: 450,
};

const badges = [
  { id: "1", name: "First Step", icon: <Star className="h-6 w-6 text-yellow-400" />, imageId: "badge1" },
  { id: "2", name: "Career Explorer", icon: <BookOpen className="h-6 w-6 text-blue-400" />, imageId: "badge2" },
  { id: "3", name: "Quiz Master", icon: <Trophy className="h-6 w-6 text-green-400" />, imageId: "badge3" },
  { id: "4", name: "Pathway Pro", icon: <Target className="h-6 w-6 text-red-400" />, imageId: "badge4" },
];

const leaderboard = [
  { rank: 1, name: "Aarav", points: 1250 },
  { rank: 2, name: "Sanya", points: 1100 },
  { rank: 3, name: "Rohan", points: 980 },
  { rank: 4, name: "Priya", points: 450 },
  { rank: 5, name: "Diya", points: 300 },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <header>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-primary">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">Here's your progress. Keep up the great work!</p>
        </header>
        <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-3">
              <Card className="flex flex-col justify-between">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2 font-headline">
                          <Award className="text-accent"/>
                          Your Progress
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="flex items-end justify-between">
                          <div>
                              <p className="text-4xl font-bold">{user.points}</p>
                              <p className="text-muted-foreground">Points</p>
                          </div>
                          <div>
                              <p className="text-4xl font-bold">{user.level}</p>
                              <p className="text-muted-foreground">Level</p>
                          </div>
                      </div>
                  </CardContent>
              </Card>

              <Card className="flex flex-col justify-between">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2 font-headline">
                          <Trophy className="text-accent"/>
                          Your Badges
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="flex -space-x-4">
                          {badges.map((badge) => {
                              const placeholder = PlaceHolderImages.find(p => p.id === badge.imageId);
                              return (
                                  <div key={badge.id} title={badge.name} className="relative h-16 w-16 rounded-full border-4 border-background bg-card transition-transform hover:scale-110 hover:z-10">
                                    {placeholder && (
                                      <Image
                                        src={placeholder.imageUrl}
                                        alt={badge.name}
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover"
                                        data-ai-hint={placeholder.imageHint}
                                      />
                                    )}
                                  </div>
                              )
                          })}
                      </div>
                  </CardContent>
              </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:col-span-3 xl:grid-cols-3">
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
                                  <TableRow key={player.rank} className={player.name === user.name ? "bg-secondary/80" : ""}>
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
                      <Card className="hover:border-primary hover:bg-secondary/50 transition-all">
                          <CardHeader>
                              <CardTitle className="flex items-center justify-between font-headline text-lg">
                                  My Pathways
                                  <ArrowRight className="h-5 w-5"/>
                              </CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="text-sm text-muted-foreground">Explore career paths tailored to you.</p>
                          </CardContent>
                      </Card>
                  </Link>
                  <Link href="/chatbot">
                      <Card className="hover:border-primary hover:bg-secondary/50 transition-all">
                          <CardHeader>
                              <CardTitle className="flex items-center justify-between font-headline text-lg">
                                  AI Chatbot
                                  <ArrowRight className="h-5 w-5"/>
                              </CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="text-sm text-muted-foreground">Ask career questions and get instant answers.</p>
                          </CardContent>
                      </Card>
                  </Link>
                  <Card className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer">
                      <CardHeader>
                          <CardTitle className="flex items-center justify-between font-headline text-lg">
                              Start a Quiz
                              <ArrowRight className="h-5 w-5"/>
                          </CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm text-primary-foreground/80">Test your knowledge and earn points!</p>
                      </CardContent>
                  </Card>
              </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
