import React, { useState } from 'react';
import { X, MapPin, Users, Target, CheckCircle2, Circle, Heart, Share2, Check } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onBackProject: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onBackProject }) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const percentage = Math.min(100, Math.round((project.currentAmount / project.targetAmount) * 100));

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Header with image */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-orange-300 mb-1">
              <span className="capitalize">{project.category.replace('-', ' ')}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                {project.location}
              </span>
            </div>
            <h2 id="project-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[calc(85vh-18rem)] overflow-y-auto">
          {/* Progress Bar & Numerical Metrics */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                  £{project.currentAmount.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 ml-1.5">
                  raised of £{project.targetAmount.toLocaleString()} goal
                </span>
              </div>
              <span className="text-sm font-bold text-orange-600 font-mono tabular-nums">
                {percentage}%
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <strong className="text-slate-700 font-medium">{project.backersCount}</strong> community backers
              </span>
              <span className="capitalize font-medium text-emerald-700">
                {project.status === 'funded' ? 'Target Reached' : 'Active Initiative'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">About This Project</h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Transparent Milestones */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-orange-600" />
              <span>Transparent Project Milestones</span>
            </h3>

            <div className="space-y-2.5">
              {project.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-sm transition-colors ${
                    milestone.completed
                      ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {milestone.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold">{milestone.title}</span>
                        <span className="font-mono text-xs font-semibold tabular-nums text-slate-500 shrink-0">
                          £{milestone.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-normal">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            onClick={handleShare}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-xl hover:bg-white transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Link Copied' : 'Share Project'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onBackProject(project);
            }}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-98 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Back This Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};
