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
import { MdOutlineDashboard } from 'react-icons/md';
import { MdOutlineShopTwo } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiAppsFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <RiAppsFill className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Careipro</span>
            <span className="truncate text-xs">Medicine Billing</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
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
                  <MdOutlineDashboard />
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
                  <MdOutlineShopTwo />
                  <span className="font-semibold">Inventory</span>
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
                  <GiMedicines />
                  <span className="font-semibold">Expiry Alert</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sell | Purchase Order</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={false}
                tooltip="Inventory"
                className="cursor-pointer"
              >
                <div>
                  <AiOutlineMedicineBox />
                  <span className="font-semibold">Purchase Medicine</span>
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
                  <IoSettingsOutline />
                  <span className="font-semibold">Settings</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
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
