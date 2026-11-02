import React from 'react';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  icon,
  iconPosition = 'right',
  className,
  children,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-navy-950 disabled:opacity-50 disabled:pointer-events-none group overflow-hidden select-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary: "bg-red-600 text-white font-semibold shadow-crimson-sm hover:shadow-crimson hover:bg-red-500 active:scale-[0.98]",
    secondary: "bg-navy-850/90 text-slate-100 border border-red-500/25 hover:border-red-500/60 hover:bg-navy-800 hover:text-white active:scale-[0.98] shadow-sm",
    outline: "bg-transparent text-slate-300 border border-slate-700/80 hover:border-red-500/80 hover:text-white hover:bg-red-500/10 active:scale-[0.98]",
    ghost: "bg-transparent text-slate-400 hover:text-rose-400 hover:bg-red-500/10 active:scale-[0.98]",
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
};
