'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiResponse } from '@/lib/apiTypes';
import { Suppliers } from '@/app/types/Suppliers.typs';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z
    .string()
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, {
      message: 'Invalid phone number',
    }),
  email: z.string().email({ message: 'Invalid email address.' }),
  address: z.string().min(10, { message: 'Address is too short' }),
});

type TForm = z.infer<typeof FormSchema>;

type TProps = {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  selectedSupplier: Suppliers | null;
};

const AddSuppliers: FC<TProps> = ({ open, onClose, selectedSupplier }) => {
  const form = useForm<TForm>({
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();

  /** Function to add a new supplier */
  const handleAddSupplier = async (data: TForm) => {
    try {
      const response = await axios.post<ApiResponse<null>>(
        `${API_ENDPOINT}/suppliers`,
        data,
      );
      if (response && response.data && response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['suppliersData'] });
        toast.success(response.data.message, {
          position: 'top-right',
        });
        onClose(false);
      }
    } catch (error) {
      toast.error('Failed to add supplier');
      console.error('Failed to add supplier:', error);
    }
  };

  /** Function to edit a supplier */
  const handleEditSupplier = async (data: TForm) => {
    try {
      const response = await axios.put<ApiResponse<null>>(
        `${API_ENDPOINT}/suppliers/${selectedSupplier?.id}`,
        data,
      );
      if (response && response.data && response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['suppliersData'] });
        toast.success(response.data.message, {
          position: 'top-right',
        });
        onClose(false);
      }
    } catch (error) {
      toast.error('Failed to add supplier');
      console.error('Failed to add supplier:', error);
    }
  };

  /** Effect to reset the form if edit is clicked */
  useEffect(() => {
    if (selectedSupplier) {
      form.reset({
        name: selectedSupplier.name,
        phone: selectedSupplier.phone,
        email: selectedSupplier.email,
        address: selectedSupplier.address,
      });
    } else {
      form.reset({
        name: '',
        phone: '',
        email: '',
        address: '',
      });
    }
  }, [selectedSupplier]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedSupplier ? 'Edit Supplier' : 'Add Supplier'}
          </DialogTitle>
          <DialogDescription>
            Fill out the supplier details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(selectedSupplier ? handleEditSupplier : handleAddSupplier)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Supplier name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mobile number"
                      {...field}
                      type="tel"
                      max="10"
                      min="10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSuppliers;
