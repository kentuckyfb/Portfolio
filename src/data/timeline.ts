export type CareerEntry = {
  id: string
  role: string
  company: string
  period: string
  description: string
  tech: string[]
  skills: string[]
}

export type EducationEntry = {
  id: string
  qualification: string
  institution: string
  period: string
  learned: string[]
}

export const career: CareerEntry[] = [
  {
    id: 'bespoke-motor-group',
    role: 'Software Engineer',
    company: 'Bespoke Motor Group',
    period: 'May 2025 - Present',
    description: '',
    tech: [],
    skills: [],
  },
  {
    id: 'porsche-gold-coast',
    role: 'Software Engineer',
    company: 'Porsche Gold Coast',
    period: 'May 2025 - Present',
    description: '',
    tech: [],
    skills: [],
  },
  {
    id: 'voice-of-the-streets',
    role: 'Volunteer',
    company: 'Voice of the Streets',
    period: 'March 2025 - Present',
    description: '',
    tech: [],
    skills: [],
  },
  {
    id: 'jedi',
    role: 'Co-Founder',
    company: 'JEDI',
    period: 'January 2024 - Present',
    description: '',
    tech: [],
    skills: [],
  },
  {
    id: 'atlas-axillia',
    role: 'Executive',
    company: 'Atlas Axillia',
    period: 'August 2024 - April 2025',
    description: 'Worked across digital and marketing technology, including CRM, website, application, and AI initiatives.',
    tech: ['Google Analytics', 'Zoho CRM', 'MySQL', 'Postman'],
    skills: ['CRM management', 'Website delivery', 'Application development', 'AI solutions'],
  },
  {
    id: 'nine-hermits',
    role: 'Intern Game Developer',
    company: 'Nine Hermits',
    period: 'January 2023 - July 2023',
    description: 'Developed 2D and 3D web games and assisted with a blockchain-based NFT game and multiplayer mechanics.',
    tech: ['Unity', 'JavaScript'],
    skills: ['2D and 3D game development', 'Multiplayer mechanics', 'Blockchain game development'],
  },
  {
    id: 'giga-foods',
    role: 'Receptionist',
    company: 'Giga Foods (Pvt) Ltd',
    period: 'January 2022 - January 2023',
    description: 'Handled customer support, order logs, system updates, and sales reporting.',
    tech: [],
    skills: ['Customer support', 'Order administration', 'System updates', 'Sales reporting'],
  },
]

export const education: EducationEntry[] = [
  {
    id: 'uclan-software-engineering',
    qualification: 'Software Engineering',
    institution: 'University of Central Lancashire',
    period: '2021 - December 2024',
    learned: [],
  },
  {
    id: 'wesley-college-ols',
    qualification: "O/L's",
    institution: 'Wesley College, Colombo',
    period: 'June 2018',
    learned: [],
  },
]
