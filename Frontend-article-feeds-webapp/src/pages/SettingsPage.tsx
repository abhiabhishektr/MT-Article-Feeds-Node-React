import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, UpdatePasswordData, updateUserPassword, updateUserProfile, UpdateUserProfileData } from '@/api/userApi';

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
  email: z.string().email(),
  phone: z.string(),
  preferences: z.array(z.string()).min(1, {
    message: 'Please select at least one preference.',
  }),
});

const passwordFormSchema = z.object({
  oldPassword: z.string().min(8, {
    message: 'Old password must be at least 8 characters.',
  }),
  newPassword: z.string().min(8, {
    message: 'New password must be at least 8 characters.',
  }),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferences: [] as string[],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userData
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserProfile();
        const data = {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone,
          preferences: response.data.preferences || [],
        };
        setUserData(data);
        form.reset(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [form]);

  // Update these functions in your SettingsPage component
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const updatePayload: UpdateUserProfileData = {
        firstName: values.firstName,
        lastName: values.lastName,
        preferences: values.preferences,
      };

      await updateUserProfile(updatePayload);
      setIsEditing(false);
      setUserData({
        ...userData,
        firstName: values.firstName,
        lastName: values.lastName,
        preferences: values.preferences,
      });

      toast({
        description: "successfully updated profile",
        className: "bg-black text-white",
      })
    } catch (error : any) {
      toast({
        description: error.response.data.message,
        variant: "destructive",
        className: "bg-black text-white",
      })
      console.error('Error updating profile:', error);
    }
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    try {
      const passwordData: UpdatePasswordData = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };

      await updateUserPassword(passwordData);
      setIsChangingPassword(false);
      passwordForm.reset();
      toast({
        description: "successfully updated password",
        className: "bg-black text-white",
      })
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "destructive",
        className: "bg-black text-white",
      })
      console.error('Error updating password:', error.response.data.message);
    }
  }
  const handleCancel = () => {
    form.reset(userData);
    setIsEditing(false);
  };

  const handlePasswordCancel = () => {
    passwordForm.reset();
    setIsChangingPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Profile Settings
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isEditing ? 'Edit your personal information and preferences.' : 'View your profile information.'}
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
                    <Input
                      placeholder="John"
                      {...field}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-100' : ''}
                    />
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
                    <Input
                      placeholder="Doe"
                      {...field}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-100' : ''}
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
                    <Input
                      {...field}
                      disabled={true}
                      className="bg-gray-100"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">You can't update email</p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={true}
                      className="bg-gray-100"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">You can't update phone</p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferences"
              render={() => (
                <FormItem>
                  <FormLabel>Your Interests</FormLabel>
                  <div className="grid grid-cols-3 gap-4 mt-2">
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
                                  disabled={!isEditing}
                                  className={`
                                    w-24 h-24 rounded-full flex flex-col items-center justify-center space-y-2
                                    ${field.value?.includes(option.id) ? 'border-primary bg-primary text-primary-foreground' : ''}
                                    ${!isEditing ? 'opacity-75' : ''}
                                  `}
                                  onClick={() => {
                                    if (isEditing) {
                                      const updatedPreferences = field.value?.includes(option.id)
                                        ? field.value.filter(value => value !== option.id)
                                        : [...(field.value || []), option.id];
                                      form.setValue('preferences', updatedPreferences, { shouldValidate: true });
                                    }
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

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Update Profile
                </Button>
              </div>
            )}
          </form>
        </Form>

        {/* Separate Password Change Section */}
        {!isChangingPassword && !isEditing && (
          <div className="pt-6 border-t">
            <Button
              onClick={() => setIsChangingPassword(true)}
              variant="outline"
              className="w-full"
            >
              Change Password
            </Button>
          </div>
        )}
        {!isEditing && !isChangingPassword && (
            <div className="flex justify-end">
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="w-full"              >
                Edit Profile
              </Button>
            </div>
          )}

        {isChangingPassword && (
          <div className="pt-6 border-t">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePasswordCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Update Password
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

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