// src/components/auth/LogoutButton.tsx
import React, { useState } from 'react';
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
  const { success, error } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    try {
      setIsLoggingOut(true);
      await logout();
      success('Déconnexion réussie', 'À bientôt !');
      
      // Redirect to home after logout
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      console.error('Logout error:', err);
      error('Erreur de déconnexion', 'Veuillez réessayer.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) return null;

  const baseClasses = "flex items-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";

  if (variant === 'icon') {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`${baseClasses} p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg ${className}`}
        title="Déconnexion"
      >
        {isLoggingOut ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
        ) : (
          <SignOut size={20} />
        )}
      </button>
    );
  }

  if (variant === 'text') {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`${baseClasses} text-gray-700 hover:text-red-600 font-medium ${className}`}
      >
        {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`${baseClasses} space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg ${className}`}
    >
      {isLoggingOut ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
      ) : (
        <SignOut size={16} />
      )}
      <span className="text-sm font-medium">
        {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
      </span>
    </button>
  );
};

export default LogoutButton;