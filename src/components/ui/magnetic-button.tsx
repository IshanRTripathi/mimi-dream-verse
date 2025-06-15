
import React, { useRef, useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAudio } from '@/contexts/AudioContext';

interface MagneticButtonProps extends ButtonProps {
  strength?: number;
}

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, strength = 0.2, children, onClick, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const { playSound } = useAudio();

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      buttonRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      if (!buttonRef.current) return;
      buttonRef.current.style.transform = 'translate(0px, 0px) scale(1)';
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playSound('pop');
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Button
        ref={buttonRef}
        className={cn(
          "relative transition-all duration-300 ease-out",
          "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
          "text-white font-bold shadow-xl",
          "hover:shadow-2xl",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        {...props}
      >
        <span className={cn(
          "relative z-10 transition-all duration-300",
          isHovered && "scale-110"
        )}>
          {children}
        </span>
      </Button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export { MagneticButton };
