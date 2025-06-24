// src/components/auth/LogoutButton.tsx
import React from 'react';
import { SignOut } from '@phosphor-icons/react';
import { useAuth } from '../../context/auth-context';
import { useToast } from '../../context/toast-context';

interface LogoutButtonProps {
  variant?: 'icon' | 'text' | 'full';
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  variant = 'full', 
  className = '' 
}) => {
  const { logout, user } = useAuth();
  const { success } = useToast();

  const handleLogout = () => {
    logout();
    success('Déconnexion réussie', 'À bientôt !');
  };

  if (!user) return null;

  const baseClasses = "flex items-center transition-all duration-200 hover:scale-105";

  if (variant === 'icon') {
    return (
      <button
        onClick={handleLogout}
        className={`${baseClasses} p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg ${className}`}
        title="Déconnexion"
      >
        <SignOut size={20} />
      </button>
    );
  }

  if (variant === 'text') {
    return (
      <button
        onClick={handleLogout}
        className={`${baseClasses} text-gray-700 hover:text-red-600 font-medium ${className}`}
      >
        Déconnexion
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className={`${baseClasses} space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg ${className}`}
    >
      <SignOut size={16} />
      <span className="text-sm font-medium">Déconnexion</span>
    </button>
  );
};

export default LogoutButton;