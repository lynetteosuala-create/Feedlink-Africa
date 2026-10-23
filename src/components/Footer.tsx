import React from 'react';
import { Heart, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white font-extrabold text-base">
                F
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                FEEDLINK
              </span>
            </div>

            <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
              Connecting People. Changing Lives.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A community development and charity platform dedicated to direct neighborhood nourishment, transparent project funding, and human connection.
            </p>

            <div className="pt-2 flex items-center gap-2 text-2xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full real-time ledger accounting on all public contributions.</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Areas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('projects')}
                  className="hover:text-white transition-colors"
                >
                  Community Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('donate')}
                  className="hover:text-white transition-colors"
                >
                  Make a Donation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('volunteers')}
                  className="hover:text-white transition-colors"
                >
                  Volunteer Opportunities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('connect')}
                  className="hover:text-white transition-colors"
                >
                  Neighbor-to-Neighbor Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Admin (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Community Governance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              FEEDLINK operates with real open data. Project budgets, receipts, and volunteer schedules are managed cooperatively with participating neighborhood community centers.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 underline"
              >
                Access Authorised Admin Portal
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs text-slate-500">
          <div>
            © {new Date().getFullYear()} FEEDLINK. All rights reserved. Connecting People. Changing Lives.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-300 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
