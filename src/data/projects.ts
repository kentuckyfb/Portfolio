export type Project = {
  id: string
  name: string
  url: string
  repository: string
  description: string
  stack: string[]
}

export const projects: Project[] = [
  {
    id: 'auditory-assist',
    name: 'AuditoryAssist Unity',
    url: 'https://github.com/kentuckyfb/AuditoryAssist-Unity',
    repository: 'https://github.com/kentuckyfb/AuditoryAssist-Unity',
    description: 'A Unity-based auditory assistance project with Firebase authentication and custom shader work.',
    stack: ['Unity', 'C#', 'Firebase', 'ShaderLab', 'HLSL'],
  },
  {
    id: 'tweaking',
    name: 'TweakIng',
    url: 'https://github.com/kentuckyfb/TweakIng',
    repository: 'https://github.com/kentuckyfb/TweakIng',
    description: 'A Chrome extension for applying custom CSS and JavaScript to websites on the client side.',
    stack: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'innovate-quiz',
    name: 'Innovate Quiz',
    url: 'https://innovate-quiz-app.vercel.app',
    repository: 'https://github.com/kentuckyfb/Innovate-QuizApp',
    description: 'An animated Sinhala and Tamil New Year personality quiz with weighted results, social sharing, administration, and analytics.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Supabase', 'Vercel'],
  },
  {
    id: 'reelfeel',
    name: 'ReelFeel',
    url: 'https://github.com/kentuckyfb/ReelFeel',
    repository: 'https://github.com/kentuckyfb/ReelFeel',
    description: 'An AI-powered movie discovery interface that recommends films from a user’s mood and viewing preferences.',
    stack: ['Next.js', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Axios'],
  },
  {
    id: 'restro-pos',
    name: 'Restro POS',
    url: 'https://github.com/kentuckyfb/restro-pos',
    repository: 'https://github.com/kentuckyfb/restro-pos',
    description: 'An offline-ready restaurant point-of-sale system with live kitchen sync, inventory, table management, receipts, and reports.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Redux', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'omi',
    name: 'Omi',
    url: 'https://omi-three.vercel.app',
    repository: 'https://github.com/kentuckyfb/Omi',
    description: 'A browser-based version of the Sri Lankan trick-taking card game, with solo and online multiplayer modes.',
    stack: ['JavaScript', 'Vite', 'Ably Realtime', 'Web Audio API', 'CSS'],
  },
  {
    id: 'gitexplore',
    name: 'GitExplore',
    url: 'https://gitexplore-bice.vercel.app',
    repository: 'https://github.com/kentuckyfb/GitExplore',
    description: 'A scroll-first interface for discovering public repositories, hidden gems, job resources, and unfamiliar technology stacks.',
    stack: ['JavaScript', 'GitHub API', 'PWA', 'Vercel', 'OAuth'],
  },
  {
    id: 'auto-lookup',
    name: 'Auto Lookup',
    url: 'https://auto-lookup-m1vf.vercel.app',
    repository: 'https://github.com/kentuckyfb/auto-lookup',
    description: 'A vehicle lookup and guided diagnosis platform for model-year photos, recalls, owner reports, and common symptoms.',
    stack: ['JavaScript', 'Vercel', 'Supabase', 'NHTSA API', 'Gemini API'],
  },
  {
    id: 'pokecore',
    name: 'PokeCore',
    url: 'https://poke-core.vercel.app',
    repository: 'https://github.com/kentuckyfb/PokeCore',
    description: 'An interactive Pokémon explorer that presents API data through animated cards and a responsive bento layout.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'PokeAPI'],
  },
  {
    id: 'textpectations',
    name: 'Textpectations',
    url: 'https://github.com/kentuckyfb/Textpectations',
    repository: 'https://github.com/kentuckyfb/Textpectations',
    description: 'A WhatsApp chat analyzer that turns exported conversations into playful, Wrapped-style insights.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts'],
  },
  {
    id: 'ardent-fs',
    name: 'Ardent FS',
    url: 'https://github.com/kentuckyfb/Ardent-FS-frontend',
    repository: 'https://github.com/kentuckyfb/Ardent-FS-frontend',
    description: 'A natural-language file search interface that ranks files and folders using NLP and TF-IDF relevance scoring.',
    stack: ['TypeScript', 'JavaScript', 'CSS', 'NLP', 'TF-IDF'],
  },
  {
    id: 'websight',
    name: 'WebSight',
    url: 'https://github.com/kentuckyfb/WebSight',
    repository: 'https://github.com/kentuckyfb/WebSight',
    description: 'A Python web crawler for collecting basic website performance information.',
    stack: ['Python', 'HTML', 'Web crawling'],
  },
  {
    id: 'sightguard',
    name: 'SightGuard',
    url: 'https://github.com/kentuckyfb/SightGuard',
    repository: 'https://github.com/kentuckyfb/SightGuard',
    description: 'An AI-assisted web experience for identifying diabetic retinopathy in fundus images.',
    stack: ['JavaScript', 'CSS', 'AI image analysis'],
  },
]
