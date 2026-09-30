import { Link } from 'react-router-dom';
import { specialities } from '../../data/specialities';
import './SpecialitiesPage.css';

export function SpecialitiesPage() {
  // Group specialities by category
  const groupedSpecialities = specialities.filter(spec => spec.active).reduce((acc, spec) => {
    if (!acc[spec.category]) {
      acc[spec.category] = [];
    }
    acc[spec.category].push(spec);
    return acc;
  }, {} as Record<string, typeof specialities>);

  // Define category order
  const categoryOrder = [
    'Primary Care',
    "Women's & Men's Health",
    'Heart & Blood',
    'Brain & Nervous System',
    'Bones & Musculoskeletal',
    'Skin',
    'ENT & Eyes',
    'Respiratory',
    'Digestive',
    'Hormones',
    'Kidney',
    'Cancer',
    'Surgery',
    'Emergency & Critical Care',
    'Diagnostics',
    'Anaesthesia & Pain',
    'Sleep & Preventive Care',
    'Palliative Care',
    'Dental'
  ];

  return (
    <main className="specialities-page page-content">
      <div className="specialities-header">
        <div className="container">
          <h1 className="text-h1">Medical Specialities</h1>
          <p className="specialities-header__desc">Browse our comprehensive directory of medical specialities and services.</p>
        </div>
      </div>

      <div className="container specialities-content">
        <div className="specialities-grid">
          {categoryOrder.map(category => {
            const categorySpecs = groupedSpecialities[category];
            if (!categorySpecs || categorySpecs.length === 0) return null;

            return (
              <section key={category} className="speciality-category" aria-labelledby={`cat-${category.replace(/[^a-z0-9]/gi, '-')}`}>
                <h2 id={`cat-${category.replace(/[^a-z0-9]/gi, '-')}`} className="speciality-category__title">
                  {category}
                </h2>
                <div className="speciality-category__list">
                  {categorySpecs.map(spec => (
                    <Link 
                      key={spec.id} 
                      to={`/specialities/${spec.id}`}
                      className="speciality-category__item"
                    >
                      <h3 className="speciality-category__item-name">{spec.name}</h3>
                      <p className="speciality-category__item-desc">{spec.shortDescription}</p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

