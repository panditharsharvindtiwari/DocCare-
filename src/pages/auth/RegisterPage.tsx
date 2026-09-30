import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import './LoginPage.css';

export function RegisterPage() {
  const { user, register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <main className="login-page" aria-busy="true"><div className="login-container">Loading…</div></main>;
  if (user) return <Navigate to={user.role === 'patient' ? '/patient/dashboard' : '/'} replace />;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    const result = await register({ name, email, phone, password });
    setIsSubmitting(false);
    if (result.success) navigate('/patient/dashboard', { replace: true });
    else setError(result.error || 'Registration failed. Please try again.');
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <section className="login-card" aria-labelledby="register-heading">
          <header className="login-header">
            <h1 className="text-h2" id="register-heading">Create your patient account</h1>
            <p className="text-body-sm text-secondary" style={{ marginTop: 'var(--space-2)' }}>Use one account to manage and track your appointments.</p>
          </header>
          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="login-error" role="alert">{error}</div>}
            <Input label="Full Name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} required />
            <Input label="Email Address" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value.trim())} required />
            <Input label="Mobile Number" type="tel" pattern="[0-9]{10}" autoComplete="tel" value={phone} onChange={event => setPhone(event.target.value)} hint="Enter a 10-digit mobile number" required />
            <Input label="Password" type="password" autoComplete="new-password" minLength={8} value={password} onChange={event => setPassword(event.target.value)} hint="Use at least 8 characters" required />
            <Button type="submit" variant="primary" fullWidth size="lg" loading={isSubmitting}>Create Account</Button>
          </form>
          <p className="text-body-sm text-secondary" style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>Already registered? <Link to="/login">Sign in</Link></p>
          <p className="text-caption text-secondary" style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>Prototype account details are stored in this browser.</p>
        </section>
      </div>
    </main>
  );
}
