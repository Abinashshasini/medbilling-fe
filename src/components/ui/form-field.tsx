// components/FormSelect.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Control, FieldValues, Path } from 'react-hook-form';

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  placeholder?: string;
  options: { label: string; value: string }[];
};

export function FormSelect<T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  options,
}: FormSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder || 'Select an option'} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-full">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
