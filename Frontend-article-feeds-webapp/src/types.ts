// src/types.ts

export interface User {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: string;
    password: string;
    preferences: string;
  }
  
  export interface Article {
    id: string;
    title: string;
    description: string;
    category: string;
    content: string;
    author: string;
    likes: string[];
    dislikes: string[];
    blocks: string[];
    images: string[];
    tags: string[];
    block?:string[]
  }
  