import React, { useState } from 'react';
import { Shield, Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDonation: (projectId?: string) => void;
  onOpenAdmin: () => void;
  isAdminAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDonation,
  onOpenAdmin,
  isAdminAuthenticated
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'donate', label: 'Donate' },
    { id: 'volunteers', label: 'Volunteers' },
    { id: 'connect', label: 'Community Hub' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-orange-500 transition-colors">
                F
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors whitespace-nowrap">
                  FEEDLINK
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-slate-950 ${
                    isActive ? 'text-orange-600 font-bold' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + Admin portal link */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              aria-label="Admin Portal"
              title={isAdminAuthenticated ? "Admin Dashboard (Authenticated)" : "Admin Access"}
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isAdminAuthenticated 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">{isAdminAuthenticated ? 'Admin Active' : 'Admin'}</span>
            </button>

            <button
              onClick={() => onOpenDonation()}
              className="px-4.5 py-2.5 text-xs sm:text-sm font-bold text-white bg-orange-600 rounded-xl hover:bg-orange-500 active:scale-98 transition-all shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate Now</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-[#FAF9F5] px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 text-base font-semibold rounded-lg ${
                activeTab === item.id ? 'bg-orange-50 text-orange-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-200/60 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 font-medium flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-slate-500" />
              <span>Admin Dashboard {isAdminAuthenticated ? '(Active)' : ''}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
