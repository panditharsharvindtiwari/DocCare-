import './Badge.css';
import { AppointmentStatus, STATUS_LABELS } from '../../types/appointment';

interface BadgeProps {
  status: AppointmentStatus;
}

export function StatusBadge({ status }: BadgeProps) {
  return (
    <span className={`status-badge status-badge--${status.toLowerCase().replace('_', '-')}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

interface GenericBadgeProps {
  label: string;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error';
}

export function Badge({ label, variant = 'default' }: GenericBadgeProps) {
  return <span className={`badge badge--${variant}`}>{label}</span>;
}
