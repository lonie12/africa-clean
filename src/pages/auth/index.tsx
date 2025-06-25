/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/auth/index.tsx
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router";
import {
  EnvelopeSimple,
  Lock,
  Eye,
  EyeClosed,
  SignIn,
} from "@phosphor-icons/react";
import { useAuth } from "../../context/auth-context";
import { Input } from "../../components/forms/Input";
import { useToast } from "../../context/toast-context";
import Button from "../../components/actions/button";

interface AuthFormData {
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const { success, error } = useToast();
  const location = useLocation();

  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || "/admin";
    return <Navigate to={from} replace />;
  }

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password);
      success(
        "Connexion réussie !",
        "Bienvenue dans l'espace d'administration."
      );
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Handle specific error messages
      if (err.message?.includes('Invalid login credentials')) {
        error("Erreur de connexion", "Email ou mot de passe incorrect.");
      } else if (err.message?.includes('Email not confirmed')) {
        error("Email non confirmé", "Veuillez confirmer votre email avant de vous connecter.");
      } else {
        error("Erreur de connexion", err.message || "Une erreur est survenue lors de la connexion.");
      }
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
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-[#14A800] rounded-full flex items-center justify-center mb-4">
            <SignIn size={32} color="white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Administration
          </h2>
          <p className="mt-2 text-gray-600">
            Accès réservé aux administrateurs
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="relative">
              <Input
                label="Adresse email"
                type="email"
                placeholder="admin@exemple.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
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
                  <EyeClosed
                    size={20}
                    className="text-gray-400 hover:text-gray-600"
                  />
                ) : (
                  <Eye
                    size={20}
                    className="text-gray-400 hover:text-gray-600"
                  />
                )}
              </button>
            </div>

            {/* Security Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Accès Administrateur
              </h4>
              <p className="text-sm text-blue-700">
                Seuls les comptes administrateurs autorisés peuvent accéder à cette interface.
                Si vous n'avez pas de compte, contactez le développeur.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                isFormValid && !isSubmitting
                  ? "bg-[#14A800] hover:bg-[#128700] hover:shadow-lg"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <SignIn size={20} />
                  <span>Se connecter</span>
                </>
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Retour au{" "}
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