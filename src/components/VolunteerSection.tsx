import React, { useState } from 'react';
import { Users, Clock, MapPin, CheckCircle, Calendar, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { VolunteerRole, VolunteerApplication } from '../types';

interface VolunteerSectionProps {
  roles: VolunteerRole[];
  onApplicationSuccess: (app: VolunteerApplication) => void;
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({ roles, onApplicationSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<VolunteerRole | null>(roles[0] || null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [availability, setAvailability] = useState<string[]>(['Saturday Mornings']);
  const [experienceNotes, setExperienceNotes] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<VolunteerApplication | null>(null);

  const availabilityOptions = [
    'Tuesday Mornings',
    'Thursday Mornings',
    'Wednesday Mornings',
    'Friday Afternoons',
    'Saturday Mornings',
    'Sunday Afternoons'
  ];

  const toggleAvailability = (opt: string) => {
    if (availability.includes(opt)) {
      setAvailability(availability.filter(a => a !== opt));
    } else {
      setAvailability([...availability, opt]);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !fullName || !email) return;

    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 600));

      const res = await (await import('../services/api')).api.submitVolunteerApplication({
        roleId: selectedRole.id,
        roleTitle: selectedRole.title,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        availability,
        experienceNotes: experienceNotes.trim(),
        emergencyContact: emergencyContact.trim()
      });

      if (res.success && res.application) {
        setSubmittedApp(res.application);
        onApplicationSuccess(res.application);
      }
    } catch (err) {
      console.error('Application error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="volunteers" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
          Hands-On Impact
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Join the FEEDLINK Volunteer Collective
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Lend a hand in the kitchen, tend urban raised beds, pack weekly grocery boxes, or deliver smiles to elderly neighbors. Every hour spent creates real human connection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Roles Explorer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Available Community Volunteer Roles
          </h3>

          <div className="space-y-4">
            {roles.map((role) => {
              const isSelected = selectedRole?.id === role.id;
              const spotsAvailable = role.spotsTotal - role.spotsFilled;

              return (
                <div
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role);
                    setSubmittedApp(null);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/40 border-emerald-500 shadow-sm ring-1 ring-emerald-500/30'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-slate-900">
                      {role.title}
                    </h4>
                    <span className="text-xs font-mono font-medium text-slate-500 whitespace-nowrap">
                      {spotsAvailable > 0 ? (
                        <span className="text-emerald-700 font-semibold">{spotsAvailable} spots available</span>
                      ) : (
                        <span className="text-amber-700">Roster Full (Waitlist)</span>
                      )}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Clean unboxed metadata discipline */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-2xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {role.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {role.schedule}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{role.timeCommitment}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Application Form or Confirmation Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm sticky top-24">
          {submittedApp ? (
            /* Digital Volunteer Pass / Confirmation */
            <div className="space-y-5 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-2xs font-bold text-emerald-700 uppercase tracking-wider block">
                  Volunteer Application Received
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-1">
                  Welcome to the Team, {submittedApp.fullName.split(' ')[0]}!
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  We have logged your application for <strong>{submittedApp.roleTitle}</strong>. Our volunteer coordinator will reach out shortly via email.
                </p>
              </div>

              {/* Digital Card */}
              <div className="p-4 rounded-xl bg-slate-900 text-white text-left space-y-3 font-mono">
                <div className="flex items-center justify-between text-2xs text-slate-400 border-b border-slate-800 pb-2">
                  <span>FEEDLINK VOLUNTEER PASS</span>
                  <span className="text-emerald-400">ACTIVE REGISTRATION</span>
                </div>
                <div>
                  <div className="text-2xs text-slate-400">VOLUNTEER NAME</div>
                  <div className="text-sm font-bold text-slate-100">{submittedApp.fullName}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-2xs">
                  <div>
                    <span className="text-slate-400 block">ASSIGNED ROLE</span>
                    <span className="text-slate-200 truncate block">{submittedApp.roleTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">REGISTERED ID</span>
                    <span className="text-slate-200">{submittedApp.id}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSubmittedApp(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
              >
                Submit another application or update details
              </button>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleApply} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-2xs font-bold text-emerald-600 uppercase tracking-wider block">
                  Direct Signup
                </span>
                <h4 className="text-lg font-bold text-slate-900">
                  {selectedRole ? selectedRole.title : 'Volunteer Signup'}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete this short form to join upcoming shifts.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maya Chen"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@example.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7700 900..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                  />
                </div>
              </div>

              {/* Availability selector */}
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">
                  Your General Availability
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {availabilityOptions.map((opt) => {
                    const isChecked = availability.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleAvailability(opt)}
                        className={`py-1.5 px-2 text-2xs font-semibold rounded-lg border text-left transition-all ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '} {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Relevant Experience or Notes
                </label>
                <textarea
                  rows={2}
                  value={experienceNotes}
                  onChange={(e) => setExperienceNotes(e.target.value)}
                  placeholder="e.g. Food safety Level 2 certified, or have gardening experience..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Emergency Contact (Name &amp; Phone)
                </label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="e.g. Partner, Parent or Friend"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !fullName || !email}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-98 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <HeartHandshake className="w-4 h-4" />
                    <span>Confirm Volunteer Registration</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
