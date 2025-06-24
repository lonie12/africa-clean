/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/auth/index.tsx
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { 
  EnvelopeSimple, 
  Lock, 
  Eye, 
  EyeClosed,
  SignIn
} from '@phosphor-icons/react';
import { useAuth } from '../../context/auth-context';
import { Input } from '../../components/forms/Input';
import { useToast } from '../../context/toast-context';
import Button from '../../components/actions/button';

interface AuthFormData {
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const { login, loginWithGoogle, isAuthenticated, isLoading } = useAuth();
  const { success, error } = useToast();
  const location = useLocation();
  
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || '/admin';
    return <Navigate to={from} replace />;
  }

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      success(
        'Connexion réussie !',
        'Bienvenue dans l\'espace d\'administration.',
      );
    } catch (err) {
      error(
        'Erreur de connexion',
        'Email ou mot de passe incorrect.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    
    try {
      await loginWithGoogle();
      success(
        'Connexion Google réussie !',
        'Bienvenue dans l\'espace d\'administration.',
      );
    } catch (err) {
      error(
        'Erreur de connexion Google',
        'Une erreur est survenue lors de la connexion avec Google.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.email && formData.password;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14A800] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo/Brand */}
        {/* <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-[#14A800] rounded-full flex items-center justify-center mb-4">
            <SignIn size={32} color="white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Connexion Admin
          </h2>
          <p className="mt-2 text-gray-600">
            Accédez à votre espace d'administration Africa Clean
          </p>
        </div> */}

        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className='relative'>
              <Input
                label="Adresse email"
                type="email"
                placeholder="exemple@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-12"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-6">
                <EnvelopeSimple size={20} className="text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <Input
                label="Mot de passe"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-12 pr-12"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-6">
                <Lock size={20} className="text-gray-400" />
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center mt-6"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeClosed size={20} className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {/* Demo Credentials Info */}
            {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Identifiants de démonstration :
              </h4>
              <p className="text-sm text-blue-700">
                <strong>Email:</strong> admin@africaclean.com<br />
                <strong>Mot de passe:</strong> admin123
              </p>
            </div> */}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                isFormValid && !isSubmitting 
                  ? 'bg-[#14A800] hover:bg-[#128700] hover:shadow-lg' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <SignIn size={20} color="white" />
                  <span>Se connecter</span>
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou</span>
              </div>
            </div>
          </div>

          {/* Google Login Button */}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 font-medium text-gray-700 transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuer avec Google
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Retour au{' '}
              <a 
                href="/" 
                className="font-medium text-[#14A800] hover:text-[#128700] transition-colors"
              >
                site principal
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;