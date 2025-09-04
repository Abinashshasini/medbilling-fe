'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const Header = () => {
  return (
    <header
      className={cn('bg-background flex h-16 items-center gap-3 p-4 sm:gap-4')}
    >
      <div className="flex justify-between items-center w-full pr-8 h-16 pt-4">
        <SidebarTrigger
          variant="default"
          className="lg:hidden h-12 w-12 mr-4"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3 bg-primary-foreground rounded-sm max-w-max pr-10 cursor-pointer">
            <div className="h-12 w-12 rounded-sm flex items-center justify-center gradiantBg text-card font-bold text-lg">
              AB
            </div>
            <div>
              <h3 className="text-md font-semibold">Abinash Medical Store</h3>
              <p className="text-xs">Mareigaon, Andapur - 758083</p>
            </div>
          </div>
        </div>

        <div className="flex-1 justify-end gap-2 text-lg items-center font-medium text-muted-foreground hidden lg:flex cursor-pointer">
          <h3 className="h-10 px-4 rounded-md hover:bg-primary-foreground flex items-center">
            Purchases
          </h3>
          <h3 className="h-10 px-4 rounded-md hover:bg-primary-foreground flex items-center">
            Stock
          </h3>
          <h3 className="h-10 px-4 rounded-md hover:bg-primary-foreground flex items-center">
            Sells
          </h3>
          <button className="flex items-center justify-center gap-1 bg-sidebar-accent-foreground rounded-md px-2 py-1">
            <p className="text-xs text-card">Search</p>
            <kbd className="bg-muted pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          <button className="flex items-center justify-center gap-1 bg-sidebar-accent-foreground rounded-md px-2 py-1">
            <p className="text-xs text-card">Help</p>
            <kbd className="bg-muted pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
              <span className="text-xs">⌘</span>H
            </kbd>
          </button>

          <Avatar className="ml-2">
            <AvatarImage
              src="	https://avatars.githubusercontent.com/u/48725176?v=4"
              alt="@shadcn"
              className="w-8 h-8 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
