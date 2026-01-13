import { forwardRef, cloneElement, type Attributes, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'icon' | 'sm';
  asChild?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const buttonClasses = cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
        'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
      },
      {
        'h-10 px-4 py-2': size === 'default',
        'h-9 px-3': size === 'sm',
        'h-10 w-10': size === 'icon',
      },
      className
    );

    if (asChild) {
      const child = children as ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(buttonClasses, child.props?.className),
        ref,
      } as unknown as Attributes);
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
