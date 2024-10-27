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
import { BASE_URL } from '@/config';


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
  const [existingImages, setExistingImages] = useState<(string | File)[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);


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
      if (!id) return;
      try {
        const response = await getArticleById(id); // Fetch article by ID
        setArticle(response.data);
        
        // Store existing image paths
        
        setExistingImages(response.data.images || []);
        
        // Set form values including converting image paths to empty strings for file inputs
        form.reset({
          ...response.data,
          images: ['', ''],  // Reset form with article data
        });
      } catch (error) {
        console.error('Error fetching article:', error);
        toast({ description: 'Error fetching article.' });
      }
    };

    fetchArticle();
  }, [id, form]);

  async function onSubmit(values: FormValues) {
    const newImageFiles: File[] = [];
    const finalImagePaths: (string | File)[] = [...existingImages];
  
    // Handle new file uploads
    for (let i = 0; i < values.images.length; i++) {
      const image = values.images[i];
      if (image && image.startsWith('data:')) {
        try {
          const response = await fetch(image);
          const blob = await response.blob();
          newImageFiles.push(new File([blob], `image-${i}.png`, { type: blob.type }));
          
          // Remove corresponding existing image if it exists
          if (finalImagePaths[i]) {
            finalImagePaths.splice(i, 1);
          }
        } catch (error) {
          console.error('Error processing new image:', error);
        }
      }
    }
  
    // Create a FormData object for sending to the backend
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('content', values.content);
    formData.append('category', values.category);
    
    // Append tags
    values.tags.forEach(tag => formData.append('tags', tag));
    
    // Append new image files
    newImageFiles.forEach(file => formData.append('images', file));
    
    // Append existing images
    finalImagePaths.forEach(image => formData.append('existingImages', image));
  
    try {
      await updateArticle(id!, formData); // Pass FormData to updateArticle
      toast({ 
        description: "Article Updated", 
        variant: "destructive", 
        className: "bg-black text-white" 
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({ 
        description: `Error updating article: ${error.response.data.message}` , 
        variant: "destructive" 
      });
      console.error('Error updating article:', error);
    }
  }
  

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
                {/* Left Column */}
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
                            value={field.value.join(', ')}
                            onChange={(e) => {
                              const tagsArray = e.target.value
                                .split(',')
                                .map(tag => tag.trim())
                                .filter(tag => tag);
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
  
                {/* Right Column */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Content</FormLabel>
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
                        <FormLabel className="text-lg font-semibold">Images (Max 2)</FormLabel>
                        <div className="grid grid-cols-2 gap-4">
                          {[0, 1].map((index) => (
                            <div key={index} className="flex flex-col space-y-2">
                              {existingImages[index] ? (
                                <div className="relative">
                                  <img 
                                    src={`${BASE_URL}/${existingImages[index]}`} 
                                    alt={`Existing ${index}`} 
                                    className="h-32 w-full object-cover rounded-lg border border-gray-200"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
                                    onClick={() => {
                                      const newExistingImages = [...existingImages];
                                      const removedImageName = newExistingImages[index]; 
                                      
                                      newExistingImages.splice(index, 1);
                                      setExistingImages(newExistingImages);
                                      setRemovedImages((prev) => [...prev, removedImageName as string]);
                                      
                                    }}
                                    
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full"
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
                                  {form.getValues('images')[index] && (
                                    <div className="mt-2 relative">
                                      <img 
                                        src={form.getValues('images')[index]} 
                                        alt={`New upload ${index}`} 
                                        className="h-32 w-full object-cover rounded-lg"
                                      />
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
                                        onClick={() => {
                                          const newImages = [...form.getValues('images')];
                                          newImages[index] = '';
                                          form.setValue('images', newImages);
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  )}
                                </div>
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
  
              <div className="flex justify-end gap-4 mt-6">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
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
