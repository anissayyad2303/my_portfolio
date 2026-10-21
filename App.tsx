import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, AtSign, Award, BookOpen,
  Check, ChevronRight, Code2, Copy, Cpu, Download, ExternalLink, FileText, Github,
  GraduationCap, Layers3, Linkedin, Mail, Menu, MessageCircle, Moon, MousePointer2,
  Network, Rocket, Send, ShieldCheck, Sparkles, Sun, Terminal, X, Zap
} from 'lucide-react'
import { profile, projects, skillGroups } from './data'

type Project = typeof projects[number]
const navItems = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Achievements', 'Contact']

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return <div className="section-heading">
    <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
    <h2>{title}</h2>{text && <p>{text}</p>}
  </div>
}

function ProjectVisual({ kind }: { kind: string }) {
  return <div className={`project-visual visual-${kind}`} aria-hidden="true">
    <div className="visual-grid" />
    {kind === 'ai' && <div className="ai-orbit">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="ai-core"><Sparkles size={35} /></div>
      <span className="orbit-node node-one" /><span className="orbit-node node-two" /><span className="orbit-node node-three" />
      <span className="visual-label label-left">INPUT</span><span className="visual-label label-right">INTELLIGENCE</span>
    </div>}
    {kind === 'dashboard' && <div className="mock-dashboard">
      <div className="mock-top"><i /><i /><i /><span>workspace / overview</span></div>
      <div className="mock-body"><div className="mock-sidebar"><b /><b /><b /><b /></div><div className="mock-content"><div className="mock-title" /><div className="mock-stats"><i /><i /><i /></div><div className="mock-chart"><span /><span /><span /><span /><span /><span /><span /></div><div className="mock-row" /><div className="mock-row short" /></div></div>
    </div>}
    {kind === 'map' && <div className="map-art">
      <div className="map-road road-a" /><div className="map-road road-b" /><div className="map-road road-c" /><div className="map-road road-d" />
      <div className="map-route" /><span className="map-pin pin-a"><span /></span><span className="map-pin pin-b"><span /></span>
      <div className="map-status"><span className="live-dot" /> ROUTE PREVIEW <small>Concept visual</small></div>
    </div>}
    <span className="visual-index">0{projects.findIndex(p => p.visual === kind) + 1} / 03</span>
  </div>
}

function App() {
  const reduceMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [active, setActive] = useState('Home')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [resumeNotice, setResumeNotice] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [formError, setFormError] = useState('')
  const [progress, setProgress] = useState(0)

  const animation = useMemo(() => reduceMotion ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.55 } }, [reduceMotion])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
      let current = 'Home'
      for (const item of navItems) {
        const el = document.getElementById(item.toLowerCase())
        if (el && el.getBoundingClientRect().top <= 150) current = item
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('light-theme', !dark)
    return () => document.body.classList.remove('light-theme')
  }, [dark])

  useEffect(() => {
    if (!selectedProject) return
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedProject(null) }
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', key) }
  }, [selectedProject])

  const scrollTo = (name: string) => {
    setMenuOpen(false)
    document.getElementById(name.toLowerCase())?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }
  const resumeAction = async () => {
    try {
      const res = await fetch(profile.resumePath, { method: 'GET' })
      const contentType = res.headers.get('content-type') || ''
      if (res.ok && contentType.toLowerCase().includes('application/pdf')) window.open(profile.resumePath, '_blank', 'noopener,noreferrer')
      else setResumeNotice(true)
    } catch { setResumeNotice(true) }
  }
  const copyEmail = async () => {
    if (profile.email === 'your.email@example.com') {
      setFormError('Add your professional email in src/data.ts first.')
      scrollTo('contact')
      return
    }
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) }
    catch { window.location.href = `mailto:${profile.email}` }
  }
  const openSocial = (url: string) => { if (url) window.open(url, '_blank', 'noopener,noreferrer') }
  const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setFormError(''); setFormStatus('')
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const subject = String(data.get('subject') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (!name || !email || !subject || !message) { setFormError('Please complete every field.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFormError('Please enter a valid email address.'); return }
    if (profile.email === 'your.email@example.com') { setFormError('Set your real email in src/data.ts before using the contact form.'); return }
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`
    setFormStatus('Your email app will open with this message ready to send. The website does not send or store messages itself.')
    window.location.href = mailto
    e.currentTarget.reset()
  }

  return <div className="site-shell">
    <div className="scroll-progress" style={{ width: `${progress}%` }} />
    <header className="topbar">
      <a href="#home" className="brand" onClick={e => { e.preventDefault(); scrollTo('home') }} aria-label="Ammara Maner home">
        <span className="brand-mark">AM<span>.</span></span><span className="brand-copy">AMMARA MANER<small>COMPUTER ENGINEERING</small></span>
      </a>
      <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        {navItems.map(item => <a key={item} className={active === item ? 'active' : ''} href={`#${item.toLowerCase()}`} onClick={e => { e.preventDefault(); scrollTo(item) }}>{item}</a>)}
        <button className="mobile-talk" onClick={() => scrollTo('contact')}>Let's talk <ArrowUpRight size={16} /></button>
      </nav>
      <div className="nav-actions">
        <button className="icon-button theme-toggle" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
        <button className="talk-button" onClick={() => scrollTo('contact')}>Let's talk <ArrowUpRight size={16} /></button>
        <button className="icon-button menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>

    <main>
      <section id="home" className="hero section-wrap">
        <div className="hero-glow glow-a" /><div className="hero-glow glow-b" />
        <motion.div className="hero-copy" {...animation}>
          <div className="hero-kicker"><span className="status-pulse" /> COMPUTER ENGINEERING · BUILDING IN PUBLIC</div>
          <h1>Hi, I'm <span className="gradient-text">Ammara.</span><br />I build ideas into<br /><span className="outline-text">real solutions.</span></h1>
          <p className="hero-subtitle">Computer Engineering Student <span>·</span> Aspiring Software Developer <span>·</span> AI Enthusiast</p>
          <p className="hero-description">Curious about how technology works—and driven to turn that curiosity into useful software, intelligent tools, and practical experiences.</p>
          <div className="hero-cta">
            <button className="button button-primary" onClick={() => scrollTo('projects')}>Explore projects <ArrowUpRight size={17} /></button>
            <button className="button button-secondary" onClick={() => scrollTo('contact')}>Let's connect <MessageCircle size={17} /></button>
          </div>
          <div className="hero-footnote"><span><ShieldCheck size={15} /> Learning by building</span><span className="footnote-divider" /><span>Based in Maharashtra, India</span></div>
        </motion.div>
        <motion.div className="hero-art-wrap" {...(reduceMotion ? {} : { initial: { opacity: 0, scale: .94 }, animate: { opacity: 1, scale: 1 }, transition: { duration: .8, delay: .12 } })}>
          <div className="art-top-label"><span className="tiny-square" /> DIGITAL WORKSPACE <span className="art-top-line" /></div>
          <div className="hero-art">
            <div className="art-ring ring-outer" /><div className="art-ring ring-mid" /><div className="art-ring ring-inner" />
            <div className="art-cross cross-one" /><div className="art-cross cross-two" />
            <div className="code-window">
              <div className="window-head"><div className="window-dots"><i /><i /><i /></div><span>ammara.dev / curiosity.ts</span><Code2 size={14} /></div>
              <div className="code-lines">
                <div><b>01</b><span className="code-purple">const</span> <span className="code-blue">developer</span> = {'{'}</div>
                <div><b>02</b>&nbsp;&nbsp;name: <span className="code-green">'Ammara'</span>,</div>
                <div><b>03</b>&nbsp;&nbsp;mindset: <span className="code-green">'keep learning'</span>,</div>
                <div><b>04</b>&nbsp;&nbsp;interests: [</div>
                <div><b>05</b>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">'software'</span>,</div>
                <div><b>06</b>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">'AI'</span>, <span className="code-green">'automation'</span></div>
                <div><b>07</b>&nbsp;&nbsp;]</div>
                <div><b>08</b>{'}'}<span className="cursor-blink">▍</span></div>
              </div>
              <div className="window-foot"><span><span className="live-dot" /> All systems curious</span><span>UTF-8</span></div>
            </div>
            <div className="floating-chip chip-ai"><span className="chip-icon purple"><Sparkles size={16} /></span><span>AI & automation<small>Exploring possibilities</small></span></div>
            <div className="floating-chip chip-code"><span className="chip-icon cyan"><Terminal size={16} /></span><span>Build · Learn · Repeat<small>One project at a time</small></span></div>
            <div className="art-center-dot" />
          </div>
          <div className="art-bottom-label"><span>IDEAS → ITERATION → IMPACT</span><span>FIG. 01</span></div>
        </motion.div>
        <button className="scroll-cue" onClick={() => scrollTo('about')}><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></button>
      </section>

      <section id="about" className="section-wrap section-block">
        <SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Curiosity is my <span className="gradient-text">starting point.</span></>} text="I'm learning the craft of building thoughtful technology—one concept, one experiment, and one project at a time." />
        <div className="about-grid">
          <motion.div className="about-story glass-card" {...animation}>
            <div className="card-orb" /><span className="card-overline">01 / THE STORY</span>
            <h3>From learning fundamentals<br />to building what matters.</h3>
            <p>I'm a Computer Engineering student at Sharad Institute of Technology, Polytechnic, Yadrav. I'm interested in programming, software development, artificial intelligence, and automation—and in how they can solve everyday problems.</p>
            <p>Through personal and academic projects, I'm working to strengthen my fundamentals, learn from challenges, and turn ideas into practical applications. My long-term goal is to grow into a skilled software developer and AI engineer.</p>
            <div className="story-signoff"><span className="signoff-line" />Always learning. Always building.</div>
          </motion.div>
          <div className="about-facts">
            {[
              { icon: GraduationCap, title: 'Education', value: 'Computer Engineering', detail: 'Sharad Institute of Technology' },
              { icon: Cpu, title: 'Technical interests', value: 'Software · AI · Automation', detail: 'Exploring by building projects' },
              { icon: Layers3, title: 'Project mindset', value: 'Practical & iterative', detail: 'Concepts, prototypes, improvements' },
              { icon: Rocket, title: 'Career direction', value: 'Software & AI engineering', detail: 'Building skills for the next step' },
            ].map((fact, i) => <motion.div className="fact-card" key={fact.title} {...animation} transition={{ duration: .4, delay: i * .06 }}>
              <div className="fact-icon"><fact.icon size={19} /></div><div><span>{fact.title}</span><h4>{fact.value}</h4><p>{fact.detail}</p></div><ArrowUpRight className="fact-arrow" size={16} />
            </motion.div>)}
          </div>
        </div>
      </section>

      <section id="skills" className="section-wrap section-block">
        <SectionHeading eyebrow="MY TOOLKIT" title={<>Skills I'm <span className="gradient-text">developing.</span></>} text="A flexible snapshot of technologies and areas I'm learning. The list is intentionally editable—keep only the skills you can confidently discuss." />
        <div className="skills-grid">{skillGroups.map((group, i) => {
          const Icon = [Code2, Layers3, Sparkles, Terminal][i]
          return <motion.article className="skill-card glass-card" key={group.title} {...animation}>
            <div className="skill-card-head"><span className={`skill-icon skill-icon-${i}`}><Icon size={20} /></span><span className="skill-number">0{i + 1}</span></div>
            <h3>{group.title}</h3><p>{group.description}</p>
            <div className="skill-pills">{group.skills.map(skill => <span key={skill} className="skill-pill">{skill}</span>)}</div>
          </motion.article>
        })}</div>
        <div className="skills-note"><Sparkles size={16} /><p><strong>Honest by design.</strong> These are suggested editable entries, not verified proficiency claims. Update <code>src/data.ts</code> to match your current experience.</p></div>
      </section>

      <section id="projects" className="section-wrap section-block projects-section">
        <SectionHeading eyebrow="SELECTED WORK" title={<>Ideas in <span className="gradient-text">progress.</span></>} text="A few projects and concepts that reflect the problems I want to explore. Status labels distinguish work in progress from proposed ideas." />
        <div className="projects-list">{projects.map((project, i) => <motion.article className={`project-card project-card-${i}`} key={project.id} {...animation}>
          <ProjectVisual kind={project.visual} />
          <div className="project-info">
            <div className="project-meta"><span>{project.category}</span><span className={`project-status status-${project.status.toLowerCase().replace(/ /g, '-')}`}><i />{project.status}</span></div>
            <h3>{project.title}</h3><p>{project.description}</p>
            <div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="project-actions"><button className="text-button" onClick={() => setSelectedProject(project)}>Project details <ArrowUpRight size={16} /></button>
              {project.repoUrl ? <button className="project-link" onClick={() => openSocial(project.repoUrl)} aria-label={`Open ${project.title} repository`}><Github size={17} /></button> : <span className="link-unavailable">Repository not linked yet</span>}
            </div>
          </div>
        </motion.article>)}</div>
        <div className="project-disclaimer"><ShieldCheck size={16} /><span>Project status is shown transparently. Planned features are not presented as live or production-ready functionality.</span></div>
      </section>

      <section id="education" className="section-wrap section-block">
        <SectionHeading eyebrow="THE FOUNDATION" title={<>Learning with <span className="gradient-text">purpose.</span></>} text="My academic background and the fundamentals I'm building on." />
        <div className="education-layout">
          <div className="timeline">
            <motion.div className="timeline-item" {...animation}><div className="timeline-marker"><GraduationCap size={19} /></div><div className="timeline-content glass-card"><div className="timeline-top"><span className="timeline-tag">CURRENT EDUCATION</span><span className="timeline-year">Academic year: <em>add year</em></span></div><h3>Computer Engineering</h3><h4>Sharad Institute of Technology, Polytechnic</h4><p>Yadrav, Maharashtra, India</p><div className="timeline-details"><span><BookOpen size={15} /> Diploma / course details: confirm and edit</span><span><Layers3 size={15} /> Relevant subjects: add subjects</span></div></div></motion.div>
            <motion.div className="timeline-item" {...animation}><div className="timeline-marker marker-muted"><Award size={18} /></div><div className="timeline-content glass-card"><div className="timeline-top"><span className="timeline-tag">PREVIOUS EDUCATION</span><span className="timeline-year">Year: <em>add year</em></span></div><h3>10th Standard</h3><h4>Secondary School Education</h4><p>Academic score: <strong className="score-highlight">87%</strong></p><div className="timeline-details"><span><Check size={15} /> Score supplied for this portfolio</span></div></div></motion.div>
          </div>
          <aside className="education-aside glass-card"><div className="aside-icon"><BookOpen size={23} /></div><span className="card-overline">BEYOND THE CLASSROOM</span><h3>Learning doesn't stop at the syllabus.</h3><p>Personal projects are a way to practice problem-solving, explore unfamiliar tools, and learn how individual pieces of technology fit together.</p><div className="aside-divider" /><div className="aside-stat"><span>Next milestone</span><strong>Keep building</strong></div><div className="aside-stat"><span>Graduation year</span><strong className="editable-text">{profile.graduationYear}</strong></div></aside>
        </div>
      </section>

      <section id="achievements" className="section-wrap section-block">
        <SectionHeading eyebrow="PROGRESS OVER PERFECTION" title={<>Small steps. <span className="gradient-text">Real growth.</span></>} text="A place to record milestones as they happen—without padding the story with unearned awards or credentials." />
        <motion.div className="achievement-empty glass-card" {...animation}>
          <div className="achievement-graphic"><div className="achievement-ring ring-a" /><div className="achievement-ring ring-b" /><div className="achievement-center"><Award size={28} /></div><span className="sparkle s-a">✳</span><span className="sparkle s-b">✦</span></div>
          <div className="achievement-copy"><span className="card-overline">YOUR NEXT CHAPTER</span><h3>More achievements coming soon.</h3><p>When you complete a course, attend a workshop, earn a certification, or reach a meaningful project milestone, add it here with the real date and details.</p><button className="text-button" onClick={() => scrollTo('contact')}>Let's talk about learning <ArrowRight size={16} /></button></div>
        </motion.div>
      </section>

      <section className="resume-band section-wrap" aria-label="Resume">
        <div className="resume-decoration"><div className="resume-doc"><div className="resume-doc-mark">AS</div><span /><span /><span /><i /></div><div className="resume-orbit" /></div>
        <div className="resume-copy"><span className="eyebrow"><span className="eyebrow-dot" /> RESUME & BACKGROUND</span><h2>A clearer view of<br /><span className="gradient-text">my journey.</span></h2><p>My resume will bring my education, skills, and project work together in one place. Add your real PDF to make it available here.</p><div className="resume-actions"><button className="button button-primary" onClick={resumeAction}><Download size={17} /> Download resume</button><button className="button button-secondary" onClick={resumeAction}><FileText size={17} /> View resume</button></div><span className="resume-hint"><ShieldCheck size={14} /> No placeholder document is served as a real resume.</span></div>
      </section>

      <section id="contact" className="section-wrap section-block contact-section">
        <SectionHeading eyebrow="START A CONVERSATION" title={<>Have an idea or opportunity?<br /><span className="gradient-text">Let's connect.</span></>} text="Have a project idea, internship opportunity, or advice to share? I'd be glad to hear from you." />
        <div className="contact-grid">
          <div className="contact-left">
            <div className="contact-intro"><span className="contact-icon"><AtSign size={22} /></span><div><h3>Let's make something useful.</h3><p>Good conversations can lead to great learning and collaboration.</p></div></div>
            <button className="contact-detail" onClick={copyEmail}><span className="contact-detail-icon"><Mail size={18} /></span><span><small>EMAIL</small><strong>{profile.email === 'your.email@example.com' ? 'Add your email in src/data.ts' : profile.email}</strong></span>{copied ? <Check size={17} /> : <Copy size={16} />}</button>
            <button className="contact-detail" onClick={() => openSocial(profile.github)} disabled={!profile.github}><span className="contact-detail-icon"><Github size={18} /></span><span><small>GITHUB</small><strong>{profile.github ? 'Visit GitHub profile' : 'Profile link not added yet'}</strong></span><ArrowUpRight size={16} /></button>
            <button className="contact-detail" onClick={() => openSocial(profile.linkedin)} disabled={!profile.linkedin}><span className="contact-detail-icon"><Linkedin size={18} /></span><span><small>LINKEDIN</small><strong>{profile.linkedin ? 'Visit LinkedIn profile' : 'Profile link not added yet'}</strong></span><ArrowUpRight size={16} /></button>
            <div className="contact-note"><span className="note-icon"><MousePointer2 size={16} /></span><p>Prefer a direct message? Fill in the form and your email app will open with the details ready to send.</p></div>
          </div>
          <form className="contact-form glass-card" onSubmit={sendForm} noValidate>
            <div className="form-head"><div><span className="card-overline">CONTACT FORM</span><h3>Send a message</h3></div><span className="form-secure"><ShieldCheck size={15} /> Validated</span></div>
            <div className="form-row"><label>Your name<input name="name" type="text" placeholder="e.g. Alex Morgan" autoComplete="name" required /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label></div>
            <label>Subject<input name="subject" type="text" placeholder="What would you like to discuss?" required /></label>
            <label>Message<textarea name="message" rows={4} placeholder="Tell me a little about it..." required /></label>
            {formError && <p className="form-message form-error" role="alert">{formError}</p>}
            {formStatus && <p className="form-message form-success" role="status">{formStatus}</p>}
            <button type="submit" className="button button-primary submit-button">Prepare message <Send size={16} /></button>
            <p className="form-privacy">This static portfolio doesn't store your form data or send it to a server.</p>
          </form>
        </div>
      </section>
      <section className="closing-cta section-wrap"><div><span className="eyebrow"><span className="eyebrow-dot" /> UNTIL THE NEXT BUILD</span><h2>Keep the curiosity.<br /><span className="gradient-text">Ship the learning.</span></h2></div><button className="round-cta" onClick={() => scrollTo('home')} aria-label="Back to top"><ArrowUpRight size={26} /></button></section>
    </main>

    <footer className="footer section-wrap">
      <div className="footer-main"><a href="#home" className="brand" onClick={e => { e.preventDefault(); scrollTo('home') }}><span className="brand-mark">AM<span>.</span></span><span className="brand-copy">AMMARA MANER<small>COMPUTER ENGINEERING</small></span></a><p>Building tomorrow's skills, one curious experiment at a time.</p><div className="footer-socials"><button onClick={() => openSocial(profile.github)} disabled={!profile.github} aria-label="GitHub"><Github size={17} /></button><button onClick={() => openSocial(profile.linkedin)} disabled={!profile.linkedin} aria-label="LinkedIn"><Linkedin size={17} /></button><button onClick={() => { if (profile.email !== 'your.email@example.com') window.location.href = `mailto:${profile.email}`; else { setFormError('Add your professional email in src/data.ts first.'); scrollTo('contact') } }} aria-label="Email"><Mail size={17} /></button></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Ammara Maner. All rights reserved.</span><span>Designed and developed with curiosity, creativity, and code.</span><button onClick={() => scrollTo('home')}>Back to top ↑</button></div>
    </footer>

    <AnimatePresence>{selectedProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => { if (e.target === e.currentTarget) setSelectedProject(null) }}>
      <motion.div className="project-modal glass-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={reduceMotion ? {} : { opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? {} : { opacity: 0, y: 16, scale: .98 }} transition={{ duration: .22 }}>
        <div className="modal-header"><span className="eyebrow"><span className="eyebrow-dot" /> PROJECT NOTES</span><button className="icon-button" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={20} /></button></div>
        <ProjectVisual kind={selectedProject.visual} /><div className="modal-content"><div className="project-meta"><span>{selectedProject.category}</span><span className="project-status"><i />{selectedProject.status}</span></div><h2 id="modal-title">{selectedProject.title}</h2><p className="modal-overview">{selectedProject.overview}</p>
          <h3>Planned / explored features</h3><ul className="feature-list">{selectedProject.features.map(f => <li key={f}><Check size={15} />{f}</li>)}</ul>
          <h3>Technology stack</h3><div className="project-tags">{selectedProject.stack.map(t => <span key={t}>{t}</span>)}</div>
          <div className="modal-detail-grid"><div><h4>Challenge</h4><p>{selectedProject.challenge}</p></div><div><h4>Next improvements</h4><p>{selectedProject.future}</p></div></div>
          <div className="modal-footer"><span><ShieldCheck size={15} /> Status: {selectedProject.status}</span>{selectedProject.repoUrl ? <button className="button button-primary" onClick={() => openSocial(selectedProject.repoUrl)}>Open repository <ExternalLink size={15} /></button> : <span className="link-unavailable">Repository link not configured</span>}</div>
        </div>
      </motion.div>
    </motion.div>}</AnimatePresence>
    {resumeNotice && <div className="notice-backdrop" role="presentation" onClick={() => setResumeNotice(false)}><div className="resume-notice glass-card" role="dialog" aria-modal="true" aria-labelledby="resume-notice-title" onClick={e => e.stopPropagation()}><button className="notice-close icon-button" onClick={() => setResumeNotice(false)} aria-label="Close"><X size={18} /></button><span className="notice-icon"><FileText size={24} /></span><h3 id="resume-notice-title">Resume PDF not added yet</h3><p>To enable these buttons, place your actual resume PDF at <code>public/resume.pdf</code>. Then refresh the site. No fake document is downloaded.</p><button className="button button-primary" onClick={() => setResumeNotice(false)}>Got it <Check size={16} /></button></div></div>}
    <button className="back-top" aria-label="Back to top" onClick={() => scrollTo('home')} style={{ opacity: progress > 10 ? 1 : 0, pointerEvents: progress > 10 ? 'auto' : 'none' }}><ArrowUpRight size={19} /></button>
  </div>
}

export default App
