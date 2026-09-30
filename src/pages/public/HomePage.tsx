import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Baby, Bone, ChevronRight, HeartPulse, Search, Sparkles, Stethoscope } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { specialities } from '../../data/specialities';
import { doctors } from '../../data/doctors';
import { DoctorCard } from '../../components/doctor/DoctorCard';
import heroImage from '../../assets/hero-clinical.png';
import './HomePage.css';

const POPULAR_SPECIALITY_IDS = [
  'cardiology', 'orthopaedics', 'dermatology', 'gastroenterology',
  'neurology', 'paediatrics', 'obstetrics-gynaecology', 'dentistry',
];
const SPECIALITY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  cardiology: HeartPulse,
  orthopaedics: Bone,
  dermatology: Sparkles,
  gastroenterology: Activity,
  neurology: Activity,
  paediatrics: Baby,
  'obstetrics-gynaecology': HeartPulse,
  dentistry: Stethoscope,
};
const HOW_IT_WORKS = [
  { step: '01', title: 'Find your doctor', description: 'Explore specialties and public profile references for clinicians in Indore.' },
  { step: '02', title: 'Choose a slot', description: 'Select a date and a time shown in the prototype schedule.' },
  { step: '03', title: 'Enter patient details', description: 'Add the details needed to create an appointment record.' },
  { step: '04', title: 'Track your appointment', description: 'Use your appointment ID and phone number to view status updates.' },
];

export function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [phone, setPhone] = useState('');

  const popularSpecialities = POPULAR_SPECIALITY_IDS
    .map(id => specialities.find(item => item.id === id))
    .filter((item): item is (typeof specialities)[number] => Boolean(item));
  const featuredDoctors = doctors.filter(doctor => doctor.active).slice(0, 4);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? '/find-doctor?q=' + encodeURIComponent(query) : '/find-doctor');
  }

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    navigate('/track?id=' + encodeURIComponent(appointmentId.trim()) + '&phone=' + encodeURIComponent(phone.trim()));
  }

  return (
    <main className="home-page page-content">
      <section className="home-hero" aria-labelledby="hero-heading">
        <div className="container home-hero__inner">
          <div className="home-hero__content">
            <p className="home-hero__eyebrow text-label">Indore · Outpatient appointments</p>
            <h1 id="hero-heading" className="home-hero__heading">Find the right care.<br />Book with confidence.</h1>
            <p className="home-hero__subheading">Discover specialties and doctor profile references in Indore, then follow a clear appointment journey in one place.</p>
            <form className="home-hero__search" onSubmit={handleSearch} role="search" aria-label="Doctor and specialty search">
              <div className="home-hero__search-field">
                <Search size={18} className="home-hero__search-icon" aria-hidden="true" />
                <input type="search" className="home-hero__search-input" placeholder="Doctor, specialty or hospital" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} aria-label="Search doctor, specialty or hospital" />
              </div>
              <Button type="submit" variant="primary" size="lg">Find a Doctor</Button>
            </form>
            <Link className="home-hero__secondary" to="/track">Track Appointment <ChevronRight size={16} /></Link>
          </div>
          <div className="home-hero__visual">
            <img src={heroImage} alt="A healthcare professional speaking with a patient in a consultation room" />
            <div className="home-hero__image-caption">Care begins with finding the right specialist.</div>
          </div>
        </div>
      </section>

      <section className="section home-specialities" aria-labelledby="specialities-heading">
        <div className="container">
          <div className="home-section-header">
            <div><h2 id="specialities-heading" className="text-h2">Popular specialties</h2><p className="home-section-subtitle">Explore common areas of care in Indore</p></div>
            <Link to="/specialities" className="home-section-link">View all specialties <ChevronRight size={16} /></Link>
          </div>
          <div className="home-specialities__grid">
            {popularSpecialities.map(speciality => {
              const Icon = SPECIALITY_ICONS[speciality.id] || Stethoscope;
              return <Link key={speciality.id} to={'/specialities/' + speciality.id} className="home-speciality-card"><Icon className="home-speciality-card__icon" size={20} /><span className="home-speciality-card__name">{speciality.name}</span><span className="home-speciality-card__desc">{speciality.shortDescription}</span></Link>;
            })}
          </div>
        </div>
      </section>

      <section className="section home-doctors" aria-labelledby="doctors-heading">
        <div className="container">
          <div className="home-section-header">
            <div><h2 id="doctors-heading" className="text-h2">Featured doctors in Indore</h2><p className="home-section-subtitle">Public profile references from hospital sources</p></div>
            <Link to="/find-doctor" className="home-section-link">View all doctors <ChevronRight size={16} /></Link>
          </div>
          <div className="home-doctors__grid">{featuredDoctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}</div>
        </div>
      </section>

      <section className="section home-how" aria-labelledby="how-heading">
        <div className="container">
          <div className="home-section-header"><div><h2 id="how-heading" className="text-h2">How it works</h2><p className="home-section-subtitle">A simple path from discovery to appointment tracking</p></div></div>
          <div className="home-how__steps">{HOW_IT_WORKS.map(item => <article key={item.step} className="home-how__step"><span className="home-how__step-number">{item.step}</span><h3 className="home-how__step-title">{item.title}</h3><p className="home-how__step-desc">{item.description}</p></article>)}</div>
        </div>
      </section>

      <section className="section home-track" aria-labelledby="track-heading">
        <div className="container home-track__inner">
          <div><p className="home-hero__eyebrow text-label">Appointment support</p><h2 id="track-heading" className="text-h2">Already booked?</h2><p className="home-section-subtitle">Enter the appointment ID and mobile number used during booking.</p></div>
          <form className="home-track__form" onSubmit={handleTrack}>
            <input aria-label="Appointment ID" placeholder="Appointment ID" value={appointmentId} onChange={e => setAppointmentId(e.target.value)} required />
            <input aria-label="Mobile number" type="tel" inputMode="numeric" pattern="[0-9]{10}" placeholder="10-digit mobile number" value={phone} onChange={e => setPhone(e.target.value)} required />
            <Button type="submit" variant="primary">Track Appointment</Button>
          </form>
        </div>
      </section>

      <section className="section home-discovery" aria-labelledby="discovery-heading">
        <div className="container home-discovery__inner"><h2 id="discovery-heading" className="text-h2">Indore healthcare discovery</h2><p>Doctor Care Plus brings specialty information and publicly available clinician profile references together to help people explore outpatient care in Indore. Profile details are linked to their source; appointment schedules in this prototype should not be treated as hospital availability.</p><p className="home-discovery__disclaimer">Doctor information is shown for prototype and educational demonstration. Doctor Care Plus is not affiliated with the listed hospitals or clinicians.</p></div>
      </section>
    </main>
  );
}

