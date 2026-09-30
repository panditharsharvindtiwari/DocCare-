import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, Globe, Languages, BriefcaseMedical, Stethoscope, FileText } from 'lucide-react';
import { mockDb } from '../../data/mockDb';
import { specialities } from '../../data/specialities';
import { DoctorAvatar } from '../../components/doctor/DoctorAvatar';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ErrorState } from '../../components/ui/States';
import './DoctorProfilePage.css';

function listedExperience(value: string) {
  return /^\d+/.test(value) ? value : 'Experience not listed in source';
}

export function DoctorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctor = mockDb.getDoctorById(id || '');
  const speciality = doctor ? specialities.find(item => item.id === doctor.specialityId) : undefined;

  if (!doctor) return <main className="page-content"><ErrorState title="Doctor not found" description="The doctor profile you are looking for does not exist or has been removed." action={<Button onClick={() => navigate('/find-doctor')}>Find a Doctor</Button>} /></main>;

  return (
    <main className="doctor-profile-page page-content">
      <header className="doctor-profile-header">
        <div className="container">
          <Link to="/find-doctor" className="doctor-profile-header__back"><ArrowLeft size={16} /> Back to Search</Link>
          <div className="doctor-profile-header__main">
            <DoctorAvatar name={doctor.name} photoUrl={doctor.photoUrl} size="xl" />
            <div className="doctor-profile-header__info">
              <h1 className="text-display">{doctor.name}</h1>
              <p className="doctor-profile-header__designation">{doctor.designation}</p>
              {doctor.subspecialty && <p className="doctor-profile-header__subspecialty">{doctor.subspecialty}</p>}
              <p className="doctor-profile-header__experience"><BriefcaseMedical size={17} /> {listedExperience(doctor.experience)}</p>
              <div className="doctor-profile-header__meta">
                {speciality && <Badge label={speciality.name} variant="accent" />}
                {doctor.profileType === 'PUBLIC_REFERENCE' && <Badge label="Public Profile Reference" variant="default" />}
              </div>
            </div>
            <div className="doctor-profile-header__actions"><Link to={`/book/${doctor.id}`}><Button variant="primary" size="lg" fullWidth>Book Appointment</Button></Link></div>
          </div>
        </div>
      </header>

      <div className="container doctor-profile-layout">
        <div className="doctor-profile-main">
          <div className="doctor-profile-disclaimer"><strong>{doctor.profileType === 'PUBLIC_REFERENCE' ? 'Public profile reference:' : 'Prototype profile:'}</strong> Professional information is displayed from available sources for educational demonstration. Doctor Care Plus is not affiliated with the listed hospital or clinician. Appointment slots are simulated and do not represent hospital availability.</div>
          <section className="doctor-profile-section"><h2 className="text-h3">About</h2><p className="text-body-lg">{doctor.bio}</p></section>
          <section className="doctor-profile-section"><h2 className="text-h3">Clinical Expertise & Areas of Practice</h2><ul className="doctor-profile-list">{doctor.expertise.map((item, index) => <li key={index}>{item}</li>)}</ul></section>
          <section className="doctor-profile-section"><h2 className="text-h3">Qualifications</h2><p className="text-body">{doctor.qualifications}</p></section>
        </div>
        <aside className="doctor-profile-sidebar">
          <div className="doctor-profile-card">
            <h3 className="text-h4 doctor-profile-card__title">Professional Details</h3>
            <dl className="doctor-profile-details">
              {speciality && <div className="doctor-profile-details__row"><dt><Stethoscope size={16} /> Specialty</dt><dd>{speciality.name}</dd></div>}
              {doctor.subspecialty && <div className="doctor-profile-details__row"><dt><FileText size={16} /> Subspecialty</dt><dd>{doctor.subspecialty}</dd></div>}
              <div className="doctor-profile-details__row"><dt><Building2 size={16} /> Hospital/source</dt><dd>{doctor.hospital}</dd></div>
              <div className="doctor-profile-details__row"><dt><MapPin size={16} /> Location</dt><dd>{doctor.location}</dd></div>
              <div className="doctor-profile-details__row doctor-profile-details__row--experience"><dt><BriefcaseMedical size={16} /> Experience</dt><dd>{listedExperience(doctor.experience)}</dd></div>
              {doctor.languages.length > 0 && <div className="doctor-profile-details__row"><dt><Languages size={16} /> Languages</dt><dd>{doctor.languages.join(', ')}</dd></div>}
              {doctor.sourceUrl && <div className="doctor-profile-details__row"><dt><Globe size={16} /> Source profile</dt><dd><a href={doctor.sourceUrl} target="_blank" rel="noopener noreferrer">View source profile</a></dd></div>}
            </dl>
          </div>
        </aside>
      </div>
    </main>
  );
}
