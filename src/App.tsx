import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react'
import {
  siCss,
  siAxios,
  siCapacitor,
  siChartdotjs,
  siCplusplus,
  siExpress,
  siElectron,
  siFirebase,
  siFramer,
  siGithub,
  siGit,
  siGooglegemini,
  siHtml5,
  siHuggingface,
  siJavascript,
  siJupyter,
  siMongodb,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPlotly,
  siPwa,
  siPython,
  siPytorch,
  siRadixui,
  siReact,
  siReactquery,
  siRedux,
  siSharp,
  siScikitlearn,
  siScrapy,
  siSupabase,
  siTailwindcss,
  siTauri,
  siTensorflow,
  siTypescript,
  siVercel,
  siVite,
  siUnity,
  siGreensock,
  siZod,
  type SimpleIcon,
} from 'simple-icons'
import avatar from './assets/avatar.png'
import { projects, type Project } from './data/projects'
import { career, education, type CareerEntry, type EducationEntry } from './data/timeline'

type Page = {
  id: string
  label: string
  group: string
  kind: 'home' | 'main' | 'sub' | 'project' | 'career' | 'education'
  note?: string
  project?: Project
  career?: CareerEntry
  education?: EducationEntry
}

type NavGroup = {
  id: string
  label: string
  note: string
  children?: { id: string; label: string }[]
  timeline?: boolean
}

const groups: NavGroup[] = [
  { id: 'about', label: 'About me', note: 'A little more personal.', children: [{ id: 'about-personal', label: 'A bit more personal' }] },
  { id: 'projects', label: 'Projects', note: 'Selected work and experiments.', children: projects.map(({ id, name }) => ({ id: `project-${id}`, label: name })) },
  { id: 'career', label: 'Career', note: 'Where I have worked.', timeline: true, children: career.map(({ id, role, period }) => ({ id: `career-${id}`, label: `${period} · ${role}` })) },
  { id: 'education', label: 'Education', note: 'How I got here.', timeline: true, children: education.map(({ id, qualification, period }) => ({ id: `education-${id}`, label: `${period} · ${qualification}` })) },
  { id: 'contact', label: 'Get in touch', note: 'Let’s make something.' },
]

const pages: Page[] = [
  { id: 'home', label: '', group: 'home', kind: 'home' },
  ...groups.flatMap((group): Page[] => [
    ...(!group.timeline ? [{ id: group.id, label: group.label, group: group.id, kind: 'main' as const, note: group.note }] : []),
    ...(group.children ?? []).map((child): Page => {
      const project = child.id.startsWith('project-')
        ? projects.find(({ id }) => child.id === `project-${id}`)
        : undefined
      const careerEntry = child.id.startsWith('career-')
        ? career.find(({ id }) => child.id === `career-${id}`)
        : undefined
      const educationEntry = child.id.startsWith('education-')
        ? education.find(({ id }) => child.id === `education-${id}`)
        : undefined
      return {
        id: child.id,
        label: child.label,
        group: group.id,
        kind: project ? 'project' : careerEntry ? 'career' : educationEntry ? 'education' : 'sub',
        project,
        career: careerEntry,
        education: educationEntry,
      }
    }),
  ]),
]

const TRANSITION_MS = 680

type TechEntry = { name: string; icon?: SimpleIcon; monogram?: string }
type TechCategory = { label: string; color: string; items: TechEntry[] }

const techCategories: TechCategory[] = [
  { label: 'Languages & markup', color: '#f4cf4f', items: [
    { name: 'JavaScript', icon: siJavascript }, { name: 'TypeScript', icon: siTypescript },
    { name: 'Python', icon: siPython }, { name: 'C#', icon: siSharp }, { name: 'C++', icon: siCplusplus },
    { name: 'HTML', icon: siHtml5 }, { name: 'CSS', icon: siCss },
    { name: 'ShaderLab', monogram: 'SH' }, { name: 'HLSL', monogram: 'HL' },
  ] },
  { label: 'Frontend & interface', color: '#ff82ad', items: [
    { name: 'React', icon: siReact }, { name: 'Next.js', icon: siNextdotjs }, { name: 'Vite', icon: siVite },
    { name: 'Tailwind CSS', icon: siTailwindcss }, { name: 'Material UI', icon: siMui }, { name: 'Radix UI', icon: siRadixui },
    { name: 'Redux', icon: siRedux }, { name: 'TanStack Query', icon: siReactquery }, { name: 'Framer Motion', icon: siFramer },
    { name: 'GSAP', icon: siGreensock }, { name: 'Chart.js', icon: siChartdotjs }, { name: 'Recharts', icon: siChartdotjs },
    { name: 'Axios', icon: siAxios }, { name: 'Zod', icon: siZod },
  ] },
  { label: 'Backend & APIs', color: '#69aefc', items: [
    { name: 'Node.js', icon: siNodedotjs }, { name: 'Express', icon: siExpress },
    { name: 'Gemini API', icon: siGooglegemini }, { name: 'GitHub API', icon: siGithub },
    { name: 'Web Audio API', monogram: 'WA' }, { name: 'NHTSA API', monogram: 'NH' }, { name: 'PokeAPI', monogram: 'PO' },
  ] },
  { label: 'Databases & realtime', color: '#6fcd91', items: [
    { name: 'Supabase', icon: siSupabase }, { name: 'Firebase', icon: siFirebase },
    { name: 'MongoDB', icon: siMongodb }, { name: 'Ably Realtime', monogram: 'AB' },
  ] },
  { label: 'Data & AI', color: '#b58cf3', items: [
    { name: 'Jupyter', icon: siJupyter }, { name: 'TensorFlow', icon: siTensorflow }, { name: 'PyTorch', icon: siPytorch },
    { name: 'scikit-learn', icon: siScikitlearn }, { name: 'Hugging Face', icon: siHuggingface },
    { name: 'Pandas', icon: siPandas }, { name: 'NumPy', icon: siNumpy }, { name: 'Plotly', icon: siPlotly },
    { name: 'NLP', icon: siScikitlearn }, { name: 'TF-IDF', icon: siScikitlearn },
    { name: 'AI image analysis', icon: siTensorflow },
  ] },
  { label: 'Apps & platforms', color: '#ff9d66', items: [
    { name: 'Unity', icon: siUnity }, { name: 'Capacitor', icon: siCapacitor },
    { name: 'Electron', icon: siElectron }, { name: 'Tauri', icon: siTauri },
  ] },
  { label: 'Hosting & source control', color: '#ff7164', items: [
    { name: 'Vercel', icon: siVercel }, { name: 'Git', icon: siGit }, { name: 'GitHub', icon: siGithub },
  ] },
  { label: 'Methods & standards', color: '#61cbd2', items: [
    { name: 'PWA', icon: siPwa }, { name: 'OAuth', monogram: 'OA' }, { name: 'Web crawling', icon: siScrapy },
    { name: 'Offline-first', monogram: 'OF' }, { name: 'Responsive design', monogram: 'RD' },
    { name: 'REST APIs', monogram: 'API' }, { name: 'Real-time systems', monogram: 'RT' },
  ] },
]

const techLibrary = techCategories.flatMap(({ items }) => items)
const techByName = new Map(techLibrary.map((tech) => [tech.name, tech]))
const techScribbles = [
  'M5 24 C58 13 151 33 234 22 C247 35 213 49 160 47 C94 44 35 46 11 62 C2 73 48 80 105 74 C165 67 219 79 233 91 C239 104 196 111 140 106 C78 101 31 112 14 124 C6 138 66 143 124 135 C179 128 219 140 234 151',
  'M8 18 C41 34 88 37 129 22 C176 5 219 19 232 39 C243 58 195 61 154 52 C105 42 53 49 17 67 C-1 77 24 91 73 88 C129 84 190 72 226 94 C247 108 208 121 165 116 C115 110 61 108 20 132 C6 141 36 151 89 145 C143 139 198 135 232 153',
  'M5 30 C54 11 102 42 151 23 C190 8 226 18 234 35 C242 52 207 62 169 54 C119 43 79 49 37 70 C12 82 18 94 54 96 C101 99 134 76 182 82 C223 86 241 101 224 114 C202 132 159 113 120 120 C76 128 35 143 8 133 C-2 145 38 157 89 148 C142 140 188 147 233 157',
  'M7 20 C48 28 80 9 121 25 C164 41 210 19 234 33 C247 45 214 58 176 57 C128 55 97 39 54 54 C19 66 3 81 27 92 C54 105 94 80 137 91 C178 102 213 90 232 107 C245 120 216 133 174 126 C124 117 84 128 47 143 C29 151 15 148 7 139 C28 160 78 154 119 148 C169 140 204 151 234 158',
  'M5 25 C34 5 80 15 109 36 C135 55 160 57 193 39 C216 27 236 32 233 50 C230 71 190 77 153 69 C108 59 72 53 35 72 C7 86 8 101 39 106 C78 112 116 87 155 95 C196 104 237 104 231 124 C226 142 182 140 145 133 C103 126 59 136 17 153',
  'M9 16 C61 32 103 8 150 25 C191 40 220 32 232 48 C241 64 207 76 170 69 C127 62 88 45 48 61 C17 73 6 89 28 101 C55 116 95 91 133 99 C176 108 207 94 229 111 C247 125 215 143 170 135 C117 126 69 142 16 153',
  'M4 32 C42 13 75 15 110 38 C144 60 178 48 213 25 C231 13 240 27 231 43 C218 65 176 72 139 61 C96 49 57 52 23 76 C4 90 12 104 46 109 C86 115 115 89 153 96 C194 103 226 96 234 116 C240 134 198 146 157 137 C112 127 64 135 14 154',
  'M7 17 C38 38 72 35 103 17 C136 -2 170 12 190 35 C210 58 236 50 233 71 C230 91 195 96 159 83 C117 67 84 66 47 87 C18 104 8 118 34 129 C66 143 103 119 141 124 C180 130 210 118 232 137 C244 148 220 158 190 151 C141 140 91 146 17 158',
]
const techColor = (name: string) => {
  const tech = techByName.get(name)
  return !tech?.icon || name === 'Unity' ? '#181817' : `#${tech.icon.hex}`
}

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return <svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path d={icon.path} /></svg>
}

function TechMark({ name }: { name: string }) {
  const tech = techByName.get(name)
  return tech?.icon
    ? <BrandIcon icon={tech.icon} />
    : <span className="tech-fallback">{tech?.monogram ?? name.slice(0, 2)}</span>
}

function ProjectPage({ project }: { project: Project }) {
  return (
    <article className="project-page">
      <header className="project-header">
        <h1><a href={project.url} target="_blank" rel="noreferrer">{project.name}</a></h1>
        <p className="project-description">{project.description}</p>
        <div className="project-links">
          <a className="project-link" href={project.repository} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`}>
            <BrandIcon icon={siGithub} />
            <svg className="external-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M19 14v5H5V5h5" /></svg>
          </a>
          {project.url !== project.repository && (
            <a className="project-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} website`}>
              <svg className="website-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3Z" /></svg>
              <svg className="external-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M19 14v5H5V5h5" /></svg>
            </a>
          )}
        </div>
      </header>

      <section className="project-block">
        <h2>Tech stack</h2>
        <ul className="stack-list">
          {project.stack.map((item) => (
            <li key={item} title={item}>
              <span className="stack-icon" style={{ color: techColor(item) }}><TechMark name={item} /></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="project-block screenshots">
        <div className="screenshot-grid">
          <div><span>Screenshot</span></div>
          <div><span>Screenshot</span></div>
        </div>
      </section>
    </article>
  )
}

function CareerPage({ entry }: { entry: CareerEntry }) {
  return (
    <article className="timeline-page">
      <p className="timeline-period">{entry.period}</p>
      <h1>{entry.role}</h1>
      <p className="timeline-place">{entry.company}</p>
      {entry.description && <p className="timeline-description">{entry.description}</p>}
      {(entry.tech.length > 0 || entry.skills.length > 0) && (
        <div className="timeline-details">
          {entry.tech.length > 0 && <section><h2>Tech used</h2><ul>{entry.tech.map((item) => <li key={item}>{item}</li>)}</ul></section>}
          {entry.skills.length > 0 && <section><h2>Skills acquired</h2><ul>{entry.skills.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        </div>
      )}
    </article>
  )
}

function EducationPage({ entry }: { entry: EducationEntry }) {
  return (
    <article className="timeline-page">
      <p className="timeline-period">{entry.period}</p>
      <h1>{entry.qualification}</h1>
      <p className="timeline-place">{entry.institution}</p>
      {entry.learned.length > 0 && (
        <div className="timeline-details timeline-learning">
          <section><h2>What I learned</h2><ul>{entry.learned.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>
      )}
    </article>
  )
}

function ContactPage() {
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'message', string>>>({})

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const nextErrors: typeof errors = {}

    if (!name) nextErrors.name = 'Enter your name'
    if (!email) nextErrors.email = 'Enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email'
    if (!message) nextErrors.message = 'Enter a message'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${email}`)
    window.location.href = `mailto:nathanhimesh5@gmail.com?subject=${subject}&body=${body}`
  }

  const clearError = (field: 'name' | 'email' | 'message') => {
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  return (
    <article className="contact-page">
      <section className="contact-intro">
        <h1>Get in touch</h1>
        <p>Have a project, an idea, or just want to say hi?</p>
        <div className="contact-details">
          <a href="mailto:nathanhimesh5@gmail.com">nathanhimesh5@gmail.com</a>
          <a href="https://www.linkedin.com/in/nathan-himesh-652171250/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/kentuckyfb" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>

      <form className="contact-form" onSubmit={sendMessage} noValidate>
        <div className={`contact-field ${errors.name ? 'invalid' : ''}`}>
          <label><span className="sr-only">Name</span><input name="name" type="text" autoComplete="name" placeholder="Name" aria-invalid={Boolean(errors.name)} onInput={() => clearError('name')} /></label>
          {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
        </div>
        <div className={`contact-field ${errors.email ? 'invalid' : ''}`}>
          <label><span className="sr-only">Email</span><input name="email" type="email" autoComplete="email" placeholder="Email" aria-invalid={Boolean(errors.email)} onInput={() => clearError('email')} /></label>
          {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
        </div>
        <div className={`contact-field ${errors.message ? 'invalid' : ''}`}>
          <label><span className="sr-only">Message</span><textarea name="message" rows={5} placeholder="Message" aria-invalid={Boolean(errors.message)} onInput={() => clearError('message')} /></label>
          {errors.message && <span className="field-error" role="alert">{errors.message}</span>}
        </div>
        <button type="submit" aria-label="Send message" title="Send message">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 9.7 14.3M22 2l-7 20-5.3-7.7L2 9l20-7Z" /></svg>
        </button>
      </form>
    </article>
  )
}

function ProjectsOverview() {
  return (
    <article className="projects-overview">
      <header className="empty-state">
        <h1>Projects</h1>
        <p>Selected work and experiments.</p>
      </header>
      <div className="tech-categories">
        {techCategories.map(({ label, color, items }, index) => (
          <section className="tech-category" key={label} style={{ '--category-color': color } as CSSProperties}>
            <svg className="tech-scribble" viewBox="0 0 240 170" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d={techScribbles[index]} /></svg>
            <h2>{label}</h2>
            <div className="tech-grid">
              {items.map(({ name }) => (
                <div className="tech-app" key={name} title={name} aria-label={name}>
                  <div className="tech-app-icon" style={{ color: techColor(name) }}><TechMark name={name} /></div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}

export default function App() {
  const [active, setActive] = useState(0)
  const [previewGroup, setPreviewGroup] = useState<string | null>(null)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const locked = useRef(false)
  const draggingBox = useRef(false)
  const current = pages[active]

  const navigate = useCallback((next: number) => {
    const target = Math.max(0, Math.min(pages.length - 1, next))
    if (target === active || locked.current) return
    locked.current = true
    setPreviewGroup(null)
    setActive(target)
    window.setTimeout(() => { locked.current = false }, TRANSITION_MS)
  }, [active])

  const navigateTo = (id: string) => navigate(pages.findIndex((page) => page.id === id))

  const moveActiveBox = (_event: MouseEvent | TouchEvent | PointerEvent, info: { point: { x: number; y: number } }) => {
    draggingBox.current = false
    setHoveredNav(null)
    const nav = document.querySelector<HTMLElement>('.explorer')
    if (!nav) return

    const navRect = nav.getBoundingClientRect()
    const margin = 28
    if (
      info.point.x < navRect.left - margin || info.point.x > navRect.right + margin ||
      info.point.y < navRect.top - margin || info.point.y > navRect.bottom + margin
    ) return

    const target = [...nav.querySelectorAll<HTMLElement>('[data-nav-page]')]
      .filter((item) => item.offsetParent !== null)
      .map((item) => {
        const rect = item.getBoundingClientRect()
        const dx = Math.max(rect.left - info.point.x, 0, info.point.x - rect.right)
        const dy = Math.max(rect.top - info.point.y, 0, info.point.y - rect.bottom)
        return { id: item.dataset.navPage, distance: Math.hypot(dx, dy) }
      })
      .sort((a, b) => a.distance - b.distance)[0]

    if (target?.id && target.distance <= margin) navigateTo(target.id)
  }

  const previewNav = (event: ReactPointerEvent<HTMLElement>) => {
    if (draggingBox.current || event.pointerType === 'touch') return
    const target = (event.target as HTMLElement).closest<HTMLElement>('[data-nav-key]')
    setHoveredNav(target?.dataset.navKey ?? null)
  }

  const renderActiveBox = (key: string, level: 'home' | 'main' | 'child') => (
    (hoveredNav ?? current.id) === key && (
      <motion.span
        className={`nav-active-box nav-active-box-${level}`}
        layoutId="nav-active-box"
        drag
        dragMomentum={false}
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 720, bounceDamping: 28 }}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: .96 }}
        whileDrag={{ scale: 1.06, rotate: -.7 }}
        onDragStart={() => { draggingBox.current = true }}
        onDragEnd={moveActiveBox}
        transition={{
          layout: { type: 'spring', stiffness: 620, damping: 34, mass: .62 },
          scale: { type: 'spring', stiffness: 720, damping: 30 },
          rotate: { type: 'spring', stiffness: 650, damping: 28 },
        }}
        aria-hidden="true"
      />
    )
  )

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const direction = Math.sign(event.deltaY)
      const nested = (event.target as HTMLElement).closest<HTMLElement>('[data-scroll-region]')
      if (nested) {
        const canScrollDown = nested.scrollTop + nested.clientHeight < nested.scrollHeight - 2
        const canScrollUp = nested.scrollTop > 2
        if ((direction > 0 && canScrollDown) || (direction < 0 && canScrollUp)) return
      }
      event.preventDefault()
      if (Math.abs(event.deltaY) > 24) navigate(active + direction)
    }

    const onKey = (event: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(event.key)) navigate(active + 1)
      if (['ArrowUp', 'PageUp'].includes(event.key)) navigate(active - 1)
      if (event.key === 'Home') navigate(0)
      if (event.key === 'End') navigate(pages.length - 1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [active, navigate])

  return (
    <main className="canvas">
      <div className="paper-noise" aria-hidden="true" />

      <nav
        className="explorer"
        aria-label="Portfolio navigation"
        data-scroll-region
        onPointerMove={previewNav}
        onPointerLeave={() => { if (!draggingBox.current) setHoveredNav(null) }}
      >
        <button className="avatar-button" data-nav-key="home" data-nav-page="home" onClick={() => navigate(0)} aria-label="Home">
          <img src={avatar} alt="" />
          {renderActiveBox('home', 'home')}
        </button>

        <div className="tree-branches">
          {groups.map((group) => {
            const selected = current.group === group.id
            const open = previewGroup ? previewGroup === group.id : selected
            const navKey = group.timeline ? `group-${group.id}` : group.id
            return (
              <div className={`branch ${selected ? 'selected' : ''}`} key={group.id}>
                <button
                  className="branch-label"
                  data-nav-key={navKey}
                  data-nav-page={group.timeline ? group.children?.[0]?.id : group.id}
                  onClick={() => group.timeline
                    ? setPreviewGroup((id) => id === group.id ? null : group.id)
                    : navigateTo(group.id)}
                  aria-current={current.id === group.id ? 'page' : undefined}
                  aria-expanded={group.timeline ? open : undefined}
                >
                  <span className="nav-label-text">
                    {group.label}
                    {renderActiveBox(navKey, 'main')}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && group.children && group.children.length > 0 && (
                    <motion.div
                      className="subtree"
                      initial={{ height: 0, opacity: 0, x: -5 }}
                      animate={{ height: 'auto', opacity: 1, x: 0 }}
                      exit={{ height: 0, opacity: 0, x: -5 }}
                      transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {group.children.map((child) => (
                        <button
                          key={child.id}
                          className={current.id === child.id ? 'active' : ''}
                          data-nav-key={child.id}
                          data-nav-page={child.id}
                          onClick={() => navigateTo(child.id)}
                          aria-current={current.id === child.id ? 'page' : undefined}
                        >
                          <span className="nav-label-text">
                            {child.label}
                            {renderActiveBox(child.id, 'child')}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </nav>

      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={current.id}
          className={`stage stage-${current.kind} ${current.id === 'projects' ? 'stage-projects' : ''}`}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: .56, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
        >
          {current.kind === 'home' && (
            <div className="welcome">
              <motion.p className="handwritten write-in" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0)' }} transition={{ duration: 1.05, delay: .16 }}>
                Hi, welcome in.
              </motion.p>
              <motion.div className="drawn-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .7, delay: .85 }} />
            </div>
          )}

          {current.id === 'projects' && <ProjectsOverview />}

          {(current.kind === 'main' || current.kind === 'sub') && !['contact', 'projects'].includes(current.id) && (
            <div className="empty-state">
              <h1>{current.label}</h1>
              {current.note && <p>{current.note}</p>}
            </div>
          )}

          {current.kind === 'project' && current.project && <ProjectPage project={current.project} />}
          {current.kind === 'career' && current.career && <CareerPage entry={current.career} />}
          {current.kind === 'education' && current.education && <EducationPage entry={current.education} />}
          {current.id === 'contact' && <ContactPage />}
        </motion.section>
      </AnimatePresence>
    </main>
  )
}
