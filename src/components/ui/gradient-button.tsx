
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends ButtonProps {
  gradient?: string;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, gradient = "from-purple-500 to-pink-500", children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden border-0 text-white font-semibold transition-all duration-300",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:transition-opacity before:duration-300",
          `before:${gradient}`,
          "hover:before:opacity-80 hover:scale-105 hover:shadow-lg",
          "active:scale-95",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </Button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton };
