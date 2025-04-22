import React from 'react';
import { cn } from '../../utils/cn';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className, hoverEffect = false, onClick, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300",
        hoverEffect && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("p-4 border-b border-gray-100", className)} {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("p-4 border-t border-gray-100 bg-gray-50/50", className)} {...props}>
      {children}
    </div>
  );
};

export default Card;