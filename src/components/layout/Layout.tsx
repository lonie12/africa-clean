import React, { useState, type ReactNode } from "react";
import { Phone, MapPin, EnvelopeSimple, List, X } from "@phosphor-icons/react";
import { Outlet } from "react-router";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/produits", label: "Produits" },
    { href: "/services", label: "Services" },
    { href: "/a-propos", label: "À Propos" },
    // { href: "/galeries", label: "Galeries" }, // Uncomment if galleries are available
    // { href: "/blog", label: "Blog" }, // Uncomment if blog is available
    { href: "/contact", label: "Contact" },
  ];

  const serviceLinks = [
    { href: "/services#nettoie-pro", label: "Nettoyage Pro" },
    { href: "/services#eco-jardin", label: "Eco-Jardin" },
    { href: "/services#natura-potager", label: "Natura-Potager" },
    { href: "/services#eco-event", label: "Eco-Event" },
    { href: "/services#sante-pro", label: "Santé-Pro" },
    // { href: "/services/fom-logistics", label: "FOM Logistics" },
    { href: "/quote", label: "Demander un Devis" },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/share/1CPRhr5DdT/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      label: "Facebook",
    },
    {
      href: "https://www.linkedin.com/company/africacleantg/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: "LinkedIn",
    },
    {
      href: "https://x.com/africacleanTg",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      label: "Twitter",
    },
    {
      href: "https://www.tiktok.com/@africaclean?_t=ZM-8v40DOHcByn&_r=1",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
      label: "TikTok",
    },
    {
      href: "https://www.youtube.com/@AFRICACLEANSARL",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      label: "YouTube",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="/images/logos/logo-africa-clean.png"
                alt="AFRICA CLEAN"
                className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.src = "/logo.png";
                }}
              />
              <span className="text-xl font-bold text-[#212121]">
                AFRICA CLEAN
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-[#14A800] font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#14A800] transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
              <button
                className="bg-[#14A800] hover:bg-[#128700] text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                onClick={() => (window.location.href = "/quote")}
              >
                Devis Gratuit
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-[#14A800] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
              <nav className="px-6 py-4 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-gray-700 hover:text-[#14A800] font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <button className="w-full bg-[#14A800] hover:bg-[#128700] text-white px-4 py-2 rounded-lg font-medium transition-all">
                  Devis Gratuit
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children || <Outlet />}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/images/logos/logo-africa-clean-blanc.png"
                  alt="AFRICA CLEAN"
                  className="h-8 w-auto"
                  onError={(e) => {
                    e.currentTarget.src = "/logo.png";
                  }}
                />
                <span className="text-lg font-bold">AFRICA CLEAN</span>
              </div>
              <p className="text-gray-400 mb-4">
                Pour une Afrique Propre et Durable !
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-[#14A800] transition-colors duration-200"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-start space-x-2">
                  <MapPin
                    size={16}
                    className="mt-1 flex-shrink-0 text-[#14A800]"
                  />
                  <span className="text-sm">
                    Djidjolé, derrière le CMS, Lomé-Togo
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="flex-shrink-0 text-[#14A800]" />
                  <span className="text-sm">+228 90 45 31 53</span>
                </div>
                <div className="flex items-center space-x-2">
                  <EnvelopeSimple
                    size={16}
                    className="flex-shrink-0 text-[#14A800]"
                  />
                  <span className="text-sm">africaclean.contact@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="text-sm">
              &copy; 2025 AFRICA CLEAN. Tous droits réservés. Pour une Afrique
              Propre et Durable !
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
