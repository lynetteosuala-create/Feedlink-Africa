/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { DonationSection } from './components/DonationSection';
import { DonationReceiptModal } from './components/DonationReceiptModal';
import { VolunteerSection } from './components/VolunteerSection';
import { CommunitySection } from './components/CommunitySection';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { api } from './services/api';
import { Project, VolunteerRole, VolunteerApplication, CommunityPost, Donation, PlatformStats } from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_VOLUNTEER_ROLES, 
  INITIAL_COMMUNITY_POSTS, 
  INITIAL_DONATIONS, 
  INITIAL_VOLUNTEER_APPLICATIONS 
} from './data/initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [volunteerRoles, setVolunteerRoles] = useState<VolunteerRole[]>(INITIAL_VOLUNTEER_ROLES);
  const [volunteerApps, setVolunteerApps] = useState<VolunteerApplication[]>(INITIAL_VOLUNTEER_APPLICATIONS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [donations, setDonations] = useState<Donation[]>(INITIAL_DONATIONS);
  
  const [stats, setStats] = useState<PlatformStats>({
    totalDonationsRaised: INITIAL_DONATIONS.reduce((a, b) => a + b.amount, 0),
    donationsCount: INITIAL_DONATIONS.length,
    activeProjectsCount: INITIAL_PROJECTS.length,
    registeredVolunteersCount: INITIAL_VOLUNTEER_APPLICATIONS.length + 24,
    communityConnectionsCount: 9
  });

  // Modals & Drawers
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [receiptDonation, setReceiptDonation] = useState<Donation | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [preselectedProjectId, setPreselectedProjectId] = useState<string | undefined>(undefined);

  const loadData = useCallback(async () => {
    try {
      const [projData, rolesData, appsData, postsData, donData, statsData] = await Promise.all([
        api.getProjects(),
        api.getVolunteerRoles(),
        api.getVolunteerApplications(),
        api.getCommunityPosts(),
        api.getDonations(),
        api.getStats()
      ]);

      if (projData) setProjects(projData);
      if (rolesData) setVolunteerRoles(rolesData);
      if (appsData) setVolunteerApps(appsData);
      if (postsData) setCommunityPosts(postsData);
      if (donData) setDonations(donData);
      if (statsData) setStats(statsData);
    } catch (err) {
      console.warn('Data sync notice:', err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // When a user clicks "Back Project" on any card
  const handleBackProject = (project: Project) => {
    setPreselectedProjectId(project.id);
    const donateElem = document.getElementById('donate');
    if (donateElem) {
      donateElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDonate = (projectId?: string) => {
    if (projectId) {
      setPreselectedProjectId(projectId);
    }
    const donateElem = document.getElementById('donate');
    if (donateElem) {
      donateElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDonationSuccess = (newDonation: Donation) => {
    setDonations(prev => [newDonation, ...prev]);
    setReceiptDonation(newDonation);
    loadData();
  };

  const handleVolunteerSuccess = (app: VolunteerApplication) => {
    setVolunteerApps(prev => [app, ...prev]);
    loadData();
  };

  const handleCommunityPostCreated = (post: CommunityPost) => {
    setCommunityPosts(prev => [post, ...prev]);
    loadData();
  };

  const handleReplySubmitted = (postId: string, reply: { responderName: string; message: string }) => {
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            repliesCount: p.repliesCount + 1,
            responses: [
              ...p.responses,
              {
                id: `resp-${Date.now()}`,
                responderName: reply.responderName,
                message: reply.message,
                createdAt: new Date().toISOString()
              }
            ]
          };
        }
        return p;
      })
    );
    loadData();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Strict Top Bar Contract Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDonation={() => handleOpenDonate()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      <main className="flex-1">
        {/* Hero with Tagline & Live Computed Metrics */}
        <Hero
          stats={stats}
          onExploreProjects={() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenDonate={() => handleOpenDonate()}
          onVolunteerClick={() => {
            const el = document.getElementById('volunteers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Community Projects Section */}
        <ProjectsSection
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
          onBackProject={handleBackProject}
          onOpenCreateProject={() => {
            setIsAdminOpen(true);
          }}
        />

        {/* Interactive Donation Module with Live Impact Calculator & Ledger */}
        <DonationSection
          projects={projects}
          preselectedProjectId={preselectedProjectId}
          onDonationSuccess={handleDonationSuccess}
          recentDonations={donations}
        />

        {/* Volunteer Hub & Shift Signup */}
        <VolunteerSection
          roles={volunteerRoles}
          onApplicationSuccess={handleVolunteerSuccess}
        />

        {/* Neighbor-to-Neighbor Community Connection Board */}
        <CommunitySection
          posts={communityPosts}
          onPostCreated={handleCommunityPostCreated}
          onReplySubmitted={handleReplySubmitted}
        />
      </main>

      {/* Authoritative Quiet Footer */}
      <Footer
        onNavClick={(id) => {
          setActiveTab(id);
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBackProject={handleBackProject}
      />

      <DonationReceiptModal
        donation={receiptDonation}
        onClose={() => setReceiptDonation(null)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isAuthenticated={isAdminAuthenticated}
        setIsAuthenticated={setIsAdminAuthenticated}
        projects={projects}
        setProjects={setProjects}
        donations={donations}
        volunteerApps={volunteerApps}
        setVolunteerApps={setVolunteerApps}
        communityPosts={communityPosts}
        stats={stats}
        onRefreshData={loadData}
      />
    </div>
  );
}
