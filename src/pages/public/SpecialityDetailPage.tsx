import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { specialities, specialityContent } from '../../data/specialities';
import { mockDb } from '../../data/mockDb';
import { DoctorCard } from '../../components/doctor/DoctorCard';
import { Button } from '../../components/ui/Button';
import { ErrorState } from '../../components/ui/States';
import './SpecialityDetailPage.css';

export function SpecialityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const speciality = specialities.find(s => s.id === id && s.active);
  const content = specialityContent.find(c => c.specialityId === id);
  const doctors = mockDb.getDoctorsBySpeciality(id || '');

  if (!speciality) {
    return (
      <main className="page-content">
        <ErrorState
          title="Speciality not found"
          description="The medical speciality you are looking for does not exist or has been removed."
          action={<Button onClick={() => navigate('/specialities')}>View All Specialities</Button>}
        />
      </main>
    );
  }

  return (
    <main className="speciality-detail-page page-content">
      {/* Header */}
      <header className="spec-header">
        <div className="container">
          <Link to="/specialities" className="spec-header__back">
            <ArrowLeft size={16} /> Back to Specialities
          </Link>
          <div className="spec-header__content">
            <h1 className="text-display">{speciality.name}</h1>
            <p className="spec-header__category">{speciality.category}</p>
          </div>
        </div>
      </header>

      <div className="container spec-layout">
        <div className="spec-main">
          {content ? (
            <article className="spec-article">
              <section className="spec-section">
                <h2 className="text-h2">Overview</h2>
                <p className="text-body-lg">{content.overview}</p>
              </section>

              <section className="spec-section">
                <h3 className="text-h3">Common Conditions</h3>
                <ul className="spec-list">
                  {content.commonConditions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="spec-section">
                <h3 className="text-h3">Common Investigations</h3>
                <p className="spec-disclaimer">Common investigations vary according to symptoms and clinical assessment. Your doctor may recommend:</p>
                <ul className="spec-list">
                  {content.commonInvestigations.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="spec-section">
                <h3 className="text-h3">When to Consult</h3>
                <ul className="spec-list">
                  {content.whenToConsult.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="spec-section">
                <h3 className="text-h3">Treatment Approaches</h3>
                <p className="text-body">{content.commonTreatmentApproaches}</p>
              </section>
              
              <p className="spec-update-note">Last reviewed: {new Date(content.lastReviewed).toLocaleDateString()}</p>
            </article>
          ) : (
            <div className="spec-no-content">
              <p className="text-body">{speciality.shortDescription}</p>
              <p className="text-body-sm text-secondary" style={{ marginTop: 'var(--space-4)' }}>
                Detailed educational content for this speciality is currently being updated.
              </p>
            </div>
          )}
        </div>

        <aside className="spec-sidebar">
          <div className="spec-doctors">
            <h2 className="text-h3 spec-doctors__title">Doctors in {speciality.name}</h2>
            {doctors.length > 0 ? (
              <div className="spec-doctors__list">
                {doctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <p className="spec-doctors__empty">No doctors currently listed for this speciality.</p>
            )}
            
            <Link to={`/find-doctor?speciality=${speciality.id}`} className="spec-doctors__view-all">
              <Button variant="outline" fullWidth>View All Doctors</Button>
            </Link>
          </div>

          {content && content.relatedSpecialities.length > 0 && (
            <div className="spec-related">
              <h3 className="text-h4 spec-related__title">Related Specialities</h3>
              <ul className="spec-related__list">
                {content.relatedSpecialities.map(relId => {
                  const relSpec = specialities.find(s => s.id === relId);
                  if (!relSpec || !relSpec.active) return null;
                  return (
                    <li key={relId}>
                      <Link to={`/specialities/${relId}`} className="spec-related__link">
                        {relSpec.name} <ChevronRight size={14} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

