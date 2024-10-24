// Frontend-article-feeds-webapp/src/pages/SettingsPage.tsx

import React, { useEffect, useState } from 'react';
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
// import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const preferenceOptions = [
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'politics', label: 'Politics', icon: '🏛️' },
  { id: 'space', label: 'Space', icon: '🚀' },
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'news', label: 'News', icon: '📰' },
];

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  preferences: z.array(z.string()).min(1, {
    message: 'Please select at least one preference.',
  }),
});

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
//   const { toast } = useToast();

  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    preferences: [],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user');
        setInitialValues({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          password: '',
          preferences: response.data.preferences || [],
        });
        form.reset(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Update user data in API
      await axios.put('/api/user', values);
      alert('Settings Updated');
    //   toast({
    //     title: "Settings Updated",
    //     description: "Your personal information has been updated successfully.",
    //   });
      navigate('/'); // Redirect to homepage or dashboard
    } catch (error) {
        alert('Error updating settings');
    //   toast({
    //     title: 'Update Failed',
    //     description: 'There was an error updating your settings. Please try again.',
    //     variant: 'destructive',
    //   });
      console.error('Error updating settings:', error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Update Your Settings
          </h2>
          <p className="mt-2 text-muted-foreground">
            Edit your personal information and preferences.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
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
                    <Input placeholder="john.doe@example.com" {...field} />
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Leave blank to keep current password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences"
              render={() => (
                <FormItem>
                  <FormLabel>Your Interests</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
                    {preferenceOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="preferences"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.id}
                              className="flex flex-col items-center space-y-2"
                            >
                              <FormControl>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="lg"
                                  className={field.value?.includes(option.id) ? 'border-primary bg-primary text-primary-foreground' : ''}
                                  onClick={() => {
                                    const updatedPreferences = field.value?.includes(option.id)
                                      ? field.value.filter(value => value !== option.id)
                                      : [...(field.value || []), option.id];
                                    form.setValue('preferences', updatedPreferences, { shouldValidate: true });
                                  }}
                                >
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="text-2xl mb-1">{option.icon}</span>
                                    <span className="text-xs text-center">{option.label}</span>
                                  </div>
                                  {field.value?.includes(option.id) && <span>✔</span>}
                                </Button>
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <Button
            variant="link"
            className="text-sm text-muted-foreground hover:text-primary"
            onClick={() => navigate('/')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
