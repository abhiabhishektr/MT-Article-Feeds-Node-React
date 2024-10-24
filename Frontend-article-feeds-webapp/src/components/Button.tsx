import React from 'react';
import { Button } from '@/components/ui/button';

interface ButtonProps {
  type?: 'submit' | 'button';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const MyButton: React.FC<ButtonProps> = ({ type = 'button', onClick, className, children }) => {
  return (
    <Button type={type} onClick={onClick} className={`py-2 px-4 bg-blue-600 text-white ${className}`}>
      {children}
    </Button>
  );
};
