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
import { Bot, LayoutDashboard, Lightbulb, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '../ui/separator';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/pathways', label: 'My Pathways', icon: <Lightbulb /> },
  { href: '/chatbot', label: 'AI Chatbot', icon: <Bot /> },
];

export default function AppSidebar() {
  const pathname = usePathname();

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
            <Avatar className='h-8 w-8'>
                <AvatarFallback className="bg-accent text-accent-foreground font-semibold">P</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold">Priya Sharma</span>
                <span className="text-xs text-muted-foreground">Level 5</span>
            </div>
        </div>
        <Link href="/login">
            <SidebarMenuButton icon={<LogOut />} tooltip={{ children: 'Log Out', side: 'right' }}>
                Log Out
            </SidebarMenuButton>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
