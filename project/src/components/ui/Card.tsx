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
        "rounded-2xl border overflow-hidden transition-all duration-200",
        !(className || '').includes('bg-') && "bg-paper-card border-stone-200",
        hoverEffect && "hover:border-stone-300 hover:shadow-sm cursor-pointer",
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
    <div className={cn("p-4 border-b border-stone-200", className)} {...props}>
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
    <div className={cn("p-4 border-t border-stone-200 bg-paper", className)} {...props}>
      {children}
    </div>
  );
};

export default Card;