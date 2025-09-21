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
import { Mail, Settings, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
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
          <h1 className="font-headline text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Settings />
            Profile Settings
          </h1>
          <p className="text-muted-foreground">Manage your account information.</p>
        </header>

        <main className="max-w-2xl">
          <Card>
            {isLoading ? (
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
            ) : user && (
                <CardHeader>
                    <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 text-3xl">
                        <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                     <div>
                        <h2 className="text-2xl font-bold font-headline">{user.name}</h2>
                        <p className="text-muted-foreground">Level 5</p>
                    </div>
                    </div>
                </CardHeader>
            )}
            <CardContent className="space-y-6 pt-6">
              {isLoading ? (
                <div className="space-y-6">
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-10' />
                    <Skeleton className="h-10 w-full" />
                  </div>
                   <div className='space-y-2'>
                    <Skeleton className='h-4 w-10' />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ) : user && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="name" defaultValue={user.name} key={user.id + '-name'} className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="email" type="email" defaultValue={user.email} key={user.id + '-email'} className="pl-10" />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="border-t pt-6">
                {isLoading ? (
                    <Skeleton className="h-10 w-24" />
                ) : (
                    <Button>Save Changes</Button>
                )}
            </CardFooter>
          </Card>
        </main>
      </div>
    </AppLayout>
  );
}
