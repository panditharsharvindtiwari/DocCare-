import { CheckCircle, Circle, XCircle } from 'lucide-react';
import { AppointmentStatus, STATUS_LABELS } from '../../types/appointment';
import { MAIN_STATUS_FLOW, getStatusFlowIndex } from '../../utils/appointmentUtils';
import './StatusTimeline.css';

interface StatusTimelineProps {
  currentStatus: AppointmentStatus;
}

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const isCancelled = currentStatus === 'CANCELLED';
  const isRescheduled = currentStatus === 'RESCHEDULED';
  const currentIndex = getStatusFlowIndex(currentStatus);

  if (isCancelled) {
    return (
      <div className="status-timeline status-timeline--cancelled">
        <XCircle size={18} aria-hidden="true" />
        <span>Appointment cancelled</span>
      </div>
    );
  }

  if (isRescheduled) {
    return (
      <div className="status-timeline status-timeline--rescheduled">
        <XCircle size={18} aria-hidden="true" />
        <span>Appointment rescheduled — a new appointment was created</span>
      </div>
    );
  }

  return (
    <ol className="status-timeline" aria-label="Appointment progress">
      {MAIN_STATUS_FLOW.map((status, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isPending = index > currentIndex;

        return (
          <li
            key={status}
            className={`status-timeline__step ${isDone ? 'status-timeline__step--done' : ''} ${isCurrent ? 'status-timeline__step--current' : ''} ${isPending ? 'status-timeline__step--pending' : ''}`}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <div className="status-timeline__icon">
              {isDone ? (
                <CheckCircle size={16} aria-hidden="true" />
              ) : isCurrent ? (
                <div className="status-timeline__dot status-timeline__dot--current" />
              ) : (
                <Circle size={16} aria-hidden="true" />
              )}
            </div>
            {index < MAIN_STATUS_FLOW.length - 1 && (
              <div className={`status-timeline__line ${isDone ? 'status-timeline__line--done' : ''}`} aria-hidden="true" />
            )}
            <span className="status-timeline__label">{STATUS_LABELS[status]}</span>
          </li>
        );
      })}
    </ol>
  );
}
