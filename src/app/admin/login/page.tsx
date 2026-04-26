'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type LoginForm = {
  email: string;
  password: string;
};

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password })
      });
      const result = await res.json();
      if (result.success) {
        // Store token in localStorage
        localStorage.setItem('adminToken', result.data.token);
        localStorage.setItem('adminEmail', result.data.email);
        toast.success('Login successful!');
        router.push('/admin');
      } else {
        setError('root', {
          message: result.error || 'Invalid credentials',
        });
      }
    } catch (error) {
      setError('root', {
        message: 'Login failed. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-card p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <AppLogo size={40} />
            <div className="text-center">
              <span className="font-display text-xl font-bold text-navy-700">SmileCare</span>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-navy-600" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy-700 mb-2">Admin Login</h1>
            <p className="text-sm text-slate-500">Enter your credentials to access the admin panel</p>
          </div>

          {/* Root error */}
          {errors.root && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5">
              <p className="text-red-600 text-sm">{errors.root.message}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
                })}
                type="email"
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all`}
                placeholder="admin@smilecare.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm ${errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all`}
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 bg-navy-600 hover:bg-navy-700 disabled:opacity-60 text-white font-semibold rounded-xl active:scale-95 transition-all duration-150"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In to Admin Panel
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-6">
            Protected by Firebase Authentication · Only authorized personnel
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          © 2026 SmileCare Dental Clinic
        </p>
      </div>
    </div>
  );
}
