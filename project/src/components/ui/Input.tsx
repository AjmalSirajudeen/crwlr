import React from 'react';
import { cn } from '../../utils/cn';

type InputProps = {
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          className={cn(
            "w-full px-4 py-2 rounded-lg border transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
            error 
              ? "border-rose-500 bg-rose-50" 
              : "border-gray-300 hover:border-gray-400",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-rose-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;