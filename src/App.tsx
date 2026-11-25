import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react'
import {
  siCss,
  siAxios,
  siAndroid,
  siBaseui,
  siCapacitor,
  siChartdotjs,
  siCplusplus,
  siCloudflare,
  siCloudflareworkers,
  siDocker,
  siDrizzle,
  siExpress,
  siElectron,
  siFirebase,
  siFlask,
  siFramer,
  siGithub,
  siGit,
  siGooglegemini,
  siHtml5,
  siHuggingface,
  siJavascript,
  siJupyter,
  siJsonwebtokens,
  siKotlin,
  siLeaflet,
  siMongoose,
  siMongodb,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siPandas,
  siPlotly,
  siPostgresql,
  siPwa,
  siPython,
  siPytorch,
  siRadixui,
  siReact,
  siReacthookform,
  siReactquery,
  siReactrouter,
  siRedux,
  siSharp,
  siScikitlearn,
  siScrapy,
  siSpacy,
  siSqlalchemy,
  siSupabase,
  siSwiper,
  siTailwindcss,
  siTauri,
  siTensorflow,
  siTypescript,
  siRust,
  siVercel,
  siVite,
  siUnity,
  siGreensock,
  siGunicorn,
  siWeightsandbiases,
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
    { name: 'Kotlin', icon: siKotlin }, { name: 'Rust', icon: siRust }, { name: 'PowerShell', monogram: 'PS' },
    { name: 'PL/pgSQL', icon: siPostgresql }, { name: 'HTML', icon: siHtml5 }, { name: 'CSS', icon: siCss },
    { name: 'ShaderLab', monogram: 'SH' }, { name: 'HLSL', monogram: 'HL' },
    { name: 'Batch', monogram: 'BAT' }, { name: 'Dockerfile', icon: siDocker },
  ] },
  { label: 'Frontend & interface', color: '#ff82ad', items: [
    { name: 'React', icon: siReact }, { name: 'Next.js', icon: siNextdotjs }, { name: 'Vite', icon: siVite },
    { name: 'Tailwind CSS', icon: siTailwindcss }, { name: 'Material UI', icon: siMui }, { name: 'Radix UI', icon: siRadixui },
    { name: 'Base UI', icon: siBaseui }, { name: 'Redux', icon: siRedux }, { name: 'TanStack Query', icon: siReactquery },
    { name: 'React Router', icon: siReactrouter }, { name: 'React Hook Form', icon: siReacthookform },
    { name: 'Framer Motion', icon: siFramer }, { name: 'GSAP', icon: siGreensock },
    { name: 'Chart.js', icon: siChartdotjs }, { name: 'Recharts', icon: siChartdotjs },
    { name: 'React Flow', monogram: 'RF' }, { name: 'Leaflet', icon: siLeaflet }, { name: 'Swiper', icon: siSwiper },
    { name: 'Fabric.js', monogram: 'FB' }, { name: 'Embla Carousel', monogram: 'EC' },
    { name: 'Howler', monogram: 'HW' }, { name: 'Axios', icon: siAxios }, { name: 'Zod', icon: siZod },
  ] },
  { label: 'Backend & APIs', color: '#69aefc', items: [
    { name: 'Node.js', icon: siNodedotjs }, { name: 'Express', icon: siExpress }, { name: 'Flask', icon: siFlask },
    { name: 'SQLAlchemy', icon: siSqlalchemy }, { name: 'Mongoose', icon: siMongoose },
    { name: 'JWT', icon: siJsonwebtokens }, { name: 'bcrypt', monogram: 'BC' }, { name: 'Helmet', monogram: 'HM' },
    { name: 'Nodemailer', monogram: 'NM' }, { name: 'Multer', monogram: 'MU' }, { name: 'Gunicorn', icon: siGunicorn },
    { name: 'Gemini API', icon: siGooglegemini }, { name: 'GitHub API', icon: siGithub },
    { name: 'OpenAI API', monogram: 'AI' }, { name: 'Web Audio API', monogram: 'WA' },
    { name: 'NHTSA API', monogram: 'NH' }, { name: 'PokeAPI', monogram: 'PO' },
    { name: 'EmailJS', monogram: 'EM' }, { name: 'NanoHTTPD', monogram: 'NH' },
  ] },
  { label: 'Databases & realtime', color: '#6fcd91', items: [
    { name: 'Supabase', icon: siSupabase }, { name: 'Firebase', icon: siFirebase },
    { name: 'MongoDB', icon: siMongodb }, { name: 'PostgreSQL', icon: siPostgresql },
    { name: 'Drizzle ORM', icon: siDrizzle }, { name: 'Ably Realtime', monogram: 'AB' },
    { name: 'Cloudflare D1', icon: siCloudflare },
  ] },
  { label: 'Data & AI', color: '#b58cf3', items: [
    { name: 'Jupyter', icon: siJupyter }, { name: 'TensorFlow', icon: siTensorflow }, { name: 'PyTorch', icon: siPytorch },
    { name: 'scikit-learn', icon: siScikitlearn }, { name: 'Hugging Face', icon: siHuggingface },
    { name: 'Transformers', icon: siHuggingface }, { name: 'Pandas', icon: siPandas }, { name: 'NumPy', icon: siNumpy },
    { name: 'Plotly', icon: siPlotly }, { name: 'spaCy', icon: siSpacy }, { name: 'FAISS', monogram: 'FA' },
    { name: 'Sentence Transformers', icon: siHuggingface }, { name: 'KeyBERT', monogram: 'KB' },
    { name: 'Weights & Biases', icon: siWeightsandbiases }, { name: 'Beautiful Soup', monogram: 'BS' },
    { name: 'NLP', monogram: 'NLP' }, { name: 'TF-IDF', monogram: 'TF' }, { name: 'AI image analysis', icon: siTensorflow },
  ] },
  { label: 'Apps & platforms', color: '#ff9d66', items: [
    { name: 'Unity', icon: siUnity }, { name: 'Android', icon: siAndroid }, { name: 'CameraX', monogram: 'CX' },
    { name: 'Capacitor', icon: siCapacitor }, { name: 'Electron', icon: siElectron }, { name: 'Tauri', icon: siTauri },
    { name: 'Chrome extensions', monogram: 'CE' }, { name: 'PDF.js', monogram: 'PDF' },
    { name: 'SheetJS / XLSX', monogram: 'XL' }, { name: 'Cloudflare Workers', icon: siCloudflareworkers },
    { name: 'Vinext', monogram: 'VX' },
  ] },
  { label: 'Hosting & source control', color: '#ff7164', items: [
    { name: 'Vercel', icon: siVercel }, { name: 'Git', icon: siGit }, { name: 'GitHub', icon: siGithub },
    { name: 'Cloudflare', icon: siCloudflare }, { name: 'Docker', icon: siDocker },
    { name: 'Wrangler', icon: siCloudflare }, { name: 'Gunicorn hosting', icon: siGunicorn },
  ] },
  { label: 'Methods & standards', color: '#61cbd2', items: [
    { name: 'PWA', icon: siPwa }, { name: 'OAuth', monogram: 'OA' }, { name: 'Web crawling', icon: siScrapy },
    { name: 'Offline-first', monogram: 'OF' }, { name: 'Responsive design', monogram: 'RD' },
    { name: 'REST APIs', monogram: 'API' }, { name: 'Real-time systems', monogram: 'RT' },
    { name: 'Cache-first', monogram: 'CF' }, { name: 'JWT authentication', icon: siJsonwebtokens },
    { name: 'Rate limiting', monogram: 'RL' }, { name: 'Sorting algorithms', monogram: 'SA' },
    { name: 'Recursion', monogram: 'RE' }, { name: 'Web performance', monogram: 'WP' },
    { name: 'PDF extraction', monogram: 'PX' }, { name: 'Data visualization', icon: siPlotly },
  ] },
]

const techLibrary = techCategories.flatMap(({ items }) => items)
const techByName = new Map(techLibrary.map((tech) => [tech.name, tech]))
const TECH_TILE_WIDTH = 960
const TECH_TILE_HEIGHT = 576
const techTileCopies = [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2], [1, 2]] as const
const techPlaneItems = Array.from({ length: 128 }, (_, index) => techLibrary[index % techLibrary.length])
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
  const [grouped, setGrouped] = useState(true)
  const plane = useRef<HTMLDivElement | null>(null)
  const planeOffset = useRef({ x: 0, y: 0 })
  const planeTiles = useRef<(HTMLDivElement | null)[]>([])
  const planeIcons = useRef<(HTMLDivElement | null)[]>([])
  const planeDrag = useRef<{ pointerId: number; x: number; y: number; time: number; velocityX: number; velocityY: number } | null>(null)
  const inertiaFrame = useRef<number | null>(null)

  useEffect(() => () => {
    if (inertiaFrame.current !== null) cancelAnimationFrame(inertiaFrame.current)
  }, [])

  const positionPlane = (x: number, y: number) => {
    planeOffset.current = { x, y }
    const wrappedX = ((x % TECH_TILE_WIDTH) + TECH_TILE_WIDTH) % TECH_TILE_WIDTH - TECH_TILE_WIDTH
    const wrappedY = ((y % TECH_TILE_HEIGHT) + TECH_TILE_HEIGHT) % TECH_TILE_HEIGHT - TECH_TILE_HEIGHT
    techTileCopies.forEach(([tileX, tileY], index) => {
      const tile = planeTiles.current[index]
      if (tile) tile.style.transform = `translate3d(${wrappedX + tileX * TECH_TILE_WIDTH}px, ${wrappedY + tileY * TECH_TILE_HEIGHT}px, 0)`

      techPlaneItems.forEach((_, iconIndex) => {
        const icon = planeIcons.current[index * techPlaneItems.length + iconIndex]
        if (!icon || !plane.current) return
        const column = iconIndex % 16
        const row = Math.floor(iconIndex / 16)
        const iconX = wrappedX + tileX * TECH_TILE_WIDTH + column * 60 + 30
        const iconY = wrappedY + tileY * TECH_TILE_HEIGHT + row * 72 + 36
        const distance = Math.min(Math.hypot(
          (iconX - plane.current.clientWidth / 2) / (plane.current.clientWidth * .46),
          (iconY - plane.current.clientHeight / 2) / (plane.current.clientHeight * .44),
        ), 1)
        icon.style.scale = (.52 + Math.pow(1 - distance, 1.45) * .84).toFixed(3)
      })
    })
  }

  useEffect(() => {
    if (grouped) return
    const refresh = () => positionPlane(planeOffset.current.x, planeOffset.current.y)
    const frame = requestAnimationFrame(refresh)
    window.addEventListener('resize', refresh)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', refresh)
    }
  }, [grouped])

  const startPlane = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (inertiaFrame.current !== null) cancelAnimationFrame(inertiaFrame.current)
    inertiaFrame.current = null
    event.currentTarget.setPointerCapture(event.pointerId)
    planeDrag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now(), velocityX: 0, velocityY: 0 }
  }

  const movePlane = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (planeDrag.current?.pointerId !== event.pointerId) return
    const deltaX = event.clientX - planeDrag.current.x
    const deltaY = event.clientY - planeDrag.current.y
    const now = performance.now()
    const elapsed = Math.max(now - planeDrag.current.time, 8)
    planeDrag.current.velocityX = planeDrag.current.velocityX * .62 + deltaX / elapsed * .38
    planeDrag.current.velocityY = planeDrag.current.velocityY * .62 + deltaY / elapsed * .38
    planeDrag.current.x = event.clientX
    planeDrag.current.y = event.clientY
    planeDrag.current.time = now
    positionPlane(planeOffset.current.x + deltaX, planeOffset.current.y + deltaY)
  }

  const stopPlane = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (planeDrag.current?.pointerId !== event.pointerId) return
    let { velocityX, velocityY } = planeDrag.current
    planeDrag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    let previous = performance.now()
    const glide = (now: number) => {
      const elapsed = Math.min(now - previous, 32)
      previous = now
      const friction = Math.pow(.94, elapsed / 16.67)
      velocityX *= friction
      velocityY *= friction
      positionPlane(planeOffset.current.x + velocityX * elapsed, planeOffset.current.y + velocityY * elapsed)
      if (Math.hypot(velocityX, velocityY) > .015) inertiaFrame.current = requestAnimationFrame(glide)
      else inertiaFrame.current = null
    }
    if (Math.hypot(velocityX, velocityY) > .015) inertiaFrame.current = requestAnimationFrame(glide)
  }

  return (
    <article className="projects-overview">
      <header className="empty-state projects-heading">
        <div><h1>Projects</h1><p>Selected work and experiments.</p></div>
        <button className={`library-toggle ${grouped ? 'is-grouped' : ''}`} type="button" aria-pressed={grouped} onClick={() => setGrouped((value) => !value)}>
          <span className="library-toggle-sketch" aria-hidden="true"><i /><i /><i /></span>
          <span>{grouped ? 'grouped' : 'loose'}</span>
        </button>
      </header>
      {grouped ? (
        <div className="tech-categories">
          {techCategories.map(({ label, color, items }) => (
            <section className="tech-category" key={label} style={{ '--category-color': color } as CSSProperties}>
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
      ) : (
        <div className="tech-plane" ref={plane} onPointerDown={startPlane} onPointerMove={movePlane} onPointerUp={stopPlane} onPointerCancel={stopPlane}>
          {techTileCopies.map(([tileX, tileY], tileIndex) => (
            <div className="tech-plane-tile" key={`${tileX}-${tileY}`} ref={(node) => { planeTiles.current[tileIndex] = node }} aria-hidden={tileX !== 1 || tileY !== 1} style={{ transform: `translate3d(${(tileX - 1) * TECH_TILE_WIDTH}px, ${(tileY - 1) * TECH_TILE_HEIGHT}px, 0)` }}>
              {techPlaneItems.map(({ name }, index) => (
                <div className="tech-plane-icon" key={`${name}-${index}`} ref={(node) => { planeIcons.current[tileIndex * techPlaneItems.length + index] = node }} title={name} role="img" aria-label={name} style={{ color: techColor(name) }}><TechMark name={name} /><span>{name}</span></div>
              ))}
            </div>
          ))}
        </div>
      )}
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
