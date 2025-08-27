'use client';
import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { cn } from '@/lib/utils';
import { Search } from '../search';
import { TiWeatherSunny } from 'react-icons/ti';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const Header = () => {
  return (
    <header
      className={cn('bg-background flex h-16 items-center gap-3 p-4 sm:gap-4')}
    >
      <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
      <div className="h-6 w-0.25 bg-gray-300" />
      <div className="flex justify-between items-center w-full pr-8">
        <Search />
        <div className="flex items-center gap-4">
          <TiWeatherSunny className="w-6 h-6 text-gray-500 hover:text-black transition-colors" />
          <Avatar className="ml-2">
            <AvatarImage
              src="https://github.com/shadcn.png"
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
