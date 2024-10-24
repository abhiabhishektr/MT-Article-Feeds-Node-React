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
    content: string;
    category: string;
    tags: string[];
    likes: number;
    dislikes: number;
    blocks: number;
  }
  