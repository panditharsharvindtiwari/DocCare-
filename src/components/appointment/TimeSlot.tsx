import './TimeSlot.css';

interface TimeSlotProps {
  time: string;
  endTime: string;
  remaining: number;
  status: 'AVAILABLE' | 'LIMITED' | 'FULL' | 'PAST';
  selected?: boolean;
  onSelect: (time: string) => void;
}

function clock(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function TimeSlot({ time, endTime, remaining, status, selected = false, onSelect }: TimeSlotProps) {
  const unavailable = status === 'FULL' || status === 'PAST';
  const statusText = status === 'FULL'
    ? 'Full'
    : status === 'PAST'
      ? 'Past'
      : status === 'LIMITED'
        ? 'Limited · 1 spot available'
        : `${remaining} spots available`;

  return (
    <button
      type="button"
      className={`time-slot ${selected ? 'time-slot--selected' : ''} ${unavailable ? 'time-slot--unavailable' : ''}`}
      onClick={() => onSelect(time)}
      aria-label={`${clock(time)} to ${clock(endTime)}, ${statusText}`}
      aria-pressed={selected}
      disabled={unavailable}
    >
      <span className="time-slot__time">{clock(time)} – {clock(endTime)}</span>
      <span className="time-slot__availability">{statusText}</span>
    </button>
  );
}
