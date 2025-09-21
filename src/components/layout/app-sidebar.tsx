'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Logo from '../icons/logo';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Bot, FileQuestion, LayoutDashboard, Lightbulb, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { getCurrentUser, logoutAction } from '@/lib/actions';
import { useEffect, useState } from 'react';
import type { User } from '@/lib/user-store';
import { Skeleton } from '../ui/skeleton';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/pathways', label: 'My Pathways', icon: <Lightbulb /> },
  { href: '/chatbot', label: 'AI Chatbot', icon: <Bot /> },
  { href: '/quiz', label: 'Quiz', icon: <FileQuestion /> },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logoutAction();
    router.push('/login');
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Logo />
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  icon={item.icon}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <div className="flex items-center gap-2">
            {user ? (
                <>
                <Avatar className='h-8 w-8'>
                    <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="text-xs text-muted-foreground">Level 5</span>
                </div>
                </>
            ) : (
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                </div>
            )}
        </div>
        <SidebarMenuButton icon={<LogOut />} tooltip={{ children: 'Log Out', side: 'right' }} onClick={handleLogout}>
            Log Out
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
