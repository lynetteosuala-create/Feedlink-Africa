import { Project, VolunteerRole, VolunteerApplication, CommunityPost, Donation } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-community-kitchen',
    title: 'Community Kitchen Warm Meal Program',
    category: 'food-security',
    summary: 'Preparing nutritious hot meals daily for local families, seniors, and unhoused neighbors in need of welcoming nourishment.',
    description: 'Our open-door community kitchen operates with local volunteer chefs and food rescue donations to prepare healthy, balanced, home-style meals. Beyond hot food, it serves as a safe social hub where neighbors break bread together and build meaningful relationships.',
    targetAmount: 8500,
    currentAmount: 6240,
    backersCount: 142,
    location: 'Central Community Hall, Zone 2',
    imageUrl: '/src/assets/images/project_community_kitchen_1792768407990.jpg',
    urgency: 'high',
    status: 'active',
    milestones: [
      {
        title: 'Commercial Bulk Pantry Restock',
        targetAmount: 2500,
        completed: true,
        description: 'Secured baseline staples: lentils, rice, olive oil, and root vegetables.'
      },
      {
        title: 'Industrial Steamer & Warming Stations',
        targetAmount: 5500,
        completed: true,
        description: 'Installed safe food holding equipment to serve up to 250 meals per lunch sitting.'
      },
      {
        title: 'Weekend Evening Service Expansion',
        targetAmount: 8500,
        completed: false,
        description: 'Extending kitchen hours to Saturday and Sunday evenings with 4 additional volunteer shifts.'
      }
    ],
    createdAt: '2026-09-15T10:00:00Z'
  },
  {
    id: 'proj-urban-garden',
    title: 'Urban Neighborhood Garden & Seed Bank',
    category: 'community-gardens',
    summary: 'Transforming unused vacant plots into thriving community-run vegetable gardens, pollinator beds, and an open seed exchange.',
    description: 'Community members come together to cultivate organic produce, participate in hands-on compost workshops, and harvest fresh greens directly for their households and the local pantry. This project fosters local food resilience and neighborhood green spaces.',
    targetAmount: 5200,
    currentAmount: 4100,
    backersCount: 88,
    location: 'Southside Community Commons',
    imageUrl: '/src/assets/images/project_urban_garden_1792768408176.jpg',
    urgency: 'medium',
    status: 'active',
    milestones: [
      {
        title: 'Raised Garden Bed Construction',
        targetAmount: 1800,
        completed: true,
        description: 'Built 12 cedar raised beds with drip irrigation and certified organic soil.'
      },
      {
        title: 'Community Tool Shed & Seed Exchange Vault',
        targetAmount: 3600,
        completed: true,
        description: 'Shared hand tools, wheelbarrows, and catalogued heirloom vegetable seeds.'
      },
      {
        title: 'Rainwater Harvesting & Solar Pump System',
        targetAmount: 5200,
        completed: false,
        description: 'Installing sustainable 1,000-litre rainwater recovery for zero-waste watering.'
      }
    ],
    createdAt: '2026-09-20T14:30:00Z'
  },
  {
    id: 'proj-food-pantry',
    title: 'Fresh Produce Boxes & Mobile Community Pantry',
    category: 'food-security',
    summary: 'Distributing weekly dignified fresh produce boxes and essential dry goods to households facing temporary hardship.',
    description: 'We partner directly with regional growers and suppliers to rescue surplus seasonal produce and package dignified, high-quality family boxes. Participants select their own pantry essentials in a store-like environment that respects dignity.',
    targetAmount: 12000,
    currentAmount: 9850,
    backersCount: 215,
    location: 'East District Distribution Depot',
    imageUrl: '/src/assets/images/project_food_pantry_1792768409411.jpg',
    urgency: 'high',
    status: 'active',
    milestones: [
      {
        title: 'Refrigerated Storage Unit Lease',
        targetAmount: 4000,
        completed: true,
        description: 'Maintains crisp leaf greens and dairy alternatives at safe temperatures.'
      },
      {
        title: 'Eco-Friendly Reusable Crate Fleet',
        targetAmount: 7500,
        completed: true,
        description: '300 durable folding produce crates for zero single-use plastic waste.'
      },
      {
        title: 'Mobile Delivery Van Fuel & Maintenance Fund',
        targetAmount: 12000,
        completed: false,
        description: 'Direct door-to-door deliveries for homebound seniors and disabled neighbors.'
      }
    ],
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'proj-skills-nutrition',
    title: 'Youth Culinary & Nutrition Community Lab',
    category: 'skills-nutrition',
    summary: 'Teaching practical scratch-cooking skills, budget meal planning, and nutrition basics to teenagers and young adults.',
    description: 'Equipping the next generation with lifelong culinary confidence. Teens learn knife safety, balanced recipe building from pantry staples, food budget management, and meal prep skills in supportive small group cohorts.',
    targetAmount: 4800,
    currentAmount: 3450,
    backersCount: 74,
    location: 'Westside Youth Center',
    imageUrl: '/src/assets/images/feedlink_volunteers_action_1792768409189.jpg',
    urgency: 'standard',
    status: 'active',
    milestones: [
      {
        title: 'Starter Induction Cooker & Knife Sets',
        targetAmount: 1600,
        completed: true,
        description: '6 safe mobile induction teaching stations with chef-grade equipment.'
      },
      {
        title: 'Recipe & Budget Workbooks Printing',
        targetAmount: 3200,
        completed: true,
        description: 'Distributed 200 comprehensive student guides with affordable family recipes.'
      },
      {
        title: 'Guest Community Chef Workshops (Fall Term)',
        targetAmount: 4800,
        completed: false,
        description: 'Funding ingredients and guest instructors for 8 multicultural cooking sessions.'
      }
    ],
    createdAt: '2026-10-02T11:15:00Z'
  }
];

export const INITIAL_VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: 'vol-kitchen-prep',
    title: 'Kitchen Prep & Hot Meal Service',
    department: 'Community Kitchen',
    location: 'Central Community Hall, Zone 2',
    schedule: 'Tuesdays & Thursdays, 10:30 AM – 2:00 PM',
    timeCommitment: '3.5 hours / session',
    spotsTotal: 12,
    spotsFilled: 8,
    description: 'Assist volunteer chefs in washing, chopping vegetables, plating hot wholesome meals, and warmly serving dining guests.',
    requirements: [
      'Friendly and respectful attitude toward all community members',
      'Comfortable standing for 2-3 hours and lifting light trays',
      'Food safety briefing provided on-site'
    ],
    skillsNeeded: ['Food Prep', 'Customer Care', 'Teamwork']
  },
  {
    id: 'vol-pantry-packing',
    title: 'Pantry Box Assembly & Produce Sorter',
    department: 'Food Distribution',
    location: 'East District Distribution Depot',
    schedule: 'Wednesdays & Saturdays, 9:00 AM – 12:30 PM',
    timeCommitment: '3.5 hours / session',
    spotsTotal: 15,
    spotsFilled: 11,
    description: 'Inspect fresh produce deliveries, pack weekly family grocery boxes, and organize pantry shelf stock with care and dignity.',
    requirements: [
      'Ability to lift boxes up to 10kg with support',
      'Attention to detail for expiry dates and produce quality',
      'Enthusiasm for team coordination'
    ],
    skillsNeeded: ['Logistics', 'Stock Organizing', 'Quality Check']
  },
  {
    id: 'vol-garden-maintenance',
    title: 'Garden Cultivator & Workshop Helper',
    department: 'Urban Agriculture',
    location: 'Southside Community Commons',
    schedule: 'Saturdays, 10:00 AM – 1:00 PM',
    timeCommitment: '3 hours / session',
    spotsTotal: 10,
    spotsFilled: 6,
    description: 'Help tend community garden beds, water vegetables, manage organic compost bins, and guide visitors during public planting days.',
    requirements: [
      'Enjoy working outdoors in various weather conditions',
      'No prior gardening experience required — training provided',
      'Gloves and tools provided'
    ],
    skillsNeeded: ['Gardening', 'Composting', 'Community Engagement']
  },
  {
    id: 'vol-driver-delivery',
    title: 'Neighborhood Delivery & Senior Check-in Driver',
    department: 'Outreach & Mobility',
    location: 'Depot to local residential routes',
    schedule: 'Thursdays & Fridays, 1:30 PM – 4:30 PM',
    timeCommitment: '3 hours / shift',
    spotsTotal: 6,
    spotsFilled: 4,
    description: 'Deliver pre-packed fresh food hampers to elderly or mobility-impaired residents, providing a warm doorstep smile and social check-in.',
    requirements: [
      'Valid driver license and clean driving record',
      'Reliable vehicle or comfortable driving community van',
      'Empathy and reliable timekeeping'
    ],
    skillsNeeded: ['Driving', 'Empathy', 'Communication']
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    type: 'offer',
    title: 'Surplus heirloom apples & squash from allotment garden',
    authorName: 'Marcus T.',
    neighborhood: 'South Parkwood',
    content: 'We had an abundant harvest from our plot this week! 4 large crates of cooking apples and butternut squash ready for anyone in need or for the kitchen soup pots.',
    contactMethod: 'Pickup at Community Garden Gate on Sat morning',
    createdAt: '2026-10-22T09:15:00Z',
    repliesCount: 3,
    responses: [
      {
        id: 'resp-1',
        responderName: 'Sarah K. (Kitchen Team)',
        message: 'Marcus! We would love to take 2 crates for Thursday’s vegetable stew. Can I swing by Friday afternoon?',
        createdAt: '2026-10-22T11:30:00Z'
      },
      {
        id: 'resp-2',
        responderName: 'David L.',
        message: 'I can help transport them in my car if Sarah needs assistance moving the crates!',
        createdAt: '2026-10-22T13:00:00Z'
      }
    ]
  },
  {
    id: 'post-2',
    type: 'request',
    title: 'Volunteer buddy for Thursday pantry distribution pickup',
    authorName: 'Eleanor Vance',
    neighborhood: 'North Terrace',
    content: 'Looking for a neighbor who is heading to the East Depot this Thursday to help me carry two heavy dry-goods bags back. I walk with a cane.',
    contactMethod: 'Phone / SMS via Community Liaison desk',
    createdAt: '2026-10-21T15:40:00Z',
    repliesCount: 2,
    responses: [
      {
        id: 'resp-3',
        responderName: 'Rachel Miller',
        message: 'Hi Eleanor! I drive by North Terrace every Thursday around 11:30 AM. I’d be glad to pick up your bags and drop them at your door.',
        createdAt: '2026-10-21T17:10:00Z'
      }
    ]
  },
  {
    id: 'post-3',
    type: 'meetup',
    title: 'Community Sourdough & Fermenting Swap Table',
    authorName: 'Chef Tariq',
    neighborhood: 'Central Community Hall',
    content: 'Join us this Sunday at 2:30 PM for a casual culture swap! Bringing active sourdough starter jars, fermented vegetable samples, and recipe cards. All skill levels welcome.',
    contactMethod: 'Drop-in at Community Kitchen dining room',
    createdAt: '2026-10-20T18:20:00Z',
    repliesCount: 4,
    responses: [
      {
        id: 'resp-4',
        responderName: 'Elena P.',
        message: 'Count me in! I will bring water kefir grains to share.',
        createdAt: '2026-10-21T08:45:00Z'
      }
    ]
  }
];

export const INITIAL_DONATIONS: Donation[] = [
  {
    id: 'don-001',
    receiptNumber: 'FL-2026-8812',
    donorName: 'Dr. Evelyn Reed',
    donorEmail: 'evelyn.reed@example.com',
    amount: 150,
    currency: 'GBP',
    frequency: 'one-time',
    projectId: 'proj-community-kitchen',
    projectTitle: 'Community Kitchen Warm Meal Program',
    giftAid: true,
    message: 'Warm meals bring people together. Thank you to all the kitchen volunteers!',
    paymentMethod: 'card',
    createdAt: '2026-10-22T14:22:00Z',
    status: 'completed'
  },
  {
    id: 'don-002',
    receiptNumber: 'FL-2026-8813',
    donorName: 'Anonymous Community Member',
    donorEmail: 'anonymous@donor.feedlink.org',
    amount: 60,
    currency: 'GBP',
    frequency: 'monthly',
    projectId: 'proj-urban-garden',
    projectTitle: 'Urban Neighborhood Garden & Seed Bank',
    giftAid: true,
    message: 'May the seeds sprout healthy greens for everyone this season.',
    paymentMethod: 'card',
    createdAt: '2026-10-22T16:45:00Z',
    status: 'completed'
  },
  {
    id: 'don-003',
    receiptNumber: 'FL-2026-8814',
    donorName: 'Julian & Maya Chen',
    donorEmail: 'julian.chen@example.com',
    amount: 250,
    currency: 'GBP',
    frequency: 'one-time',
    projectId: 'proj-food-pantry',
    projectTitle: 'Fresh Produce Boxes & Mobile Community Pantry',
    giftAid: false,
    message: 'In honour of our neighborhood grocery workers.',
    paymentMethod: 'digital_wallet',
    createdAt: '2026-10-23T07:10:00Z',
    status: 'completed'
  }
];

export const INITIAL_VOLUNTEER_APPLICATIONS: VolunteerApplication[] = [
  {
    id: 'app-001',
    roleId: 'vol-kitchen-prep',
    roleTitle: 'Kitchen Prep & Hot Meal Service',
    fullName: 'Liam O’Connor',
    email: 'liam.oc@example.com',
    phone: '+44 7700 900142',
    availability: ['Tuesday mornings', 'Thursday mornings'],
    experienceNotes: 'Food safety certified (Level 2). Volunteered previously in community college cafeteria.',
    emergencyContact: 'Clara O’Connor (+44 7700 900889)',
    status: 'approved',
    appliedAt: '2026-10-21T11:00:00Z'
  },
  {
    id: 'app-002',
    roleId: 'vol-driver-delivery',
    roleTitle: 'Neighborhood Delivery & Senior Check-in Driver',
    fullName: 'Amina Yusuf',
    email: 'amina.yusuf@example.com',
    phone: '+44 7700 900551',
    availability: ['Friday afternoons'],
    experienceNotes: 'Clean driver license for 8 years. Experienced in caring for elderly relatives.',
    emergencyContact: 'Farah Yusuf (+44 7700 900332)',
    status: 'pending',
    appliedAt: '2026-10-22T13:40:00Z'
  }
];
