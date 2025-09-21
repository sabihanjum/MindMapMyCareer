'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { getCurrentUser } from '@/lib/actions';
import type { User } from '@/lib/user-store';
import { Settings, User as UserIcon, Mail, Briefcase, Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

const settingsNav = [
    { name: 'Public profile', active: true },
    { name: 'Account settings', active: false },
    { name: 'Notifications', active: false },
    { name: 'PRO Account', active: false },
];

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <header>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
            Settings
          </h1>
        </header>

        <main className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <aside className="col-span-1">
            <nav className="flex flex-col gap-1">
                {settingsNav.map((item) => (
                    <Button
                        key={item.name}
                        variant={item.active ? 'secondary' : 'ghost'}
                        className="justify-start"
                    >
                        {item.name}
                    </Button>
                ))}
            </nav>
          </aside>
          
          <div className="col-span-1 md:col-span-3">
             <Card>
                {isLoading || !user ? (
                    <CardContent className="p-8">
                        <div className="flex items-center gap-6">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-32" />
                                <Skeleton className="h-10 w-24" />
                            </div>
                        </div>
                         <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className='space-y-2'><Skeleton className='h-4 w-12' /><Skeleton className="h-10 w-full" /></div>
                            <div className='space-y-2'><Skeleton className='h-4 w-12' /><Skeleton className="h-10 w-full" /></div>
                         </div>
                         <div className="mt-6 space-y-2"><Skeleton className='h-4 w-12' /><Skeleton className="h-10 w-full" /></div>
                         <div className="mt-6 space-y-2"><Skeleton className='h-4 w-12' /><Skeleton className="h-10 w-full" /></div>
                         <div className="mt-6 space-y-2"><Skeleton className='h-4 w-12' /><Skeleton className="h-24 w-full" /></div>
                    </CardContent>
                ) : (
                    <>
                    <CardHeader className="border-b">
                        <CardTitle className="font-headline text-xl">Public profile</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                       <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                            <Avatar className="h-24 w-24 text-4xl">
                                <AvatarFallback className="bg-accent font-semibold text-accent-foreground">
                                    {user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex gap-2">
                                <Button>Change picture</Button>
                                <Button variant="outline">Delete picture</Button>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                             <div className="space-y-2">
                                <Label htmlFor="firstName">First name</Label>
                                <Input id="firstName" defaultValue={user.name.split(' ')[0]} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input id="lastName" defaultValue={user.name.split(' ').slice(1).join(' ')} />
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <Label htmlFor="email">Location</Label>
                            <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        
                         <div className="mt-6 space-y-2">
                            <Label htmlFor="profession">Profession</Label>
                            <Input id="profession" defaultValue="Student" />
                        </div>

                        <div className="mt-6 space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" placeholder="Tell us a little about yourself" className="min-h-[100px]"/>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t bg-secondary/50 px-8 py-4">
                        <Button>Save Changes</Button>
                    </CardFooter>
                    </>
                )}
             </Card>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
