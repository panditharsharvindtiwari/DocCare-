import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react';
import './Input.css';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, prefix, id, className = '', ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id || 'input-' + generatedId;
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label" htmlFor={inputId}>
          {label}
          {props.required && <span className="input-required" aria-hidden="true"> *</span>}
        </label>
      )}
      <div className="input-control">
        {prefix && <span className="input-prefix" aria-hidden="true">{prefix}</span>}
        <input
          id={inputId}
        ref={ref}
        className={`input-field ${error ? 'input-field--error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
      </div>
      {error && (
        <span id={`${inputId}-error`} className="input-error" role="alert">
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={`${inputId}-hint`} className="input-hint">
          {hint}
        </span>
      )}
    </div>
  );
});

