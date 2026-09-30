import React from 'react';
import { Loader2 } from 'lucide-react';
import './States.css';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="state-container">
      <Loader2 size={24} className="state-spinner" aria-hidden="true" />
      <p className="state-message">{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="state-container">
      <p className="state-title">{title}</p>
      {description && <p className="state-message">{description}</p>}
      {action && <div className="state-action">{action}</div>}
    </div>
  );
}

interface ErrorStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function ErrorState({ title, description, action }: ErrorStateProps) {
  return (
    <div className="state-container state-container--error">
      <p className="state-title state-title--error">{title}</p>
      {description && <p className="state-message">{description}</p>}
      {action && <div className="state-action">{action}</div>}
    </div>
  );
}
