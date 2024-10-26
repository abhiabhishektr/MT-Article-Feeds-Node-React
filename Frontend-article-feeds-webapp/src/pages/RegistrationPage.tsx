import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, CheckIcon } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { signup } from '@/api/authApi';
import { useAuth } from '@/context/AuthContext';

const preferenceOptions = [
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'politics', label: 'Politics', icon: '🏛️' },
  { id: 'space', label: 'Space', icon: '🚀' },
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'news', label: 'News', icon: '📰' },
];

// Update form schema to include confirmPassword and validate it
const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  dob: z.date({ required_error: 'Please select a date of birth.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  preferences: z.array(z.string()).min(1, { message: 'Please select at least one preference.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

export default function RegistrationPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      preferences: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { confirmPassword, ...dataToSend } = values;
      const { data } = await signup(dataToSend);
  
      login(data.token);                                                                                                                        
      toast({
        title: "Registration Successful",
        description: "Enjoy your personalized news feed!",
      });
      navigate('/dashboard'); 
    } catch (error:any) {
      const errorMessage =
        error.response?.data?.message || 'There was an error during registration. Please try again.';
  
      toast({
        title: 'Registration Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      console.error('Error during registration:', error);
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join us and explore the world of news!
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
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
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <DatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          showYearDropdown
                          yearDropdownItemNumber={100}
                          dateFormat="yyyy/MM/dd"
                          minDate={new Date("1900-01-01")}
                          maxDate={new Date()}
                          placeholderText="Pick a date"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                                  className={cn(
                                    "w-full aspect-square",
                                    field.value?.includes(option.id) &&
                                    "border-primary bg-primary text-primary-foreground"
                                  )}
                                  onClick={() => {
                                    const updatedPreferences = field.value?.includes(
                                      option.id
                                    )
                                      ? field.value.filter(
                                        (value) => value !== option.id
                                      )
                                      : [...(field.value || []), option.id];
                                    form.setValue(
                                      "preferences",
                                      updatedPreferences,
                                      { shouldValidate: true }
                                    );
                                  }}
                                >
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="text-2xl mb-1">
                                      {option.icon}
                                    </span>
                                    <span className="text-xs text-center">
                                      {option.label}
                                    </span>
                                  </div>
                                  {field.value?.includes(option.id) && (
                                    <CheckIcon className="absolute top-1 right-1 h-4 w-4" />
                                  )}
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
              Register
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <Button
            variant="link"
            className="text-sm text-muted-foreground hover:text-primary"
            onClick={() => navigate('/login')}
          >
            Already have an account? Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
