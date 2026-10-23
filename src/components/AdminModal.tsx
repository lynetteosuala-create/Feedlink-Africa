import React, { useState } from 'react';
import { 
  X, Lock, ShieldCheck, Download, Plus, Check, AlertCircle, 
  BarChart3, FolderKanban, Receipt, Users, MessageSquare, RefreshCw, LogOut 
} from 'lucide-react';
import { Project, Donation, VolunteerApplication, CommunityPost, PlatformStats } from '../types';
import { api } from '../services/api';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  donations: Donation[];
  volunteerApps: VolunteerApplication[];
  setVolunteerApps: React.Dispatch<React.SetStateAction<VolunteerApplication[]>>;
  communityPosts: CommunityPost[];
  stats: PlatformStats;
  onRefreshData: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAuthenticated,
  setIsAuthenticated,
  projects,
  setProjects,
  donations,
  volunteerApps,
  setVolunteerApps,
  communityPosts,
  stats,
  onRefreshData
}) => {
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'donations' | 'volunteers' | 'community'>('overview');
  
  // New project form state
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState<'food-security' | 'community-gardens' | 'skills-nutrition' | 'logistics'>('food-security');
  const [projTarget, setProjTarget] = useState('');
  const [projLocation, setProjLocation] = useState('');
  const [projSummary, setProjSummary] = useState('');
  const [projImage, setProjImage] = useState('/src/assets/images/project_food_pantry_1792768409411.jpg');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = await api.adminLogin(passcode);
    if (res.authenticated) {
      setIsAuthenticated(true);
      setPasscode('');
    } else {
      setAuthError(res.error || 'Invalid passcode. Please use feedlink2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    onClose();
  };

  // Export donations ledger to real CSV
  const handleExportCSV = () => {
    const headers = ['Receipt Number', 'Date', 'Donor Name', 'Donor Email', 'Amount (GBP)', 'Frequency', 'Project Allocation', 'Gift Aid', 'Payment Method'];
    const rows = donations.map(d => [
      d.receiptNumber,
      new Date(d.createdAt).toISOString(),
      `"${d.donorName.replace(/"/g, '""')}"`,
      d.donorEmail,
      d.amount,
      d.frequency,
      `"${d.projectTitle.replace(/"/g, '""')}"`,
      d.giftAid ? 'YES' : 'NO',
      d.paymentMethod
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FEEDLINK_Donation_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add new project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projTarget) return;

    try {
      const created = await api.createProject({
        title: projTitle.trim(),
        category: projCategory,
        targetAmount: Number(projTarget),
        location: projLocation.trim() || 'Central Community Hub',
        summary: projSummary.trim(),
        description: projSummary.trim(),
        imageUrl: projImage,
        urgency: 'medium'
      });

      setProjects(prev => [created, ...prev]);
      setIsCreatingProject(false);
      setProjTitle('');
      setProjTarget('');
      setProjSummary('');
      setProjLocation('');
      onRefreshData();
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  // Update volunteer application status
  const handleUpdateAppStatus = async (id: string, newStatus: 'pending' | 'approved' | 'contacted') => {
    try {
      const updated = await api.updateVolunteerStatus(id, newStatus);
      setVolunteerApps(prev => prev.map(a => a.id === id ? updated : a));
    } catch (err) {
      console.error('Failed to update app status:', err);
    }
  };

  // Reset database
  const handleResetData = async () => {
    if (window.confirm('Reset database to clean initial demonstration state?')) {
      await api.resetDatabase();
      onRefreshData();
      alert('FEEDLINK database refreshed to clean default state.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-dialog-title"
      >
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-sm">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 id="admin-dialog-title" className="text-base font-bold text-white tracking-tight">
                FEEDLINK Authorised Administration
              </h2>
              <p className="text-2xs text-slate-400">
                Governance, donor ledger management &amp; volunteer coordination
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-2xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg flex items-center gap-1 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gate if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Enter Admin Passcode
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Access authorized controls for projects, donation reconciliations, and volunteer records.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-2.5 text-center text-sm font-mono tracking-widest bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {authError && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                Unlock Admin Console
              </button>
            </form>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-2xs text-slate-500 text-left">
              <strong className="text-slate-700 block mb-0.5">Evaluation Credentials:</strong>
              Passcode: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">feedlink2026</code>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Subnav Tabs */}
            <div className="px-6 border-b border-slate-200 bg-slate-50 flex items-center gap-2 overflow-x-auto py-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'projects', label: `Projects (${projects.length})`, icon: FolderKanban },
                { id: 'donations', label: `Donations (${donations.length})`, icon: Receipt },
                { id: 'volunteers', label: `Volunteers (${volunteerApps.length})`, icon: Users },
                { id: 'community', label: `Community (${communityPosts.length})`, icon: MessageSquare },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                      isActive 
                        ? 'bg-white text-slate-900 shadow-xs border border-slate-200' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panels */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-2xs font-bold uppercase text-slate-500">Total Funds Logged</span>
                      <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                        £{stats.totalDonationsRaised.toLocaleString()}
                      </div>
                      <span className="text-2xs text-emerald-700">{donations.length} transactions</span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-2xs font-bold uppercase text-slate-500">Active Projects</span>
                      <div className="text-2xl font-extrabold text-orange-600 font-mono tabular-nums mt-1">
                        {projects.length}
                      </div>
                      <span className="text-2xs text-slate-500">Local initiatives</span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-2xs font-bold uppercase text-slate-500">Volunteer Applicants</span>
                      <div className="text-2xl font-extrabold text-emerald-600 font-mono tabular-nums mt-1">
                        {volunteerApps.length}
                      </div>
                      <span className="text-2xs text-slate-500">
                        {volunteerApps.filter(a => a.status === 'pending').length} pending review
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-2xs font-bold uppercase text-slate-500">Community Exchanges</span>
                      <div className="text-2xl font-extrabold text-indigo-600 font-mono tabular-nums mt-1">
                        {communityPosts.length}
                      </div>
                      <span className="text-2xs text-slate-500">Neighbor offers &amp; requests</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-200/80 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-orange-900">Platform Data &amp; Export Tools</h4>
                      <p className="text-2xs text-orange-700">Download complete transparent donation records or reset database.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportCSV}
                        className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Export Ledger CSV</span>
                      </button>
                      <button
                        onClick={handleResetData}
                        className="px-3 py-1.5 bg-white border border-slate-300 hover:border-red-300 text-slate-700 hover:text-red-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset Sample Data</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Manage Community Projects</h3>
                    <button
                      onClick={() => setIsCreatingProject(!isCreatingProject)}
                      className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-lg flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isCreatingProject ? 'Cancel' : 'Add New Project'}</span>
                    </button>
                  </div>

                  {/* New Project Form */}
                  {isCreatingProject && (
                    <form onSubmit={handleSaveProject} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase">Create New Project</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Project Title"
                          value={projTitle}
                          onChange={e => setProjTitle(e.target.value)}
                          className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        />
                        <select
                          value={projCategory}
                          onChange={e => setProjCategory(e.target.value as any)}
                          className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        >
                          <option value="food-security">Food Security &amp; Pantries</option>
                          <option value="community-gardens">Community Gardens</option>
                          <option value="skills-nutrition">Skills &amp; Nutrition</option>
                          <option value="logistics">Logistics &amp; Transport</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="number"
                          required
                          placeholder="Funding Target (£)"
                          value={projTarget}
                          onChange={e => setProjTarget(e.target.value)}
                          className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        />
                        <input
                          type="text"
                          placeholder="Neighborhood Location"
                          value={projLocation}
                          onChange={e => setProjLocation(e.target.value)}
                          className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          required
                          placeholder="Project Summary and Description"
                          value={projSummary}
                          onChange={e => setProjSummary(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsCreatingProject(false)}
                          className="px-3 py-1.5 text-xs text-slate-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-lg"
                        >
                          Save Project
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Existing projects list */}
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {projects.map(p => (
                      <div key={p.id} className="p-4 bg-white flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={p.imageUrl}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{p.title}</h4>
                            <div className="text-2xs text-slate-500">
                              £{p.currentAmount.toLocaleString()} of £{p.targetAmount.toLocaleString()} · {p.backersCount} backers · {p.location}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-2xs font-semibold px-2 py-0.5 rounded ${
                            p.status === 'funded' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {p.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: DONATIONS LEDGER */}
              {activeTab === 'donations' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Transparent Donation Ledger</h3>
                      <p className="text-2xs text-slate-500">Every donation recorded with verifiable audit ID.</p>
                    </div>
                    <button
                      onClick={handleExportCSV}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download CSV</span>
                    </button>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-2xs">
                        <tr>
                          <th className="p-3">Receipt #</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Donor</th>
                          <th className="p-3">Designation</th>
                          <th className="p-3">Gift Aid</th>
                          <th className="p-3 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {donations.map(d => (
                          <tr key={d.id} className="hover:bg-slate-50/60 font-mono text-2xs">
                            <td className="p-3 font-semibold text-slate-900">{d.receiptNumber}</td>
                            <td className="p-3 text-slate-500 font-sans">
                              {new Date(d.createdAt).toLocaleDateString('en-GB')}
                            </td>
                            <td className="p-3 font-sans font-medium text-slate-800">{d.donorName}</td>
                            <td className="p-3 font-sans text-slate-600 truncate max-w-xs">{d.projectTitle}</td>
                            <td className="p-3 font-sans">
                              {d.giftAid ? (
                                <span className="text-emerald-700 font-bold">Yes (+25%)</span>
                              ) : (
                                <span className="text-slate-400">No</span>
                              )}
                            </td>
                            <td className="p-3 text-right font-extrabold text-slate-900">
                              £{d.amount.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: VOLUNTEERS */}
              {activeTab === 'volunteers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Volunteer Applications Review</h3>
                      <p className="text-2xs text-slate-500">Review submissions and update roster status.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {volunteerApps.map(app => (
                      <div key={app.id} className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                          <div>
                            <span className="font-bold text-slate-900 text-sm">{app.fullName}</span>
                            <span className="text-slate-400 mx-1.5">·</span>
                            <span className="text-slate-600">{app.roleTitle}</span>
                          </div>
                          
                          {/* Status Actions */}
                          <div className="flex items-center gap-1.5">
                            {(['pending', 'approved', 'contacted'] as const).map(st => (
                              <button
                                key={st}
                                onClick={() => handleUpdateAppStatus(app.id, st)}
                                className={`px-2 py-1 text-2xs font-semibold rounded capitalize transition-all ${
                                  app.status === st
                                    ? 'bg-emerald-600 text-white font-bold'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-2xs text-slate-600">
                          <div>
                            <strong>Email:</strong> {app.email} · <strong>Phone:</strong> {app.phone || 'N/A'}
                          </div>
                          <div>
                            <strong>Availability:</strong> {app.availability.join(', ') || 'Flexible'}
                          </div>
                          {app.experienceNotes && (
                            <div className="sm:col-span-2">
                              <strong>Notes:</strong> {app.experienceNotes}
                            </div>
                          )}
                          {app.emergencyContact && (
                            <div className="sm:col-span-2 text-slate-500">
                              <strong>Emergency Contact:</strong> {app.emergencyContact}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: COMMUNITY */}
              {activeTab === 'community' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Community Exchange Posts</h3>
                  <div className="space-y-3">
                    {communityPosts.map(post => (
                      <div key={post.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-800">
                          <span>{post.title}</span>
                          <span className="text-2xs text-slate-400 capitalize">{post.type}</span>
                        </div>
                        <p className="text-slate-600 text-2xs mt-1">{post.content}</p>
                        <div className="text-2xs text-slate-400 mt-2">
                          By {post.authorName} ({post.neighborhood}) · {post.repliesCount} replies
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
