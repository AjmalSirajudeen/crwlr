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
            "focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember",
            error
              ? "border-rose-500 bg-rose-50"
              : "border-stone-300 bg-white hover:border-stone-400",
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