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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here (API call, setSaved true on success, etc)
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <header>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
            Profile Settings
          </h1>
          <p className="text-muted-foreground text-sm mt-2">Manage your account information.</p>
        </header>

        <main className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <aside className="col-span-1">
            {/* Add sidebar navigation if needed */}
          </aside>
          <div className="col-span-1 md:col-span-3">
            <Card>
              {isLoading || !user ? (
                <CardContent className="p-8">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  {/* ... other skeletons as before ... */}
                </CardContent>
              ) : (
                <form onSubmit={handleSave}>
                  <CardHeader className="border-b">
                    <CardTitle className="font-headline text-xl">Public Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                      <Avatar className="h-24 w-24 text-4xl">
                        <AvatarImage src={user.photoUrl} />
                        <AvatarFallback className="bg-accent font-semibold text-accent-foreground">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex gap-2">
                        <Button type="button">Change Picture</Button>
                        <Button type="button" variant="outline">Delete Picture</Button>
                      </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={user.name?.split(' ')[0]} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={user.name?.split(' ').slice(1).join(' ')} required />
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} required />
                    </div>
                    <div className="mt-6 space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={user.location || ''} />
                    </div>
                    <div className="mt-6 space-y-2">
                      <Label htmlFor="profession">Profession</Label>
                      <Input id="profession" defaultValue={user.profession || 'Student'} />
                    </div>
                    <div className="mt-6 space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue={user.bio} placeholder="Tell us a little about yourself" className="min-h-[100px]" />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-secondary/50 px-8 py-4 flex-col items-start gap-2">
                    <Button type="submit">Save Changes</Button>
                    {saved && <span className="text-green-600 text-sm">Profile updated successfully!</span>}
                  </CardFooter>
                </form>
              )}
            </Card>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
