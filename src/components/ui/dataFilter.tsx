'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { FaCalendarAlt } from 'react-icons/fa';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

type FilterMode = 'single' | 'range' | 'year';

export default function DateFilter({
  onChange,
}: {
  onChange: (value: any) => void;
}) {
  const [mode, setMode] = useState<FilterMode>('single');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<
    { from: Date | undefined; to?: Date | undefined } | undefined
  >({
    from: new Date(),
    to: undefined,
  });
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [open, setOpen] = useState(false);

  const handleSelect = (val: any) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Mode Selector */}
      <Select value={mode} onValueChange={(v: FilterMode) => setMode(v)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="single">Single Date</SelectItem>
          <SelectItem value="range">Date Range</SelectItem>
          <SelectItem value="year">Year</SelectItem>
        </SelectContent>
      </Select>

      {/* Calendar / Year Picker */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <FaCalendarAlt />
            {mode === 'single' && date && (
              <span>{date.toLocaleDateString()}</span>
            )}
            {mode === 'range' && range?.from && (
              <span>
                {range.from.toLocaleDateString()}{' '}
                {range.to ? `- ${range.to.toLocaleDateString()}` : ''}
              </span>
            )}
            {mode === 'year' && <span>{year}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-auto">
          {mode === 'single' && (
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                handleSelect(d);
              }}
              className="rounded-md border"
            />
          )}
          {mode === 'range' && (
            <Calendar
              mode="range"
              selected={range}
              onSelect={(r) => {
                setRange(r);
                handleSelect(r);
              }}
              numberOfMonths={2}
              className="rounded-md border"
            />
          )}
          {mode === 'year' && (
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 15 }, (_, i) => {
                const y = new Date().getFullYear() - 7 + i;
                return (
                  <Button
                    key={y}
                    variant={y === year ? 'default' : 'outline'}
                    onClick={() => {
                      setYear(y);
                      handleSelect(y);
                    }}
                  >
                    {y}
                  </Button>
                );
              })}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
