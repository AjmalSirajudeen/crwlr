import React from 'react';
import { cn } from '../../utils/cn';

type BadgeProps = {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

const Badge = ({
  variant = 'default',
  children,
  className,
  ...props
}: BadgeProps) => {
  const variantClasses = {
    default: 'bg-stone-200 text-stone-800',
    primary: 'bg-ember-light text-ember-dark',
    secondary: 'bg-stone-800 text-amber-100',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-900',
    error: 'bg-rose-100 text-rose-800'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
