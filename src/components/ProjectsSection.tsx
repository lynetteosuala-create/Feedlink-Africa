import React, { useState, useMemo } from 'react';
import { Search, MapPin, Users, Heart, ArrowUpRight, PlusCircle } from 'lucide-react';
import { Project, ProjectCategory } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onBackProject: (project: Project) => void;
  onOpenCreateProject?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onBackProject,
  onOpenCreateProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Initiatives' },
    { id: 'food-security', label: 'Food Security & Pantries' },
    { id: 'community-gardens', label: 'Community Gardens' },
    { id: 'skills-nutrition', label: 'Skills & Nutrition' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
            Community-Led Action
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Active Community Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            Directly fund local initiatives creating immediate nutritional security, urban green spaces, and neighborhood kitchens. Every project features transparent milestone tracking.
          </p>
        </div>

        {onOpenCreateProject && (
          <button
            onClick={onOpenCreateProject}
            className="self-start md:self-end px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-slate-400 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 text-orange-600" />
            <span>Propose New Project</span>
          </button>
        )}
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Interactive Segmented Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or locations..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-slate-900 placeholder:text-slate-400 transition-all"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-base font-semibold text-slate-800">No projects found matching your criteria</p>
          <p className="text-xs text-slate-500 mt-1">Try selecting another category or clearing your search query.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const percentage = Math.min(
              100,
              Math.round((project.currentAmount / project.targetAmount) * 100)
            );

            return (
              <div
                key={project.id}
                className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Photographic Header */}
                <div className="relative h-56 sm:h-64 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed metadata overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 font-medium drop-shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      {project.location}
                    </span>
                    <span className="capitalize font-medium text-emerald-300 drop-shadow-sm">
                      {project.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Funding & Progress */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                        £{project.currentAmount.toLocaleString()}
                        <span className="text-xs font-normal text-slate-500 ml-1">
                          of £{project.targetAmount.toLocaleString()}
                        </span>
                      </span>
                      <span className="text-xs font-bold text-orange-600 font-mono tabular-nums">
                        {percentage}% Funded
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Unboxed Metadata Discipline */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <strong className="text-slate-700 font-medium">{project.backersCount}</strong> community backers
                      </span>
                      <span>
                        {project.milestones.filter(m => m.completed).length} / {project.milestones.length} milestones complete
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 transition-colors py-2"
                    >
                      <span>View Milestones</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onBackProject(project)}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-500 active:scale-98 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Back Project</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
