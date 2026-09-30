import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import './LoginPage.css';

interface LoginPageProps {
  type: 'patient' | 'staff';
}

export function LoginPage({ type }: LoginPageProps) {
  const { user, login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default credentials based on type
  const defaultEmail = type === 'patient' ? 'rahul.verma@demo.dcp' : 'rec.indore@doctorcare.in';

  if (isLoading) {
    return <div className="page-content" style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>Loading...</div>;
  }

  if (user) {
    if (user.role === 'patient') return <Navigate to="/patient/dashboard" replace />;
    if (user.role === 'receptionist') return <Navigate to="/reception" replace />;
    if (user.role === 'doctor') return <Navigate to="/doctor" replace />;
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const result = await login(email, password, type);
    if (result.success) {
      // Auth context handles state update, which triggers re-render and redirect above
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsSubmitting(false);
  }

  function prefillCredentials(role: string) {
    if (role === 'patient') {
      setEmail('rahul.verma@demo.dcp');
      setPassword('password123');
    } else if (role === 'receptionist') {
      setEmail('rec.indore@doctorcare.in');
      setPassword('password123');
    } else if (role === 'doctor') {
      setEmail('doc.sharma@doctorcare.in');
      setPassword('password123');
    } else if (role === 'admin') {
      setEmail('admin@doctorcare.in');
      setPassword('admin123');
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="text-h2">
              {type === 'patient' ? 'Patient Portal' : 'Staff Portal'}
            </h1>
            <p className="text-body-sm text-secondary" style={{ marginTop: 'var(--space-2)' }}>
              Sign in to manage your appointments and profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={defaultEmail}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button type="submit" variant="primary" fullWidth size="lg" loading={isSubmitting}>
              Sign In
            </Button>
          </form>

          {type === 'patient' && <p className="text-body-sm text-secondary" style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>New to Doctor Care Plus? <Link to="/register">Create account</Link></p>}

          {/* Prototype Demo Actions */}
          <div className="login-demo">
            <p className="login-demo__title">Quick login for demo purposes:</p>
            <div className="login-demo__actions">
              {type === 'patient' ? (
                <button type="button" onClick={() => prefillCredentials('patient')} className="login-demo__btn">
                  Fill Patient Demo
                </button>
              ) : (
                <>
                  <button type="button" onClick={() => prefillCredentials('receptionist')} className="login-demo__btn">
                    Receptionist
                  </button>
                  <button type="button" onClick={() => prefillCredentials('doctor')} className="login-demo__btn">
                    Doctor
                  </button>
                  <button type="button" onClick={() => prefillCredentials('admin')} className="login-demo__btn">
                    Admin
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}





