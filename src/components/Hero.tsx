import React from 'react';
import { Heart, Users, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PlatformStats } from '../types';

interface HeroProps {
  stats: PlatformStats;
  onExploreProjects: () => void;
  onOpenDonate: () => void;
  onVolunteerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  onExploreProjects,
  onOpenDonate,
  onVolunteerClick
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 2-Column Split: Compelling proposition + Dominant Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Column 1: Editorial Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-600">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Community Development &amp; Food Security</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.08] text-balance">
              Connecting People. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600">
                Changing Lives.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              FEEDLINK bridges the gap between surplus nourishment and community resilience. We connect neighbors, coordinate volunteer power, support urban garden projects, and provide transparent funding where every penny delivers immediate dignity.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenDonate}
                className="px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-orange-200 active:scale-98 flex items-center gap-2.5"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Support a Community Project</span>
              </button>

              <button
                onClick={onVolunteerClick}
                className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm sm:text-base rounded-xl transition-all hover:bg-slate-50 flex items-center gap-2"
              >
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Join as a Volunteer</span>
              </button>
            </div>

            {/* Editorial trust note */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% transparent platform ledger · Real-time project updates · Direct local allocation</span>
            </div>
          </div>

          {/* Column 2: Dominant Photographic Visual Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 aspect-16/10 sm:aspect-16/9 lg:aspect-4/3">
              <img
                src="/src/assets/images/feedlink_community_hero_1792768407355.jpg"
                alt="Community volunteers and neighbors preparing fresh food boxes and meals together"
                className="w-full h-full object-cover object-center"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-semibold text-orange-300">Neighborhood Solidarity in Action</p>
                <p className="text-sm font-medium text-slate-100 line-clamp-1">
                  Central Hub kitchen volunteers and neighbors preparing organic produce boxes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Quantitative KPI Strip: strictly computed from verified platform database records */}
        <div className="mt-14 pt-8 border-t border-slate-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Direct Contributions
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              £{stats.totalDonationsRaised.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">
              From {stats.donationsCount} verified supporter gifts
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Community Initiatives
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-mono tabular-nums">
              {stats.activeProjectsCount} Active
            </div>
            <p className="text-xs text-slate-500">
              Kitchens, urban gardens &amp; food pantries
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Volunteer Network
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
              {stats.registeredVolunteersCount}+
            </div>
            <p className="text-xs text-slate-500">
              Active shifts &amp; community stewards
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Neighbor Exchanges
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono tabular-nums">
              {stats.communityConnectionsCount}
            </div>
            <p className="text-xs text-slate-500">
              Direct connections on our exchange hub
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
