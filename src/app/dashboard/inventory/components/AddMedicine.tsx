'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Dispatch, FC, SetStateAction } from 'react';
import { FormSelect } from '@/components/ui/form-field';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Medicine name must be at least 2 characters.',
  }),
  batchNumber: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  expiryDate: z.string(),
  purchasePrice: z
    .number()
    .min(1, { message: 'Price must be greater than 0.' }),
  sellingPrice: z.number().min(1, { message: 'Price must be greater than 0.' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1.' }),
  unitType: z.string().min(1, { message: 'Unit type is required.' }),
  packaging: z.string().min(1, {
    message: 'Packaging is required.',
  }),
  supplierName: z.string().min(1, { message: 'Supplier name is required.' }),
});

type Tprops = {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

const AddMedicine: FC<Tprops> = ({ open, onClose }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      batchNumber: '',
      expiryDate: '',
      purchasePrice: 0,
      sellingPrice: 0,
      quantity: 1,
      unitType: '',
      packaging: '',
      supplierName: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('Submitted:', data);
    onClose(false);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogContent className="sm:max-w-[1200px] h-1/2">
            <DialogHeader>
              <DialogTitle>Add Medicine</DialogTitle>
              <DialogDescription>
                Fill in the details of the medicine you want to add.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Medicine Name"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="batchNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter medicine batch number"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sellect Expiry Date"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="purchasePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Purchase Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Purchase Price"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Selling Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Selling Price"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Quantity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Selling Price"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormSelect
                name="unitType"
                label="Medicine Type"
                control={form.control}
                placeholder="Select Medicine Type"
                options={[
                  { label: 'Tablet', value: 'Tablet' },
                  { label: 'Capsule', value: 'Capsule' },
                  { label: 'Syrup', value: 'Syrup' },
                  { label: 'Injection', value: 'Injection' },
                  { label: 'Tablet', value: 'Tablet' },
                  { label: 'Capsule', value: 'Capsule' },
                  { label: 'Syrup', value: 'Syrup' },
                  { label: 'Injection', value: 'Injection' },
                  { label: 'Tablet', value: 'Tablet' },
                  { label: 'Capsule', value: 'Capsule' },
                  { label: 'Syrup', value: 'Syrup' },
                  { label: 'Injection', value: 'Injection' },
                ]}
              />

              <FormSelect
                name="packaging"
                label="Packaging"
                control={form.control}
                placeholder="Select Packaging"
                options={[
                  { label: 'Tablet', value: 'Tablet' },
                  { label: 'Capsule', value: 'Capsule' },
                  { label: 'Syrup', value: 'Syrup' },
                  { label: 'Injection', value: 'Injection' },
                ]}
              />

              <FormSelect
                name="supplierName"
                label="Supplier Name"
                control={form.control}
                placeholder="Select Supplier Name"
                options={[
                  { label: 'Tablet', value: 'Tablet' },
                  { label: 'Capsule', value: 'Capsule' },
                  { label: 'Syrup', value: 'Syrup' },
                  { label: 'Injection', value: 'Injection' },
                ]}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default AddMedicine;
