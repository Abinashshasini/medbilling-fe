'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, LogIn, Phone } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const FormSchema = z.object({
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be 10 digits'),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile: '',
      password: '',
    },
  });

  function onRegisterClick() {
    router.push('/register');
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null));
    // TODO: Handle login logic here
    router.push('/dashboard');
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white relative">
      <div className="absolute inset-0 bg-[url('/clouds-bg.svg')] bg-cover bg-center opacity-60" />

      <Card className="w-full max-w-md rounded-2xl shadow-lg relative z-10">
        <CardHeader className="flex flex-col items-center space-y-3 pt-6">
          <div className="p-3 rounded-full bg-sky-100 text-sky-600">
            <LogIn size={24} />
          </div>
          <h2 className="text-xl font-semibold">Login or Signup</h2>
          <p className="text-sm text-muted-foreground text-center">
            Enabling Pharmacies Since 2025
          </p>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2 px-6"
          >
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <Label htmlFor="email">Mobile Number</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        id="mobile"
                        type="number"
                        placeholder="Phone number"
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none focus:bg-transparent"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Password</Label>
                  <FormControl>
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="border-0 focus-visible:ring-0 focus:outline-none shadow-none focus:bg-transparent"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right" onClick={onRegisterClick}>
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Don&apos;t have an account? Signup
              </a>
            </div>
          </form>
        </Form>
        <CardContent className="space-y-4 px-6 pb-6">
          <Button
            className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-xl py-5"
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
