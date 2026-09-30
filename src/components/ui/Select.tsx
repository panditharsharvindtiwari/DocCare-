import { SelectHTMLAttributes, forwardRef, useId } from 'react';
import './Select.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, id, options, placeholder, className = '', ...props },
  ref
) {
  const generatedId = useId();
  const selectId = id || 'select-' + generatedId;
  return (
    <div className={`select-group ${className}`}>
      {label && (
        <label className="select-label" htmlFor={selectId}>
          {label}
          {props.required && <span className="input-required" aria-hidden="true"> *</span>}
        </label>
      )}
      <select
        id={selectId}
        ref={ref}
        className={`select-field ${error ? 'select-field--error' : ''}`}
        aria-invalid={!!error}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="input-error" role="alert">{error}</span>}
      {hint && !error && <span className="input-hint">{hint}</span>}
    </div>
  );
});

