'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { MdDashboard } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { AiFillMedicineBox } from 'react-icons/ai';
import { IoPieChartSharp, IoSettings } from 'react-icons/io5';
import { FaCartArrowDown } from 'react-icons/fa';
import { RiAppsFill } from 'react-icons/ri';
import { BiSolidBarChartSquare } from 'react-icons/bi';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { ImStatsBars, ImStatsBars2 } from 'react-icons/im';

import { useRouter } from 'next/navigation';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className="bg-sidebar-accent-foreground rounded-t-lg">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <RiAppsFill className="size-4" color="#fff" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Careipro</span>
            <span className="truncate text-xs">Medicine Billing</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar-accent-foreground">
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div onClick={() => router.push('/dashboard')}>
                  <MdDashboard color="text-sky-400" />
                  <span className="font-semibold">Dashboard</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div onClick={() => router.push('/dashboard/inventory')}>
                  <AiFillMedicineBox />
                  <span className="font-semibold">Stocks</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div onClick={() => router.push('/dashboard/inventory')}>
                  <FaCartArrowDown />
                  <span className="font-semibold">Purchases</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div onClick={() => router.push('/dashboard/inventory')}>
                  <BiSolidBarChartSquare />
                  <span className="font-semibold">Sells</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Invoices</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div>
                  <BsFillCartCheckFill />
                  <span className="font-semibold">Purchases Invoices</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div>
                  <IoPieChartSharp />
                  <span className="font-semibold">Sells Invoices</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div>
                  <ImStatsBars />
                  <span className="font-semibold">Purchase returns</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div>
                  <ImStatsBars2 />
                  <span className="font-semibold">Sell returns</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Others</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div>
                  <GiMedicines />
                  <span className="font-semibold">Expiry Alert</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div onClick={() => router.push('/dashboard/settings')}>
                  <IoSettings />
                  <span className="font-semibold">Settings</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-sidebar-accent-foreground rounded-b-lg">
        <SidebarMenuButton size="lg">
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-center">
              Careipro Pvt Ltd.
            </span>
            <span className="truncate text-xs text-center">
              © 2025 All rights reserved.
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
