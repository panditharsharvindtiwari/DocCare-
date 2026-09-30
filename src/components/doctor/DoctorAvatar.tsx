import { useState } from 'react';
import './DoctorAvatar.css';

interface DoctorAvatarProps {
  name: string;
  photoUrl?: string;
  photoSourceUrl?: string;
  photoLicense?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

function getInitials(name: string): string {
  const parts = name.replace(/^Dr\.\s*/i, '').trim().split(' ');
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const AVATAR_COLORS = [
  { bg: '#E8EAF2', text: '#3D4E9A' },
  { bg: '#EAF0EE', text: '#287D72' },
  { bg: '#F0EAE8', text: '#8B5442' },
  { bg: '#EDF0F2', text: '#4A5A6B' },
  { bg: '#EEF0F7', text: '#4A5499' },
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function DoctorAvatar({ name, photoUrl, size = 'md' }: DoctorAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  if (photoUrl && !imageFailed) {
    return <img src={photoUrl} alt={name} className={'doctor-avatar doctor-avatar--' + size} loading="lazy" onError={() => setImageFailed(true)} />;
  }
  const color = getAvatarColor(name);
  return <div className={'doctor-avatar doctor-avatar--' + size + ' doctor-avatar--initials'} style={{ backgroundColor: color.bg, color: color.text }} aria-label={name} role="img">{getInitials(name)}</div>;
}
