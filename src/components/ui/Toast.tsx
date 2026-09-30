import { useToast } from '../../context/ToastContext';
import './Toast.css';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map(toast => {
        const Icon = ICONS[toast.type];
        return (
          <div key={toast.id} className={`toast toast--${toast.type}`} role="status">
            <Icon size={16} className="toast__icon" aria-hidden="true" />
            <span className="toast__message">{toast.message}</span>
            <button
              className="toast__dismiss"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
