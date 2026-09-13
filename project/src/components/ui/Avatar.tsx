import React from 'react';
import { cn } from '../../utils/cn';

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  online?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  online = false,
  className,
  ...props 
}: AvatarProps) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const onlineBadgeSize = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <div className={cn(
        "rounded-full overflow-hidden bg-ember-light flex items-center justify-center",
        sizeClasses[size]
      )}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-ember-dark font-medium">
            {alt.substring(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      
      {online && (
        <span className={cn(
          "absolute bottom-0 right-0 block rounded-full bg-green-400 ring-2 ring-white",
          onlineBadgeSize[size]
        )} />
      )}
    </div>
  );
};

export default Avatar;