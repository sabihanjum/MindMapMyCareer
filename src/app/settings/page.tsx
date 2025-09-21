'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { getCurrentUser } from '@/lib/actions';
import type { User } from '@/lib/user-store';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  // We need to use a key on the inputs to force re-render when the default value changes
  // after the user is fetched.
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
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>Update your name and email address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user.name} key={user.id} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} key={user.id} />
                  </div>
                  <Button>Save Changes</Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-10' />
                    <Skeleton className="h-10 w-full" />
                  </div>
                   <div className='space-y-2'>
                    <Skeleton className='h-4 w-10' />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-24" />
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </AppLayout>
  );
}
