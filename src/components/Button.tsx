import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  fullWidth = false,
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-[#1F6AE1] text-white hover:bg-[#0A2540] shadow-lg shadow-[#1F6AE1]/20 hover:shadow-xl hover:shadow-[#1F6AE1]/30',
    secondary: 'bg-[#0A2540] text-white hover:bg-[#1F6AE1]',
    outline: 'border-2 border-[#1F6AE1] text-[#1F6AE1] hover:bg-[#1F6AE1] hover:text-white'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
}
