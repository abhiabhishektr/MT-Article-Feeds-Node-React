import { Article } from "@/types";

  const sampleArticles: Article[] = [
    {
      id: '1',
      title: 'Understanding React Hooks',
      description: 'This article explains the basics of React Hooks and how to use them in your applications.',
      category: 'React',
      content: 'React Hooks are functions that let you use state and other React features without writing a class. This article covers how to effectively utilize hooks in your components.',
      author: 'User1',
      authorName: 'John Doe',
      likes: ['userId1', 'userId2'], 
      dislikes: ['userId3'], 
      blocks: [], 
      images: ["https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"], // URLs for article images
      tags: ['React', 'Hooks', 'JavaScript'],
    },
    {
      id: '2',
      title: 'A Guide to JavaScript Promises',
      description: 'This article provides a comprehensive guide on JavaScript promises and asynchronous programming.',
      category: 'JavaScript',
      content: 'Promises are a way to handle asynchronous operations in JavaScript. This article explores their syntax and usage with practical examples.',
      author: 'User2',
      authorName: 'Jane Doe',
      likes: ['userId1'],
      dislikes: [],
      blocks: [],
      images: ["https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"],
      tags: ['JavaScript', 'Promises', 'Asynchronous'],
    },
    {
      id: '3',
      title: 'CSS Flexbox: A Beginner’s Guide',
      description: 'Learn how to create flexible and responsive layouts using CSS Flexbox in this beginner’s guide.',
      category: 'CSS',
      content: 'Flexbox is a layout model that allows for responsive design. This guide explains its properties and how to implement them.',
      author: 'User3',
      authorName: 'Jane Doe',
      likes: ['userId2', 'userId3'],
      dislikes: [],
      blocks: [],
      images: ["https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"],
      tags: ['CSS', 'Flexbox', 'Responsive Design'],
    },
    
    {
      id: '4',
      title: 'CSS Flexbox: A Beginner’s Guide',
      description: 'Learn how to create flexible and responsive layouts using CSS Flexbox in this beginner’s guide.',
      category: 'CSS',
      content: 'Flexbox is a layout model that allows for responsive design. This guide explains its properties and how to implement them.',
      author: 'User3',
      authorName: 'Jane Doe',
      likes: ['userId2', 'userId3'],
      dislikes: [],
      blocks: [],
      images: ["https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"],
      tags: ['CSS', 'Flexbox', 'Responsive Design'],
    },
    
  ];
  
  export default sampleArticles;
  