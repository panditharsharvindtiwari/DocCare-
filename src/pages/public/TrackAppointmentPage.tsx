import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { mockDb } from '../../data/mockDb';
import { useMockDbVersion } from '../../hooks/useMockDbVersion';
import { Appointment } from '../../types/appointment';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { StatusTimeline } from '../../components/appointment/StatusTimeline';
import { format, parseISO } from 'date-fns';
import { formatTime } from '../../utils/formatUtils';
import './TrackAppointmentPage.css';

export function TrackAppointmentPage() {
  useMockDbVersion();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialId = searchParams.get('id') || '';
  const initialPhone = searchParams.get('phone') || '';

  const [appointmentId, setAppointmentId] = useState(initialId);
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Auto-search if params are present
  useEffect(() => {
    if (initialId && initialPhone) {
      performSearch(initialId, initialPhone);
    }
  }, [initialId, initialPhone]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!appointmentId.trim() || !phoneNumber.trim()) {
      setError('Please enter both Appointment ID and Mobile Number.');
      return;
    }
    
    // Update URL params
    const params = new URLSearchParams();
    params.set('id', appointmentId.trim());
    params.set('phone', phoneNumber.trim());
    setSearchParams(params);

    performSearch(appointmentId.trim(), phoneNumber.trim());
  }

  async function performSearch(id: string, phone: string) {
    setIsSearching(true);
    setError('');
    
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const found = mockDb.getAppointmentByIdAndPhone(id, phone);
      if (found) {
        setAppointment(found);
      } else {
        setAppointment(null);
        setError('No appointment found with the provided details. Please check and try again.');
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }

  function handleCancel() {
    if (!appointment || !window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      const updated = mockDb.cancelAppointment(appointment.id, appointment.patientName, 'patient');
      setAppointment(updated);
    } catch (err) {
      alert('Could not cancel appointment.');
    }
  }

  return (
    <main className="track-page page-content">
      <header className="track-header">
        <div className="container track-header__inner">
          <div className="track-header__content">
            <h1 className="text-h1">Track Appointment</h1>
            <p className="track-header__desc">
              Enter your appointment ID and registered mobile number to check the status recorded in this prototype.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="track-form">
            <div className="track-form__inputs">
              <Input
                placeholder="Appointment ID (e.g., DCP-2026-...)"
                value={appointmentId}
                onChange={e => setAppointmentId(e.target.value)}
                required
              />
              <Input
                placeholder="Mobile Number"
                type="tel"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="primary" loading={isSearching} disabled={isSearching}>
              <Search size={16} /> Track Status
            </Button>
          </form>
          {error && <p className="track-error">{error}</p>}
        </div>
      </header>

      {appointment && (
        <div className="container track-results">
          <div className="track-layout">
            <div className="track-main">
              <section className="track-section">
                <div className="track-section__header">
                  <h2 className="text-h3">Current Status</h2>
                  <StatusBadge status={appointment.status} />
                </div>
                
                <div className="track-timeline-container">
                  <StatusTimeline currentStatus={appointment.status} />
                </div>
                
                {appointment.status === 'WAITING' && appointment.tokenNumber && (
                  <div className="track-token-alert">
                    <p className="track-token-alert__label">Your Token Number</p>
                    <p className="track-token-alert__number">{String(appointment.tokenNumber).padStart(2, '0')}</p>
                    <p className="track-token-alert__desc">Please wait in the clinic area. The doctor will see you shortly.</p>
                  </div>
                )}
              </section>

              <section className="track-section">
                <h2 className="text-h4 track-section__title">Appointment History</h2>
                <div className="track-history">
                  {appointment.events.map(event => (
                    <div key={event.id} className="track-history__item">
                      <div className="track-history__time">
                        {format(parseISO(event.timestamp), 'h:mm a')}
                      </div>
                      <div className="track-history__content">
                        <p className="track-history__status">
                          Status updated to <strong>{event.status}</strong>
                        </p>
                        {event.note && <p className="track-history__meta">{event.note}</p>}
                        <p className="track-history__meta">
                          by {event.changedBy} ({event.changedByRole})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="track-sidebar">
              <div className="track-card">
                <h3 className="text-h4 track-card__title">Appointment Details</h3>
                
                <dl className="track-details">
                  <div className="track-details__item">
                    <dt><Calendar size={16} /> Date</dt>
                    <dd>{format(parseISO(appointment.date), 'EEEE, MMM d, yyyy')}</dd>
                  </div>
                  
                  <div className="track-details__item">
                    <dt><Clock size={16} /> Time</dt>
                    <dd>{formatTime(appointment.time)}</dd>
                  </div>
                  
                  <hr className="divider" />
                  
                  <div className="track-details__item">
                    <dt><Stethoscope size={16} /> Doctor</dt>
                    <dd>{mockDb.getDoctorById(appointment.doctorId)?.name}</dd>
                  </div>
                  
                  <div className="track-details__item">
                    <dt><MapPin size={16} /> Location</dt>
                    <dd>{mockDb.getDoctorById(appointment.doctorId)?.hospital}</dd>
                  </div>
                  
                  <hr className="divider" />
                  
                  <div className="track-details__item">
                    <dt><User size={16} /> Patient</dt>
                    <dd>{appointment.patientName}</dd>
                  </div>
                </dl>
                
                {['BOOKED', 'CONFIRMED'].includes(appointment.status) && (
                  <div className="track-actions">
                    <Button variant="danger" size="sm" fullWidth onClick={handleCancel}>
                      Cancel Appointment
                    </Button>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      )}
    </main>
  );
}

