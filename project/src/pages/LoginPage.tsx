import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user, enterDemo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to sign in. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-paper flex flex-col justify-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <p className="text-amber-400/80 text-xs tracking-[0.3em] uppercase text-center mb-3">
          Harbor nights
        </p>
        <h1 className="font-display text-6xl text-center text-paper tracking-tight">
          CRWLR
        </h1>
        <p className="mt-3 text-center text-stone-400">
          Find a spot. Pull friends in. Make it a route.
        </p>
        <p className="mt-6 text-center text-sm text-stone-500">
          No account?{' '}
          <Link to="/signup" className="text-amber-400 hover:text-amber-300">
            Sign up
          </Link>
        </p>

        <div className="mt-8 bg-stone-900/80 border border-stone-800 py-8 px-5 sm:px-8 rounded-2xl">
          {error && (
            <div className="mb-4 bg-rose-950/60 border border-rose-800 text-rose-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="block text-sm text-stone-400 mb-1">Email</span>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-stone-950 border-stone-700 text-paper"
              />
            </label>
            <label className="block">
              <span className="block text-sm text-stone-400 mb-1">Password</span>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-stone-950 border-stone-700 text-paper"
              />
            </label>
            <Button type="button" variant="secondary" className="w-full" onClick={enterDemo}>
              Try the Harbor District demo
            </Button>
            <Button type="submit" variant="outline" className="w-full border-stone-600 text-paper hover:bg-stone-800" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
