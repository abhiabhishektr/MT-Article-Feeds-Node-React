import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categoryOptions = [
  { id: 'React', label: 'React' },
  { id: 'JavaScript', label: 'JavaScript' },
  { id: 'CSS', label: 'CSS' },
  { id: 'HTML', label: 'HTML' },
  { id: 'Node.js', label: 'Node.js' },
];

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  content: z.string().min(20, {
    message: 'Content must be at least 20 characters.',
  }),
  images: z.array(z.string()),
  tags: z.array(z.string()).min(1, {
    message: 'Please add at least one tag.',
  }),
  category: z.string().min(1, {
    message: 'Please select a category.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ArticleCreationPage: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      images: [''],
      tags: [],
      category: '',
    },
  });

  const handleImageChange = (index: number, value: string) => {
    const currentImages = form.getValues('images') || [''];
    const newImages = [...currentImages];
    newImages[index] = value;
    form.setValue('images', newImages);
  };

  async function onSubmit(values: FormValues) {
    try {
      await axios.post('/api/articles', values);
      alert('Article Created');
      navigate('/');
    } catch (error) {
      alert('Error creating article');
      console.error('Error creating article:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
        {/* Header Section */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create a New Article
          </h2>
          <p className="mt-2 text-muted-foreground">
            Fill in the details to create your article.
          </p>
        </div>
  
        {/* Main Form Section */}
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Article Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter article title" 
                            {...field} 
                            className="h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a brief description" 
                            {...field} 
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">Category</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full h-12 border rounded-lg px-3">
                              <option value="">Select a category</option>
                              {categoryOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
  
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">Tags</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter tags separated by commas"
                              onChange={(e) => {
                                const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                                form.setValue('tags', tagsArray);
                              }}
                              className="h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
  
                {/* Right Column */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Content</ FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter the main content of the article" 
                            {...field} 
                            className="min-h-[200px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="images"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Images (URLs)</FormLabel>
                        <div className="space-y-2">
                          {form.getValues('images').map((image, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Input
                                placeholder="Enter image URL"
                                value={image}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                className="h-12"
                              />
                              {index === form.getValues('images').length - 1 && (
                                <Button
                                  type="button"
                                  onClick={() => form.setValue('images', [...form.getValues('images'), ''])}
                                >
                                  Add Image
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
  
              <Button type="submit" className="w-full h-12">
                Create Article
              </Button>
            </form>
          </Form>
        </div>
  
        {/* Footer Section */}
        <div className="text-center p-6">
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

export default ArticleCreationPage;