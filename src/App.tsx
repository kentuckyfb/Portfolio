import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import {
  siCss,
  siAxios,
  siExpress,
  siFirebase,
  siGithub,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPwa,
  siPython,
  siReact,
  siRedux,
  siSharp,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siUnity,
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
  { id: 'stack', label: 'Tech stacks', note: 'Tools I have used.' },
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

const techIcons: Record<string, SimpleIcon> = {
  CSS: siCss,
  HTML: siHtml5,
  JavaScript: siJavascript,
  Axios: siAxios,
  'C#': siSharp,
  Express: siExpress,
  Firebase: siFirebase,
  'Gemini API': siGooglegemini,
  'Next.js': siNextdotjs,
  'Node.js': siNodedotjs,
  PWA: siPwa,
  Python: siPython,
  React: siReact,
  Redux: siRedux,
  Supabase: siSupabase,
  'Tailwind CSS': siTailwindcss,
  TypeScript: siTypescript,
  Vercel: siVercel,
  Vite: siVite,
  Unity: siUnity,
  MongoDB: siMongodb,
}

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return <svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path d={icon.path} /></svg>
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
              {techIcons[item] ? <BrandIcon icon={techIcons[item]} /> : <span className="tech-fallback">{item.slice(0, 2)}</span>}
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
  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`)
    const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('email')}`)
    window.location.href = `mailto:nathanhimesh5@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <article className="contact-page">
      <section className="contact-intro">
        <p className="section-kicker">Contact</p>
        <h1>Get in touch</h1>
        <p>Have a project, an idea, or just want to say hi?</p>
        <div className="contact-details">
          <a href="mailto:nathanhimesh5@gmail.com">nathanhimesh5@gmail.com</a>
          <a href="https://www.linkedin.com/in/nathan-himesh-652171250/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/kentuckyfb" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>

      <form className="contact-form" onSubmit={sendMessage}>
        <label>Name<input name="name" type="text" autoComplete="name" required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Message<textarea name="message" rows={5} required /></label>
        <button type="submit">Send message</button>
      </form>
    </article>
  )
}

export default function App() {
  const [active, setActive] = useState(0)
  const [previewGroup, setPreviewGroup] = useState<string | null>(null)
  const locked = useRef(false)
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

      <nav className="explorer" aria-label="Portfolio navigation" data-scroll-region>
        <button className="avatar-button" onClick={() => navigate(0)} aria-label="Home">
          <img src={avatar} alt="" />
        </button>

        <div className="tree-branches">
          {groups.map((group) => {
            const selected = current.group === group.id
            const open = previewGroup ? previewGroup === group.id : selected
            return (
              <div className={`branch ${selected ? 'selected' : ''}`} key={group.id}>
                <button
                  className="branch-label"
                  onClick={() => group.timeline
                    ? setPreviewGroup((id) => id === group.id ? null : group.id)
                    : navigateTo(group.id)}
                  aria-current={current.id === group.id ? 'page' : undefined}
                  aria-expanded={group.timeline ? open : undefined}
                >
                  {group.label}
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
                          onClick={() => navigateTo(child.id)}
                          aria-current={current.id === child.id ? 'page' : undefined}
                        >
                          {child.label}
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
          className={`stage stage-${current.kind}`}
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

          {(current.kind === 'main' || current.kind === 'sub') && current.id !== 'contact' && (
            <div className="empty-state">
              <p className="section-kicker">{current.kind === 'sub' ? current.group : 'Section'}</p>
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
