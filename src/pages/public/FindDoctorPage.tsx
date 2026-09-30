import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockDb } from '../../data/mockDb';
import { specialities } from '../../data/specialities';
import { DoctorCard } from '../../components/doctor/DoctorCard';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/States';
import './FindDoctorPage.css';

type SortOrder = 'relevance' | 'name';

export function FindDoctorPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedSpeciality, setSelectedSpeciality] = useState(searchParams.get('speciality') || '');
  const [selectedHospital, setSelectedHospital] = useState(searchParams.get('hospital') || '');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || '');
  const [hasSchedule, setHasSchedule] = useState(searchParams.get('schedule') || '');
  const [sortOrder, setSortOrder] = useState<SortOrder>((searchParams.get('sort') as SortOrder) || 'relevance');

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
    setSelectedSpeciality(searchParams.get('speciality') || '');
    setSelectedHospital(searchParams.get('hospital') || '');
    setSelectedGender(searchParams.get('gender') || '');
    setHasSchedule(searchParams.get('schedule') || '');
    setSortOrder(searchParams.get('sort') === 'name' ? 'name' : 'relevance');
  }, [searchParams]);

  const allDoctors = mockDb.getDoctors().filter(doctor => doctor.active);
  const hospitals = useMemo(() => Array.from(new Set(allDoctors.map(doctor => doctor.hospital))).sort(), [allDoctors]);
  const genders = useMemo(() => Array.from(new Set(allDoctors.map(doctor => doctor.gender).filter((value): value is 'Male' | 'Female' | 'Other' => Boolean(value)))).sort(), [allDoctors]);

  const filteredDoctors = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    const results = allDoctors.filter(doctor => {
      const speciality = specialities.find(item => item.id === doctor.specialityId);
      const searchable = [doctor.name, doctor.specialityId, speciality?.name, doctor.subspecialty, doctor.hospital, ...doctor.expertise]
        .filter(Boolean).join(' ').toLocaleLowerCase();
      if (query && !searchable.includes(query)) return false;
      if (selectedSpeciality && doctor.specialityId !== selectedSpeciality) return false;
      if (selectedHospital && doctor.hospital !== selectedHospital) return false;
      if (selectedGender && doctor.gender !== selectedGender) return false;
      if (hasSchedule === 'yes' && !doctor.schedules.some(schedule => schedule.active)) return false;
      if (hasSchedule === 'no' && doctor.schedules.some(schedule => schedule.active)) return false;
      return true;
    });

    if (sortOrder === 'name') return results.sort((a, b) => a.name.localeCompare(b.name));
    if (!query) return results.sort((a, b) => a.name.localeCompare(b.name));
    const score = (doctor: (typeof results)[number]) => {
      const name = doctor.name.toLocaleLowerCase();
      const speciality = specialities.find(item => item.id === doctor.specialityId)?.name.toLocaleLowerCase() || '';
      if (name === query) return 0;
      if (name.startsWith(query)) return 1;
      if (speciality === query) return 2;
      if (name.includes(query)) return 3;
      return 4;
    };
    return results.sort((a, b) => score(a) - score(b) || a.name.localeCompare(b.name));
  }, [allDoctors, searchQuery, selectedSpeciality, selectedHospital, selectedGender, hasSchedule, sortOrder]);

  function applyFilters(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedSpeciality) params.set('speciality', selectedSpeciality);
    if (selectedHospital) params.set('hospital', selectedHospital);
    if (selectedGender) params.set('gender', selectedGender);
    if (hasSchedule) params.set('schedule', hasSchedule);
    if (sortOrder !== 'relevance') params.set('sort', sortOrder);
    setSearchParams(params);
  }

  function clearFilters() {
    setSearchQuery('');
    setSelectedSpeciality('');
    setSelectedHospital('');
    setSelectedGender('');
    setHasSchedule('');
    setSortOrder('relevance');
    setSearchParams(new URLSearchParams());
  }

  const active = Boolean(searchQuery || selectedSpeciality || selectedHospital || selectedGender || hasSchedule || sortOrder !== 'relevance');
  const specialityOptions = specialities.filter(item => item.active).map(item => ({ value: item.id, label: item.name }));
  const scheduleOptions = [{ value: 'yes', label: 'Prototype schedule listed' }, { value: 'no', label: 'No schedule listed' }];
  const sortOptions = [{ value: 'relevance', label: 'Relevance' }, { value: 'name', label: 'Name' }];

  return (
    <main className="find-doctor-page page-content">
      <div className="find-doctor-header"><div className="container"><h1 className="text-h1">Find a Doctor</h1><p className="find-doctor-header__desc">Search by name, specialty, expertise or hospital, then refine the list.</p></div></div>
      <div className="container find-doctor-layout">
        <aside className="find-doctor-filters">
          <div className="find-doctor-filters__header"><h2 className="text-h4">Search and filters</h2>{active && <button type="button" onClick={clearFilters} className="find-doctor-filters__clear">Clear all</button>}</div>
          <form onSubmit={applyFilters} className="find-doctor-filters__form">
            <Input id="search-input" label="Search doctors" placeholder="Name, specialty, expertise or hospital" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <Select label="Specialty" options={specialityOptions} value={selectedSpeciality} onChange={e => setSelectedSpeciality(e.target.value)} placeholder="All specialties" />
            <Select label="Hospital/source" options={hospitals.map(value => ({ value, label: value }))} value={selectedHospital} onChange={e => setSelectedHospital(e.target.value)} placeholder="All hospitals" />
            {genders.length > 0 && <Select label="Gender (where verified)" options={genders.map(value => ({ value, label: value }))} value={selectedGender} onChange={e => setSelectedGender(e.target.value)} placeholder="Any" />}
            <Select label="Schedule" options={scheduleOptions} value={hasSchedule} onChange={e => setHasSchedule(e.target.value)} placeholder="Any schedule" />
            <Select label="Sort" options={sortOptions} value={sortOrder} onChange={e => setSortOrder(e.target.value as SortOrder)} />
            <Button type="submit" variant="primary" fullWidth className="find-doctor-filters__submit">Apply Filters</Button>
          </form>
        </aside>
        <section className="find-doctor-results" aria-live="polite">
          <div className="find-doctor-results__header"><p className="find-doctor-results__count">Showing <strong>{filteredDoctors.length}</strong> doctor{filteredDoctors.length === 1 ? '' : 's'}</p></div>
          {filteredDoctors.length ? <div className="find-doctor-grid">{filteredDoctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}</div> : <div className="find-doctor-empty"><EmptyState title="No doctors found" description="Try another search or clear some filters." action={<Button variant="outline" onClick={clearFilters}>Clear filters</Button>} /></div>}
        </section>
      </div>
    </main>
  );
}

