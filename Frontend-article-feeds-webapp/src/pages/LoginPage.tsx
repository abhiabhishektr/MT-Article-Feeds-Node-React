// Frontend-article-feeds-webapp/src/pages/LoginPage.tsx

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '@/api/authApi';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  identifier: z.string().min(1, {
    message: 'Email or phone number is required.',
  }),
  password: z.string().min(1, {
    message: 'Password must be at least 8 characters.',
  }),
});

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("values: ", values);
      const { data } = await loginApi(values);
      
      // Save token or perform other actions as necessary
      login(data.token);
      const userName = data.user || 'User';
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userName}!`,
      });
      navigate('/dashboard'); // Redirect to the homepage or dashboard
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid email/phone or password. Please try again.',
        variant: 'destructive',
      });
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Please enter your details.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email or phone" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <Button
            variant="link"
            className="text-sm text-muted-foreground hover:text-primary"
            onClick={() => navigate('/register')}
          >
            Don't have an account? Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
