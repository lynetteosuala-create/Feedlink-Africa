export type ProjectCategory = 'all' | 'food-security' | 'community-gardens' | 'skills-nutrition' | 'logistics';

export interface ProjectMilestone {
  title: string;
  targetAmount: number;
  completed: boolean;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'food-security' | 'community-gardens' | 'skills-nutrition' | 'logistics';
  summary: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  backersCount: number;
  location: string;
  imageUrl: string;
  urgency: 'high' | 'medium' | 'standard';
  status: 'active' | 'funded';
  milestones: ProjectMilestone[];
  createdAt: string;
}

export interface Donation {
  id: string;
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  frequency: 'one-time' | 'monthly';
  projectId: string; // 'general' or specific project ID
  projectTitle: string;
  giftAid: boolean;
  message?: string;
  paymentMethod: 'card' | 'bank_transfer' | 'digital_wallet';
  createdAt: string;
  status: 'completed' | 'processing';
}

export interface VolunteerRole {
  id: string;
  title: string;
  department: string;
  location: string;
  schedule: string;
  timeCommitment: string;
  spotsTotal: number;
  spotsFilled: number;
  description: string;
  requirements: string[];
  skillsNeeded: string[];
}

export interface VolunteerApplication {
  id: string;
  roleId: string;
  roleTitle: string;
  fullName: string;
  email: string;
  phone: string;
  availability: string[];
  experienceNotes: string;
  emergencyContact: string;
  status: 'pending' | 'approved' | 'contacted';
  appliedAt: string;
}

export interface CommunityPost {
  id: string;
  type: 'offer' | 'request' | 'meetup';
  title: string;
  authorName: string;
  neighborhood: string;
  content: string;
  contactMethod: string;
  createdAt: string;
  repliesCount: number;
  responses: Array<{
    id: string;
    responderName: string;
    message: string;
    createdAt: string;
  }>;
}

export interface PlatformStats {
  totalDonationsRaised: number;
  donationsCount: number;
  activeProjectsCount: number;
  registeredVolunteersCount: number;
  communityConnectionsCount: number;
}
