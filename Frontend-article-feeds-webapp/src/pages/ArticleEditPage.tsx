import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useNavigate, useParams } from 'react-router-dom';
import { ICreateArticle, updateArticle, getArticleById } from '@/api/articleApi'; 
import { allowedTypes } from './ArticleCreationPage';


const categoryOptions = [
  { id: 'sports', label: 'Sports' },
  { id: 'politics', label: 'Politics' },
  { id: 'space', label: 'Space' },
  { id: 'tech', label: 'Technology' },
  { id: 'news', label: 'News' },
];

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters.' }),
  images: z.array(z.string()),
  tags: z.array(z.string()).min(1, { message: 'Please add at least one tag.' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
});

type FormValues = z.infer<typeof formSchema>;

const ArticleEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ICreateArticle | null>(null); 

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

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticleById(id); // Fetch article by ID
        setArticle(response.data); // Set article data
        form.reset(response.data); // Reset form with article data
      } catch (error) {
        console.error('Error fetching article:', error);
        toast({ description: 'Error fetching article.' });
      }
    };

    fetchArticle();
  }, [id, form]);

  async function onSubmit(values: FormValues) {
    // Convert images from data URL to File
    const imagesAsFiles = await Promise.all(
      values.images.map(async (image) => {
        if (image) {
          const response = await fetch(image);
          const blob = await response.blob(); // Convert data URL to Blob
          return new File([blob], 'image.png', { type: blob.type }); // Create a File instance from the Blob
        }
        return null;
      })
    );

    // Prepare the article data for update
    const articleData: ICreateArticle = {
      title: values.title,
      description: values.description,
      content: values.content,
      category: values.category,
      tags: values.tags,
      images: imagesAsFiles.filter((image): image is File => image !== null),
    };

    try {
      await updateArticle(id, articleData); // Call the update API
      toast({ description: "Article Updated", variant: "destructive", className: "bg-black text-white" });
      navigate('/dashboard');
    } catch (error) {
      alert('Error updating article');
      console.error('Error updating article:', error);
    }
  }

  // Return loading or not found UI if article not loaded yet
  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-3xl font-extrabold text-gray-900">Edit Article</h2>
          <p className="mt-2 text-muted-foreground">Update the details of your article.</p>
        </div>
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Article Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter article title" {...field} className="h-12" />
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
                          <Textarea placeholder="Enter a brief description" {...field} className="min-h-[100px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Content</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter the main content of the article" {...field} className="min-h-[200px]" />
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
                        <FormLabel className="text-lg font-semibold">Images (Max 2)</FormLabel>
                        <div className="grid grid-cols-2 gap-4">
                          {form.getValues('images').map((image, index) => (
                            <div key={index} className="flex flex-col space-y-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file && allowedTypes.test(file.type)) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      const newImages = [...form.getValues('images')];
                                      newImages[index] = reader.result as string;
                                      form.setValue('images', newImages);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                              {image && <img src={image} alt={`Uploaded ${index}`} className="h-24 object-cover" />}
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Update Article
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditPage;
