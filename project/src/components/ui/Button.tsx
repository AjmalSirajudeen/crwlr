import React from 'react';
import { cn } from '../../utils/cn';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = "rounded-full font-medium transition-colors duration-150 flex items-center justify-center disabled:opacity-50";

  const variantStyles = {
    primary: "bg-ink text-paper hover:bg-stone-800",
    secondary: "bg-ember text-white hover:bg-ember-dark",
    accent: "bg-stone-800 text-amber-100 hover:bg-stone-700",
    outline: "border border-stone-400 text-ink hover:bg-stone-100",
    ghost: "text-ink hover:bg-stone-100"
  };

  const sizeStyles = {
    sm: "text-sm py-1 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
