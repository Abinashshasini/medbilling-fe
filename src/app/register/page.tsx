'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';

// ✅ Validation Schema
const RegisterSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
  email_id: z.string().email('Invalid email'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  city: z.string().min(2, 'City is required'),
  market: z.string().min(2, 'Market is required'),
  gst_no: z.string().min(5, 'GST No is required'),
  logo: z.any().optional(), // file upload
  address: z.string().min(5, 'Address is required'),
  upi_id: z.string().regex(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID'),
});

export default function Register() {
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      mobile: '',
      email_id: '',
      password: '',
      city: '',
      market: '',
      gst_no: '',
      address: '',
      upi_id: '',
    },
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    console.log(JSON.stringify(data, null, 2));
    // TODO: Handle register logic
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white relative">
      <div className="absolute inset-0 bg-[url('/clouds-bg.svg')] bg-cover bg-center opacity-60" />

      <Card className="w-full max-w-2xl rounded-2xl shadow-lg relative z-10">
        <CardHeader className="flex flex-col items-center space-y-3 pt-6">
          <div className="p-3 rounded-full bg-sky-100 text-sky-600">
            <User size={24} />
          </div>
          <h2 className="text-xl font-semibold">Create Account</h2>
          <p className="text-sm text-muted-foreground text-center">
            Fill in the details to register your pharmacy
          </p>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-6"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Name</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Input
                        {...field}
                        placeholder="Full name"
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mobile */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <Label>Mobile</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Input
                        {...field}
                        type="number"
                        placeholder="10 digit mobile"
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email_id"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email address"
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>Password</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <Label>City</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Input
                        {...field}
                        type="text"
                        placeholder="City"
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Market */}
            <FormField
              control={form.control}
              name="market"
              render={({ field }) => (
                <FormItem>
                  <Label>Market</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Input
                        {...field}
                        type="text"
                        placeholder="Market"
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GST */}
            <FormField
              control={form.control}
              name="gst_no"
              render={({ field }) => (
                <FormItem>
                  <Label>GST No</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Input
                        {...field}
                        type="text"
                        placeholder="GST Number"
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Logo */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <Label>Logo</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address (full row) */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <Label>Address</Label>
                  <FormControl>
                    <Textarea {...field} placeholder="Full address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* UPI ID (full row) */}
            <FormField
              control={form.control}
              name="upi_id"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <Label>UPI ID</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Input
                        {...field}
                        type="text"
                        placeholder="example@upi"
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="md:col-span-2 mb-4">
              <Button
                type="submit"
                className="w-full bg-black hover:bg-neutral-800 text-white rounded-xl py-5"
              >
                Register
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
