/**
 * Authoritative Industry & Role Taxonomy
 * Source: NAICS 2022 + LinkedIn Hybrid
 * Version: 1.0.0
 * Date: 2026-04-06
 */

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  slug: string;
  industry_id: string;
  description: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    name: "Technology & Software",
    slug: "technology-software",
    description: "Software development, IT services, cloud computing, cybersecurity, and emerging technologies"
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    name: "Financial Services",
    slug: "financial-services",
    description: "Banking, investment management, insurance, fintech, and financial technology"
  },
  {
    id: "10000000-0000-0000-0000-000000000003",
    name: "Healthcare & Life Sciences",
    slug: "healthcare-lifesciences",
    description: "Healthcare delivery, pharmaceuticals, biotechnology, medical devices, and health IT"
  },
  {
    id: "10000000-0000-0000-0000-000000000004",
    name: "Manufacturing & Engineering",
    slug: "manufacturing-engineering",
    description: "Chemical, mechanical, electrical, and industrial manufacturing and engineering"
  },
  {
    id: "10000000-0000-0000-0000-000000000005",
    name: "Professional Services",
    slug: "professional-services",
    description: "Consulting, legal, HR, marketing, and business services"
  },
  {
    id: "10000000-0000-0000-0000-000000000006",
    name: "Retail & E-Commerce",
    slug: "retail-ecommerce",
    description: "Online and physical retail, consumer goods, supply chain, and logistics"
  },
  {
    id: "10000000-0000-0000-0000-000000000007",
    name: "Energy & Utilities",
    slug: "energy-utilities",
    description: "Oil & gas, renewable energy, utilities, and energy technology"
  },
  {
    id: "10000000-0000-0000-0000-000000000008",
    name: "Education & Research",
    slug: "education-research",
    description: "Higher education, K-12, EdTech, training, and academic research"
  },
  {
    id: "10000000-0000-0000-0000-000000000009",
    name: "Media, Entertainment & Creative",
    slug: "media-entertainment",
    description: "Publishing, broadcasting, gaming, social media, and creative services"
  },
  {
    id: "10000000-0000-0000-0000-000000000010",
    name: "Government & Public Sector",
    slug: "government-public",
    description: "Federal, state, local government, defense, and public administration"
  }
];

export const ROLES: Role[] = [
  // Technology & Software (7 roles)
  {
    id: "20000001-0000-0000-0000-000000000001",
    name: "Software Engineer",
    slug: "software-engineer",
    industry_id: "10000000-0000-0000-0000-000000000001",
    description: "Design and develop software applications, write clean maintainable code, collaborate with cross-functional teams"
  },
  {
    id: "20000001-0000-0000-0000-000000000002",
    name: "DevOps Engineer / SRE",
    slug: "devops-sre",
    industry_id: "10000000-0000-0000-0000-000000000001",
    description: "Build and maintain CI/CD pipelines, monitor system reliability, manage cloud infrastructure"
  },
  {
    id: "20000001-0000-0000-0000-000000000003",
    name: "Data Scientist",
    slug: "data-scientist",
    industry_id: "10000000-0000-0000-0000-000000000001",
    description: "Build predictive models and ML algorithms, analyze large datasets, communicate findings to stakeholders"
  },
  {
    id: "20000001-0000-0000-0000-000000000004",
    name: "ML Engineer",
    slug: "ml-engineer",
    industry_id: "10000000-0000-0000-0000-000000000001",
    description: "Deploy and scale ML models in production, optimize model performance, build ML infrastructure"
  },
  {
    id: "20000001-0000-0000-0000-000000000005",
    name: "Security Engineer",
    slug: "security-engineer",
    industry_id: "10000000-0000-0000-0000-000000000001",
    description: "Implement security controls and monitoring, conduct vulnerability assessments, respond to security incidents"
  },
  {
    id: "20000001-0000-0000-0000-000000000006",
    name: "Solutions Architect",
    slug: "solutions-architect",
    industry_id: "10000000-0000-0000-0000-000000000001",
    description: "Design scalable system architectures, evaluate technology solutions, lead technical discussions"
  },
  {
    id: "20000001-0000-0000-0000-000000000007",
    name: "Product Manager (Technical)",
    slug: "product-manager-tech",
    industry_id: "10000000-0000-0000-0000-000000000001",
    description: "Define product roadmap and strategy, gather requirements, work with engineering teams"
  },

  // Financial Services (7 roles)
  {
    id: "20000002-0000-0000-0000-000000000001",
    name: "Financial Analyst",
    slug: "financial-analyst",
    industry_id: "10000000-0000-0000-0000-000000000002",
    description: "Analyze financial data and prepare reports, build financial models, evaluate investment opportunities"
  },
  {
    id: "20000002-0000-0000-0000-000000000002",
    name: "Quantitative Analyst",
    slug: "quant-analyst",
    industry_id: "10000000-0000-0000-0000-000000000002",
    description: "Develop quantitative trading strategies, build statistical models, analyze market data"
  },
  {
    id: "20000002-0000-0000-0000-000000000003",
    name: "Risk Manager",
    slug: "risk-manager",
    industry_id: "10000000-0000-0000-0000-000000000002",
    description: "Identify and assess financial risks, develop risk mitigation strategies, monitor compliance"
  },
  {
    id: "20000002-0000-0000-0000-000000000004",
    name: "Investment Banker",
    slug: "investment-banker",
    industry_id: "10000000-0000-0000-0000-000000000002",
    description: "Advise on M&A and capital raising, conduct financial due diligence, structure complex transactions"
  },
  {
    id: "20000002-0000-0000-0000-000000000005",
    name: "Compliance Officer",
    slug: "compliance-officer",
    industry_id: "10000000-0000-0000-0000-000000000002",
    description: "Ensure regulatory compliance, develop compliance policies, conduct audits"
  },
  {
    id: "20000002-0000-0000-0000-000000000006",
    name: "Fraud Analyst",
    slug: "fraud-analyst",
    industry_id: "10000000-0000-0000-0000-000000000002",
    description: "Detect and investigate fraudulent activities, analyze transaction patterns, implement fraud prevention"
  },
  {
    id: "20000002-0000-0000-0000-000000000007",
    name: "Accountant",
    slug: "accountant",
    industry_id: "10000000-0000-0000-0000-000000000002",
    description: "Prepare financial statements, manage accounts, conduct audits and reconciliations"
  },

  // Healthcare & Life Sciences (7 roles)
  {
    id: "20000003-0000-0000-0000-000000000001",
    name: "Clinical Data Scientist",
    slug: "clinical-data-scientist",
    industry_id: "10000000-0000-0000-0000-000000000003",
    description: "Analyze clinical trial data, build predictive models for patient outcomes, support evidence-based medicine"
  },
  {
    id: "20000003-0000-0000-0000-000000000002",
    name: "Health Informatics Specialist",
    slug: "health-informatics",
    industry_id: "10000000-0000-0000-0000-000000000003",
    description: "Manage electronic health records systems, analyze healthcare data, ensure HIPAA compliance"
  },
  {
    id: "20000003-0000-0000-0000-000000000003",
    name: "Bioinformatics Engineer",
    slug: "bioinformatics-engineer",
    industry_id: "10000000-0000-0000-0000-000000000003",
    description: "Analyze genomic and proteomic data, develop computational biology tools, support drug discovery"
  },
  {
    id: "20000003-0000-0000-0000-000000000004",
    name: "Medical Writer",
    slug: "medical-writer",
    industry_id: "10000000-0000-0000-0000-000000000003",
    description: "Write clinical study reports, prepare regulatory submissions, create medical education content"
  },
  {
    id: "20000003-0000-0000-0000-000000000005",
    name: "Healthcare Analyst",
    slug: "healthcare-analyst",
    industry_id: "10000000-0000-0000-0000-000000000003",
    description: "Analyze healthcare operations data, identify cost reduction opportunities, support population health management"
  },
  {
    id: "20000003-0000-0000-0000-000000000006",
    name: "Clinical Research Coordinator",
    slug: "clinical-research-coordinator",
    industry_id: "10000000-0000-0000-0000-000000000003",
    description: "Coordinate clinical trial activities, ensure protocol compliance, manage patient recruitment"
  },
  {
    id: "20000003-0000-0000-0000-000000000007",
    name: "Pharmacovigilance Specialist",
    slug: "pharmacovigilance-specialist",
    industry_id: "10000000-0000-0000-0000-000000000003",
    description: "Monitor drug safety and adverse events, prepare safety reports, assess benefit-risk profiles"
  },

  // Manufacturing & Engineering (7 roles)
  {
    id: "20000004-0000-0000-0000-000000000001",
    name: "Chemical Engineer",
    slug: "chemical-engineer",
    industry_id: "10000000-0000-0000-0000-000000000004",
    description: "Design and optimize chemical processes, conduct process simulations, troubleshoot production issues"
  },
  {
    id: "20000004-0000-0000-0000-000000000002",
    name: "Process Engineer",
    slug: "process-engineer",
    industry_id: "10000000-0000-0000-0000-000000000004",
    description: "Optimize manufacturing processes, implement process improvements, ensure quality standards"
  },
  {
    id: "20000004-0000-0000-0000-000000000003",
    name: "Quality Engineer",
    slug: "quality-engineer",
    industry_id: "10000000-0000-0000-0000-000000000004",
    description: "Develop quality control procedures, conduct inspections, implement quality management systems"
  },
  {
    id: "20000004-0000-0000-0000-000000000004",
    name: "Manufacturing Engineer",
    slug: "manufacturing-engineer",
    industry_id: "10000000-0000-0000-0000-000000000004",
    description: "Design manufacturing systems, optimize production workflows, implement automation solutions"
  },
  {
    id: "20000004-0000-0000-0000-000000000005",
    name: "Supply Chain Engineer",
    slug: "supply-chain-engineer",
    industry_id: "10000000-0000-0000-0000-000000000004",
    description: "Optimize supply chain operations, manage logistics, implement inventory management systems"
  },
  {
    id: "20000004-0000-0000-0000-000000000006",
    name: "Process Safety Engineer",
    slug: "process-safety-engineer",
    industry_id: "10000000-0000-0000-0000-000000000004",
    description: "Conduct hazard assessments, develop safety management systems, investigate incidents"
  },
  {
    id: "20000004-0000-0000-0000-000000000007",
    name: "Mechanical Engineer",
    slug: "mechanical-engineer",
    industry_id: "10000000-0000-0000-0000-000000000004",
    description: "Design mechanical systems, conduct stress analysis, develop prototypes and test procedures"
  },

  // Professional Services (7 roles)
  {
    id: "20000005-0000-0000-0000-000000000001",
    name: "Management Consultant",
    slug: "management-consultant",
    industry_id: "10000000-0000-0000-0000-000000000005",
    description: "Advise organizations on strategy, analyze business problems, implement solutions"
  },
  {
    id: "20000005-0000-0000-0000-000000000002",
    name: "HR Business Partner",
    slug: "hr-business-partner",
    industry_id: "10000000-0000-0000-0000-000000000005",
    description: "Partner with business leaders on workforce planning, drive employee engagement, resolve employee relations"
  },
  {
    id: "20000005-0000-0000-0000-000000000003",
    name: "Talent Acquisition Specialist",
    slug: "talent-acquisition",
    industry_id: "10000000-0000-0000-0000-000000000005",
    description: "Source and recruit qualified candidates, conduct interviews, manage recruitment lifecycle"
  },
  {
    id: "20000005-0000-0000-0000-000000000004",
    name: "Marketing Manager",
    slug: "marketing-manager",
    industry_id: "10000000-0000-0000-0000-000000000005",
    description: "Develop marketing strategies, manage campaigns, analyze market trends and customer insights"
  },
  {
    id: "20000005-0000-0000-0000-000000000005",
    name: "Business Analyst",
    slug: "business-analyst",
    industry_id: "10000000-0000-0000-0000-000000000005",
    description: "Analyze business processes, gather requirements, create data-driven recommendations"
  },
  {
    id: "20000005-0000-0000-0000-000000000006",
    name: "Operations Manager",
    slug: "operations-manager",
    industry_id: "10000000-0000-0000-0000-000000000005",
    description: "Oversee daily operations, develop operational policies, manage teams and resources"
  },
  {
    id: "20000005-0000-0000-0000-000000000007",
    name: "Project Manager",
    slug: "project-manager",
    industry_id: "10000000-0000-0000-0000-000000000005",
    description: "Plan and execute projects, coordinate teams, track milestones and manage risks"
  },

  // Retail & E-Commerce (7 roles)
  {
    id: "20000006-0000-0000-0000-000000000001",
    name: "E-Commerce Manager",
    slug: "ecommerce-manager",
    industry_id: "10000000-0000-0000-0000-000000000006",
    description: "Manage online sales channels, optimize customer experience, analyze e-commerce metrics"
  },
  {
    id: "20000006-0000-0000-0000-000000000002",
    name: "Supply Chain Analyst",
    slug: "supply-chain-analyst",
    industry_id: "10000000-0000-0000-0000-000000000006",
    description: "Analyze supply chain data, optimize inventory levels, improve logistics efficiency"
  },
  {
    id: "20000006-0000-0000-0000-000000000003",
    name: "Merchandising Analyst",
    slug: "merchandising-analyst",
    industry_id: "10000000-0000-0000-0000-000000000006",
    description: "Analyze product performance, optimize pricing and promotions, forecast demand"
  },
  {
    id: "20000006-0000-0000-0000-000000000004",
    name: "Growth Marketer",
    slug: "growth-marketer",
    industry_id: "10000000-0000-0000-0000-000000000006",
    description: "Drive customer acquisition, optimize conversion funnels, run growth experiments"
  },
  {
    id: "20000006-0000-0000-0000-000000000005",
    name: "CX / Personalization Engineer",
    slug: "cx-personalization",
    industry_id: "10000000-0000-0000-0000-000000000006",
    description: "Build personalization systems, optimize customer experience, implement recommendation engines"
  },
  {
    id: "20000006-0000-0000-0000-000000000006",
    name: "Logistics Coordinator",
    slug: "logistics-coordinator",
    industry_id: "10000000-0000-0000-0000-000000000006",
    description: "Coordinate shipping and delivery, manage warehouse operations, optimize logistics processes"
  },
  {
    id: "20000006-0000-0000-0000-000000000007",
    name: "Category Manager",
    slug: "category-manager",
    industry_id: "10000000-0000-0000-0000-000000000006",
    description: "Manage product categories, develop category strategies, negotiate with suppliers"
  },

  // Energy & Utilities (7 roles)
  {
    id: "20000007-0000-0000-0000-000000000001",
    name: "Energy Analyst",
    slug: "energy-analyst",
    industry_id: "10000000-0000-0000-0000-000000000007",
    description: "Analyze energy markets, forecast demand, evaluate energy projects"
  },
  {
    id: "20000007-0000-0000-0000-000000000002",
    name: "Petroleum Engineer",
    slug: "petroleum-engineer",
    industry_id: "10000000-0000-0000-0000-000000000007",
    description: "Design oil and gas extraction systems, optimize production, manage reservoir performance"
  },
  {
    id: "20000007-0000-0000-0000-000000000003",
    name: "Renewable Energy Engineer",
    slug: "renewable-energy-engineer",
    industry_id: "10000000-0000-0000-0000-000000000007",
    description: "Design renewable energy systems, optimize solar/wind installations, assess project feasibility"
  },
  {
    id: "20000007-0000-0000-0000-000000000004",
    name: "Utility Operations Manager",
    slug: "utility-operations-manager",
    industry_id: "10000000-0000-0000-0000-000000000007",
    description: "Manage utility operations, ensure service reliability, coordinate maintenance activities"
  },
  {
    id: "20000007-0000-0000-0000-000000000005",
    name: "Environmental Engineer",
    slug: "environmental-engineer",
    industry_id: "10000000-0000-0000-0000-000000000007",
    description: "Assess environmental impact, develop sustainability solutions, ensure regulatory compliance"
  },
  {
    id: "20000007-0000-0000-0000-000000000006",
    name: "Grid Engineer",
    slug: "grid-engineer",
    industry_id: "10000000-0000-0000-0000-000000000007",
    description: "Design and maintain electrical grid systems, optimize power distribution, ensure grid stability"
  },
  {
    id: "20000007-0000-0000-0000-000000000007",
    name: "Energy Storage Specialist",
    slug: "energy-storage-specialist",
    industry_id: "10000000-0000-0000-0000-000000000007",
    description: "Design battery storage systems, optimize energy storage solutions, evaluate storage technologies"
  },

  // Education & Research (7 roles)
  {
    id: "20000008-0000-0000-0000-000000000001",
    name: "Instructional Designer",
    slug: "instructional-designer",
    industry_id: "10000000-0000-0000-0000-000000000008",
    description: "Design learning experiences, develop curriculum, create educational materials"
  },
  {
    id: "20000008-0000-0000-0000-000000000002",
    name: "EdTech Product Manager",
    slug: "edtech-product-manager",
    industry_id: "10000000-0000-0000-0000-000000000008",
    description: "Develop educational technology products, gather user requirements, manage product roadmap"
  },
  {
    id: "20000008-0000-0000-0000-000000000003",
    name: "Academic Researcher",
    slug: "academic-researcher",
    industry_id: "10000000-0000-0000-0000-000000000008",
    description: "Conduct research studies, publish findings, secure research funding"
  },
  {
    id: "20000008-0000-0000-0000-000000000004",
    name: "Curriculum Developer",
    slug: "curriculum-developer",
    industry_id: "10000000-0000-0000-0000-000000000008",
    description: "Design curriculum frameworks, align with learning standards, develop assessment strategies"
  },
  {
    id: "20000008-0000-0000-0000-000000000005",
    name: "Learning & Development Specialist",
    slug: "learning-development",
    industry_id: "10000000-0000-0000-0000-000000000008",
    description: "Design training programs, facilitate learning sessions, measure training effectiveness"
  },
  {
    id: "20000008-0000-0000-0000-000000000006",
    name: "Education Data Analyst",
    slug: "education-data-analyst",
    industry_id: "10000000-0000-0000-0000-000000000008",
    description: "Analyze student performance data, identify learning trends, support data-driven decisions"
  },
  {
    id: "20000008-0000-0000-0000-000000000007",
    name: "Online Learning Coordinator",
    slug: "online-learning-coordinator",
    industry_id: "10000000-0000-0000-0000-000000000008",
    description: "Manage online learning platforms, support remote learners, coordinate virtual programs"
  },

  // Media, Entertainment & Creative (7 roles)
  {
    id: "20000009-0000-0000-0000-000000000001",
    name: "Content Strategist",
    slug: "content-strategist",
    industry_id: "10000000-0000-0000-0000-000000000009",
    description: "Develop content strategies, plan editorial calendars, optimize content performance"
  },
  {
    id: "20000009-0000-0000-0000-000000000002",
    name: "Social Media Manager",
    slug: "social-media-manager",
    industry_id: "10000000-0000-0000-0000-000000000009",
    description: "Manage social media channels, create engaging content, analyze social metrics"
  },
  {
    id: "20000009-0000-0000-0000-000000000003",
    name: "Game Designer",
    slug: "game-designer",
    industry_id: "10000000-0000-0000-0000-000000000009",
    description: "Design game mechanics, create game narratives, balance gameplay systems"
  },
  {
    id: "20000009-0000-0000-0000-000000000004",
    name: "Video Producer",
    slug: "video-producer",
    industry_id: "10000000-0000-0000-0000-000000000009",
    description: "Produce video content, manage production workflows, coordinate creative teams"
  },
  {
    id: "20000009-0000-0000-0000-000000000005",
    name: "UX/UI Designer",
    slug: "ux-ui-designer",
    industry_id: "10000000-0000-0000-0000-000000000009",
    description: "Design user interfaces, conduct user research, create design systems"
  },
  {
    id: "20000009-0000-0000-0000-000000000006",
    name: "Creative Director",
    slug: "creative-director",
    industry_id: "10000000-0000-0000-0000-000000000009",
    description: "Lead creative vision, manage creative teams, oversee brand identity"
  },
  {
    id: "20000009-0000-0000-0000-000000000007",
    name: "Podcast Producer",
    slug: "podcast-producer",
    industry_id: "10000000-0000-0000-0000-000000000009",
    description: "Produce podcast episodes, manage audio production, coordinate guest interviews"
  },

  // Government & Public Sector (7 roles)
  {
    id: "20000010-0000-0000-0000-000000000001",
    name: "Policy Analyst",
    slug: "policy-analyst",
    industry_id: "10000000-0000-0000-0000-000000000010",
    description: "Analyze public policy, conduct research, develop policy recommendations"
  },
  {
    id: "20000010-0000-0000-0000-000000000002",
    name: "Government Program Manager",
    slug: "government-program-manager",
    industry_id: "10000000-0000-0000-0000-000000000010",
    description: "Manage government programs, coordinate stakeholders, ensure program compliance"
  },
  {
    id: "20000010-0000-0000-0000-000000000003",
    name: "Public Affairs Specialist",
    slug: "public-affairs-specialist",
    industry_id: "10000000-0000-0000-0000-000000000010",
    description: "Manage public communications, coordinate media relations, develop outreach strategies"
  },
  {
    id: "20000010-0000-0000-0000-000000000004",
    name: "Defense Analyst",
    slug: "defense-analyst",
    industry_id: "10000000-0000-0000-0000-000000000010",
    description: "Analyze defense systems, assess security threats, support strategic planning"
  },
  {
    id: "20000010-0000-0000-0000-000000000005",
    name: "Civic Engagement Coordinator",
    slug: "civic-engagement-coordinator",
    industry_id: "10000000-0000-0000-0000-000000000010",
    description: "Coordinate community engagement, facilitate public participation, organize civic programs"
  },
  {
    id: "20000010-0000-0000-0000-000000000006",
    name: "Budget Analyst",
    slug: "budget-analyst",
    industry_id: "10000000-0000-0000-0000-000000000010",
    description: "Analyze budget proposals, monitor spending, prepare financial reports"
  },
  {
    id: "20000010-0000-0000-0000-000000000007",
    name: "Emergency Management Coordinator",
    slug: "emergency-management",
    industry_id: "10000000-0000-0000-0000-000000000010",
    description: "Coordinate emergency response, develop disaster plans, manage crisis communications"
  }
];

export function getIndustryById(id: string): Industry | undefined {
  return INDUSTRIES.find(i => i.id === id);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find(i => i.slug === slug);
}

export function getRoleById(id: string): Role | undefined {
  return ROLES.find(r => r.id === id);
}

export function getRoleBySlug(slug: string): Role | undefined {
  return ROLES.find(r => r.slug === slug);
}

export function getRolesByIndustryId(industryId: string): Role[] {
  return ROLES.filter(r => r.industry_id === industryId);
}

export function getRolesByIndustrySlug(industrySlug: string): Role[] {
  const industry = getIndustryBySlug(industrySlug);
  if (!industry) return [];
  return getRolesByIndustryId(industry.id);
}
