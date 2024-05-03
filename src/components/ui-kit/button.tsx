import React, { ButtonHTMLAttributes } from 'react';

interface PdButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const PdButton: React.FC<PdButtonProps> = ({
  onClick,
  children,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-red-500 hover:bg-red-700 text-white font-bold py-[8px] px-[16px] mb-[16px] rounded-full focus:outline-none focus:shadow-outline ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PdButton;
