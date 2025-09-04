'use client';
import InfoCard from '@/components/dashboard/infoCard';
import { AppSidebar } from '@/components/sidebar';
import { Calendar } from '@/components/ui/calendar';
import { ImStatsBars, ImStatsBars2 } from 'react-icons/im';
import { GiCash } from 'react-icons/gi';
import { SiBitcoincash } from 'react-icons/si';
import { FaCalendarAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function Dashboard() {
  const [date, setDate] = useState<
    { from: Date | undefined; to?: Date | undefined } | undefined
  >({
    from: new Date(),
    to: undefined,
  });
  const [calenderSettings, setCalenderSettings] = useState({
    open: false,
    mode: 'single',
  });

  return (
    <div>
      <AppSidebar />
      <div className="px-6 py-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-6">Dashboard</h2>
          <div className="relative">
            <div
              onClick={() =>
                setCalenderSettings({
                  ...calenderSettings,
                  open: !calenderSettings.open,
                })
              }
              className="cursor-pointer flex items-center gap-2"
            >
              <FaCalendarAlt />
              <p>
                {date?.from ? date.from.toLocaleDateString() : ''}
                {date?.to ? ` - ${date.to.toLocaleDateString()}` : ''}
              </p>
            </div>
            {calenderSettings.open && (
              <div className="absolute right-0 z-10">
                <Calendar
                  mode={calenderSettings.mode}
                  defaultMonth={date?.from}
                  numberOfMonths={2}
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg border shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <InfoCard label="Net Sales" Icon={GiCash} value="12,000₹" />
          <InfoCard label="Stock Value" Icon={SiBitcoincash} value="45,000₹" />
          <InfoCard label="Net Purchase" Icon={ImStatsBars} value="67,000₹" />
          <InfoCard label="Net Profit" Icon={ImStatsBars2} value="4800₹" />
        </div>
      </div>
    </div>
  );
}
