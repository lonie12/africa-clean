// src/pages/admin/index.tsx
import React from 'react';
import { 
  Crown, 
  User, 
  SignOut, 
  House,
  ChartBar,
  Users,
  FileText,
//   Settings,
  Bell
} from '@phosphor-icons/react';
import { useAuth } from '../../context/auth-context';
import { Settings } from 'iconsax-react';

const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const statsCards = [
    {
      title: 'Clients Actifs',
      value: '200+',
      icon: <Users size={32} />,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      title: 'Devis du Mois',
      value: '45',
      icon: <FileText size={32} />,
      color: 'bg-green-500',
      trend: '+8%'
    },
    {
      title: 'Revenus',
      value: '2.5M CFA',
      icon: <ChartBar size={32} />,
      color: 'bg-yellow-500',
      trend: '+15%'
    },
    {
      title: 'Projets Actifs',
      value: '28',
      icon: <Settings size={32} />,
      color: 'bg-purple-500',
      trend: '+5%'
    }
  ];

  const quickActions = [
    { title: 'Nouveau Devis', href: '/admin/quotes', color: 'bg-[#14A800]' },
    { title: 'Gestion Clients', href: '/admin/clients', color: 'bg-blue-600' },
    { title: 'Rapports', href: '/admin/reports', color: 'bg-purple-600' },
    { title: 'Paramètres', href: '/admin/settings', color: 'bg-gray-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-[#14A800] rounded-lg flex items-center justify-center">
                <Crown size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Administration Africa Clean
                </h1>
                <p className="text-sm text-gray-500">Tableau de bord</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-[#14A800] rounded-full flex items-center justify-center">
                  <User size={16} color="white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Déconnexion"
              >
                <SignOut size={16} />
                <span className="text-sm font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#14A800] to-[#128700] rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Bienvenue dans l'espace Admin ! 👋
                </h2>
                <p className="text-lg opacity-90">
                  Bonjour {user?.name}, voici un aperçu de votre tableau de bord Africa Clean
                </p>
                <p className="text-sm opacity-75 mt-2">
                  Dernière connexion: {new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Crown size={48} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => console.log(`Navigate to ${action.href}`)}
                className={`${action.color} text-white p-6 rounded-xl hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
              >
                <p className="font-semibold">{action.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className={`${stat.color} text-white p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mt-4 mb-1">
                  {stat.value}
                </h4>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
          <div className="space-y-4">
            {[
              { action: 'Nouveau devis créé', client: 'Pharmacie Solidarité', time: 'Il y a 2h' },
              { action: 'Contrat signé', client: 'TECORP Architects', time: 'Il y a 5h' },
              { action: 'Intervention terminée', client: 'CMS Notre Dame', time: 'Hier' },
              { action: 'Nouveau client ajouté', client: 'Restaurant La Flamme', time: 'Il y a 2 jours' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.client}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Return to Site */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center space-x-2 text-[#14A800] hover:text-[#128700] font-medium transition-colors"
          >
            <House size={16} />
            <span>Retour au site principal</span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;