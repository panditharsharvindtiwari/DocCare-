import { Link } from 'react-router-dom';
import { Doctor } from '../../types/doctor';
import { specialities } from '../../data/specialities';
import { DoctorAvatar } from './DoctorAvatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MapPin, Building2 } from 'lucide-react';
import './DoctorCard.css';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const speciality = specialities.find(s => s.id === doctor.specialityId);

  return (
    <article className="doctor-card">
      <div className="doctor-card__header">
        <DoctorAvatar name={doctor.name} photoUrl={doctor.photoUrl} size="md" />
        <div className="doctor-card__info">
          <h3 className="doctor-card__name">{doctor.name}</h3>
          <p className="doctor-card__designation">{doctor.designation}</p>
          {speciality && (
            <span className="doctor-card__speciality">{speciality.name}</span>
          )}
        </div>
      </div>

      <div className="doctor-card__meta">
        <div className="doctor-card__meta-row">
          <Building2 size={13} aria-hidden="true" />
          <span>{doctor.hospital}</span>
        </div>
        <div className="doctor-card__meta-row">
          <MapPin size={13} aria-hidden="true" />
          <span>{doctor.location}</span>
        </div>
      </div>

      {doctor.languages.length > 0 && (
        <div className="doctor-card__languages">
          {doctor.languages.map(lang => (
            <Badge key={lang} label={lang} variant="default" />
          ))}
        </div>
      )}

      {doctor.profileType === 'PUBLIC_REFERENCE' && (
        <p className="doctor-card__reference-note">
          Public profile reference — demo availability only
        </p>
      )}

      <div className="doctor-card__actions">
        <Link to={`/doctor/${doctor.id}`} className="doctor-card__link">
          <Button variant="outline" size="sm" fullWidth>View Profile</Button>
        </Link>
        <Link to={`/book/${doctor.id}`} className="doctor-card__link">
          <Button variant="primary" size="sm" fullWidth>Book Appointment</Button>
        </Link>
      </div>
    </article>
  );
}
