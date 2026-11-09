import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly isLoading?: boolean;
  readonly children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-b from-[#FF8C42] to-[#E66316] text-white border border-[#FF9F63]/40 shadow-[0_6px_24px_-4px_rgba(242,116,39,0.5)] hover:brightness-110',
  secondary:
    'bg-white/[0.04] text-white border border-white/[0.12] hover:bg-white/[0.09] hover:border-white/[0.22]',
  outline:
    'bg-transparent text-white border border-white/[0.14] hover:border-[#F27427] hover:text-[#F27427]',
  ghost:
    'bg-transparent text-[#A1A1AA] border border-transparent hover:text-white hover:bg-white/[0.05]',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-[40px] px-4 py-2 text-xs font-medium rounded-xl',
  md: 'min-h-[44px] px-5 py-2.5 text-sm font-medium rounded-xl',
  lg: 'min-h-[48px] px-6 py-3 text-sm font-semibold rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`group inline-flex items-center justify-center gap-2 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F27427] disabled:opacity-50 disabled:pointer-events-none ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span>Procesando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
