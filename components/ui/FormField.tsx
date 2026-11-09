import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

interface BaseFieldProps {
  readonly id: string;
  readonly label: string;
  readonly helperText?: string;
  readonly errorMessage?: string;
}

export type InputFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement>;

export function InputField({
  id,
  label,
  helperText,
  errorMessage,
  className = '',
  ...props
}: InputFieldProps) {
  const hasError = Boolean(errorMessage);
  const describedBy = hasError
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  return (
    <div className="group flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium text-[#D4D4D8] group-focus-within:text-[#F27427] transition-colors"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        className={`min-h-[44px] w-full rounded-xl bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-[#71717A] border transition-all duration-200 hover:border-white/[0.18] focus:border-[#F27427] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#F27427] ${
          hasError ? 'border-[#EF4444] bg-[#450A0A]/30' : 'border-white/[0.1]'
        } ${className}`}
        {...props}
      />
      {hasError ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-[#FCA5A5]">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-xs text-[#9CA3AF]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

export interface SelectFieldProps
  extends BaseFieldProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  readonly options: readonly SelectOption[];
}

export function SelectField({
  id,
  label,
  options,
  helperText,
  errorMessage,
  className = '',
  ...props
}: SelectFieldProps) {
  const hasError = Boolean(errorMessage);
  return (
    <div className="group flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium text-[#D4D4D8] group-focus-within:text-[#F27427] transition-colors"
      >
        {label}
      </label>
      <select
        id={id}
        aria-invalid={hasError}
        className={`min-h-[44px] w-full rounded-xl bg-[#09090B] px-3.5 py-2.5 text-sm text-white border cursor-pointer transition-all duration-200 hover:border-white/[0.18] focus:border-[#F27427] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#F27427] ${
          hasError ? 'border-[#EF4444]' : 'border-white/[0.1]'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#121215] text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {hasError ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-[#FCA5A5]">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-xs text-[#9CA3AF]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export type TextareaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextareaField({
  id,
  label,
  helperText,
  errorMessage,
  className = '',
  ...props
}: TextareaFieldProps) {
  const hasError = Boolean(errorMessage);
  return (
    <div className="group flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium text-[#D4D4D8] group-focus-within:text-[#F27427] transition-colors"
      >
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={hasError}
        className={`w-full rounded-xl bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-[#71717A] border transition-all duration-200 hover:border-white/[0.18] focus:border-[#F27427] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#F27427] ${
          hasError ? 'border-[#EF4444] bg-[#450A0A]/30' : 'border-white/[0.1]'
        } ${className}`}
        {...props}
      />
      {hasError ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-[#FCA5A5]">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-xs text-[#9CA3AF]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
