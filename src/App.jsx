import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  Globe2,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Search,
  Send,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

const camps = [
  {
    id: 1,
    type: 'Кэмп',
    tone: 'camp',
    name: 'Mountain Base Camp',
    place: 'Гудаури, Грузия',
    flag: 'GE',
    dates: '12–26 октября',
    price: 'от $890',
    interested: 84,
    image: '/images/gudauri.jpg',
    tags: ['горы', 'workation'],
  },
  {
    id: 2,
    type: 'Ретрит',
    tone: 'retreat',
    name: 'Surf & Code',
    place: 'Ахангарма, Шри-Ланка',
    flag: 'LK',
    dates: '2–16 ноября',
    price: 'от $1 240',
    interested: 61,
    image: '/images/ahangama.jpg',
    tags: ['сёрф', 'deep work'],
  },
  {
    id: 3,
    type: 'Коливинг',
    tone: 'coliving',
    name: 'Nomad House Tbilisi',
    place: 'Тбилиси, Грузия',
    flag: 'GE',
    dates: 'весь ноябрь',
    price: 'от $720',
    interested: 47,
    image: '/images/tbilisi.jpg',
    tags: ['город', 'комьюнити'],
  },
  {
    id: 4,
    type: 'Кэмп',
    tone: 'camp',
    name: 'Atlantic Slowdown',
    place: 'Эрисейра, Португалия',
    flag: 'PT',
    dates: '8–22 декабря',
    price: 'от €980',
    interested: 39,
    image: '/images/ericeira.jpg',
    tags: ['океан', 'slow living'],
  },
]

const avatarSeeds = [
  { name: 'Анна', initials: 'АК' },
  { name: 'Мария', initials: 'МС' },
  { name: 'Дмитрий', initials: 'ДК' },
]

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="NextHop, на главную">
      <span className="logo-mark" aria-hidden="true"><span /></span>
      <span>NextHop</span>
    </a>
  )
}

function Header({ onJoin }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#discover">Исследовать</a>
          <a href="#calendar">Календарь</a>
          <a href="#stories">Истории</a>
          <a href="#opportunities">Возможности</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button mobile-only" onClick={() => setMenuOpen(true)} aria-label="Открыть меню">
            <Menu size={21} />
          </button>
          <button className="button button-small button-dark" onClick={onJoin}>Присоединиться <ArrowUpRight size={15} /></button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <div className="mobile-menu-head"><Logo /><button className="icon-button" onClick={() => setMenuOpen(false)}><X /></button></div>
          <nav>
            {['Исследовать', 'Календарь', 'Истории', 'Возможности'].map((item, index) => (
              <a key={item} href={['#discover', '#calendar', '#stories', '#opportunities'][index]} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{item}<ArrowUpRight />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function AvatarStack({ light = false }) {
  return (
    <div className={`avatar-stack ${light ? 'avatar-stack-light' : ''}`} aria-label="Участники">
      {avatarSeeds.map((person, index) => (
        <span key={person.name} className={`avatar avatar-${index + 1}`} title={person.name} style={{ zIndex: 4 - index }}>{person.initials}</span>
      ))}
      <span className="avatar-overflow">+81</span>
    </div>
  )
}

function CalendarPreview() {
  const [mode, setMode] = useState('calendar')
  const [monthIndex, setMonthIndex] = useState(0)
  const month = monthIndex === 0 ? 'Октябрь 2026' : 'Ноябрь 2026'
  const events = [
    { title: 'Mountain Base', meta: 'Гудаури · 12–26 окт', className: 'event-green', pos: 'event-one' },
    { title: 'Creative Reset', meta: 'Каппадокия · 18–25 окт', className: 'event-coral', pos: 'event-two' },
    { title: 'Nomad House', meta: 'Тбилиси · с 28 окт', className: 'event-blue', pos: 'event-three' },
  ]
  return (
    <div className="calendar-shell" id="calendar">
      <div className="calendar-toolbar">
        <div className="segmented">
          <button className={mode === 'calendar' ? 'active' : ''} onClick={() => setMode('calendar')}>Календарь</button>
          <button className={mode === 'list' ? 'active' : ''} onClick={() => setMode('list')}>Список</button>
        </div>
        <button className="round-search" aria-label="Поиск"><Search size={17} /></button>
      </div>
      {mode === 'calendar' ? (
        <>
          <div className="month-row">
            <button aria-label="Предыдущий месяц" onClick={() => setMonthIndex(0)}><ChevronLeft size={17} /></button>
            <strong>{month}</strong>
            <button aria-label="Следующий месяц" onClick={() => setMonthIndex(1)}><ChevronRight size={17} /></button>
          </div>
          <div className="week-head"><span>пн</span><span>вт</span><span>ср</span><span>чт</span><span>пт</span><span>сб</span><span>вс</span></div>
          <div className="calendar-grid" aria-label={`Календарь за ${month}`}>
            {Array.from({ length: 35 }, (_, index) => <span key={index} className={index < 3 ? 'muted-day' : ''}>{index < 3 ? 28 + index : index - 2}</span>)}
            {events.map(event => (
              <button key={event.title} className={`calendar-event ${event.className} ${event.pos}`}>
                <span>{event.title}</span>
                <small>{event.meta}</small>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="mini-list">
          {camps.slice(0, 3).map((camp, index) => (
            <div className="mini-list-row" key={camp.id}>
              <span className={`date-tile ${camp.tone}`}>{12 + index * 7}<small>окт</small></span>
              <div><strong>{camp.name}</strong><small><MapPin size={12} /> {camp.place}</small></div>
              <ChevronRight size={18} />
            </div>
          ))}
        </div>
      )}
      <div className="floating-attendees">
        <AvatarStack light />
        <div><strong>84 номада</strong><span>уже интересуются</span></div>
      </div>
    </div>
  )
}

function CampCard({ camp, onToast }) {
  const [saved, setSaved] = useState(false)
  return (
    <article className="camp-card">
      <div className="camp-image-wrap">
        <img src={camp.image} alt={`${camp.name}, ${camp.place}`} />
        <span className={`type-pill ${camp.tone}`}>{camp.type}</span>
        <button
          className={`save-button ${saved ? 'saved' : ''}`}
          aria-label={saved ? 'Удалить из избранного' : 'Сохранить в избранное'}
          onClick={() => { setSaved(!saved); onToast(saved ? 'Удалено из вишлиста' : 'Кэмп сохранён в вишлист') }}
        ><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} /></button>
        <div className="camp-date"><CalendarDays size={15} /> {camp.dates}</div>
      </div>
      <div className="camp-body">
        <div className="camp-title-row"><h3>{camp.name}</h3><ArrowUpRight size={19} /></div>
        <p className="camp-place"><MapPin size={15} /> {camp.place}</p>
        <div className="tag-row">{camp.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="camp-footer">
          <div className="mini-avatars"><AvatarStack /></div>
          <span><Users size={15} /> {camp.interested}</span>
          <strong>{camp.price}</strong>
        </div>
      </div>
    </article>
  )
}

function JoinModal({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState('')
  useEffect(() => {
    const close = event => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])
  if (!open) return null
  return (
    <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <div className="join-modal" role="dialog" aria-modal="true" aria-labelledby="join-title">
        <button className="modal-close" onClick={onClose} aria-label="Закрыть"><X /></button>
        <span className="modal-icon"><Send /></span>
        <p className="eyebrow">Прыгаем вместе</p>
        <h2 id="join-title">Первым узнай о новых кэмпах</h2>
        <p>Один короткий дайджест в неделю. Без спама и туристических клише.</p>
        <form onSubmit={event => { event.preventDefault(); onSuccess(); onClose() }}>
          <label htmlFor="join-email">Твой email</label>
          <div className="email-field"><Mail size={18} /><input id="join-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
          <button className="button button-primary button-large" type="submit">Вступить в сообщество <ArrowRight size={18} /></button>
        </form>
        <small>Нажимая кнопку, ты соглашаешься получать письма NextHop.</small>
      </div>
    </div>
  )
}

function Toast({ message }) {
  return <div className={`toast ${message ? 'show' : ''}`}><span><Check size={15} /></span>{message}</div>
}

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState('')
  const showToast = message => {
    setToast(message)
    window.clearTimeout(window.__nextHopToast)
    window.__nextHopToast = window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <>
      <Header onJoin={() => setModalOpen(true)} />
      <main id="top">
        <section className="hero section-grid-bg">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker"><span><Globe2 size={15} /></span>Для русскоязычных номадов по всему миру</div>
              <h1>Твой следующий <em>лагерь</em> уже в календаре.</h1>
              <p className="hero-lead">Находи кэмпы, коливинги и ретриты. Смотри, кто едет. Знакомься до заезда — и не пропускай то, что обычно исчезает в сторис.</p>
              <div className="hero-actions">
                <a className="button button-primary button-large" href="#discover">Смотреть кэмпы <ArrowRight size={18} /></a>
                <a className="text-link" href="#how">Как это работает <span>↓</span></a>
              </div>
              <div className="hero-trust"><AvatarStack /><p><strong>1 200+ номадов</strong><br />уже планируют следующий hop</p></div>
            </div>
            <div className="hero-visual">
              <span className="scribble scribble-one">не пропусти ↗</span>
              <CalendarPreview />
              <span className="shape-dot shape-dot-one" /><span className="shape-dot shape-dot-two" />
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="NextHop в цифрах">
          <div className="container stats-grid">
            <div><strong>180+</strong><span>проверенных мест</span></div>
            <div><strong>34</strong><span>страны в календаре</span></div>
            <div><strong>1.2K</strong><span>номадов в комьюнити</span></div>
            <div><strong>96</strong><span>честных историй</span></div>
          </div>
        </section>

        <section className="section featured" id="discover">
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">Ближайшие заезды</p><h2>Куда можно <em>прыгнуть</em><br />прямо сейчас</h2></div>
              <a href="#calendar" className="arrow-link">Весь календарь <ArrowRight size={17} /></a>
            </div>
            <div className="camp-grid">{camps.map(camp => <CampCard key={camp.id} camp={camp} onToast={showToast} />)}</div>
          </div>
        </section>

        <section className="section how-section" id="how">
          <div className="container">
            <div className="center-heading"><p className="eyebrow">Всё просто</p><h2>От «куда бы поехать?»<br />до «увидимся там»</h2></div>
            <div className="steps-grid">
              <article><span className="step-number">01</span><div className="step-icon coral"><Compass /></div><h3>Найди своё</h3><p>Смотри заезды в календаре. Фильтруй по атмосфере, формату, цене и стране.</p></article>
              <article><span className="step-number">02</span><div className="step-icon teal"><Users /></div><h3>Сохрани и знакомься</h3><p>Отметь интерес, загляни в список участников и найди своих ещё до приезда.</p></article>
              <article><span className="step-number">03</span><div className="step-icon butter"><Sparkles /></div><h3>Проживи и расскажи</h3><p>Езжай не только за локацией, но и за людьми. После — поделись честной историей.</p></article>
            </div>
          </div>
        </section>

        <section className="section pillars">
          <div className="container">
            <div className="section-heading narrow"><div><p className="eyebrow">Больше, чем каталог</p><h2>Всё, чего не хватает<br />в Telegram-чатах</h2></div><p>Не ещё один список красивых мест, а живой слой вокруг поездки — до, во время и после.</p></div>
            <div className="pillar-grid">
              <article className="pillar pillar-calendar">
                <div className="pillar-copy"><span>01 / Календарь</span><h3>Сначала даты.<br />Потом — куда.</h3><p>Смотри все заезды на одной временной линии и быстро находи то, что вписывается в жизнь.</p></div>
                <div className="mini-agenda">
                  <header><strong>Октябрь</strong><span>12 событий</span></header>
                  <div><time>12<small>окт</small></time><span className="agenda-line green" /><p><strong>Mountain Base</strong><small>Гудаури · 14 дней</small></p></div>
                  <div><time>18<small>окт</small></time><span className="agenda-line coral" /><p><strong>Creative Reset</strong><small>Каппадокия · 7 дней</small></p></div>
                  <div><time>28<small>окт</small></time><span className="agenda-line blue" /><p><strong>Nomad House</strong><small>Тбилиси · 30 дней</small></p></div>
                </div>
              </article>
              <article className="pillar pillar-people">
                <div className="people-photo"><img src="/images/community.jpg" alt="Участники кэмпа знакомятся у океана" /><span className="photo-note"><Users size={15} /> 26 уже едут</span></div>
                <div className="pillar-copy"><span>02 / Люди</span><h3>Узнай, кто будет рядом.</h3><p>Больше никакого «а вдруг я там один». Знакомься с участниками ещё до первого дня.</p></div>
              </article>
              <article className="pillar pillar-stories" id="stories">
                <div className="story-visual"><img src="/images/story.jpg" alt="Поход в горах Грузии" /><div className="story-card-float"><span>7 минут</span><h4>Как я приехала одна, а уехала с командой</h4><p>Анна К. · Mountain Base</p></div></div>
                <div className="pillar-copy"><span>03 / Истории</span><h3>Без рекламного фильтра.</h3><p>Опыт тех, кто уже съездил: честно о людях, работе, быте и вайбе.</p></div>
              </article>
              <article className="pillar pillar-opps" id="opportunities">
                <div className="pillar-copy"><span>04 / Возможности</span><h3>Не только участник.</h3><p>Коллаборации для блогеров, волонтёрство, вакансии и поиск соорганизаторов — в одном месте.</p></div>
                <div className="opp-stack">
                  <div><span className="opp-type">контент</span><strong>Reels-мейкер на ретрит</strong><p>Surf & Code · проживание включено</p><button>Откликнуться <ArrowUpRight size={14} /></button></div>
                  <div><span className="opp-type blue">волонтёрство</span><strong>Community host</strong><p>Nomad House · Тбилиси</p></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="quote-section">
          <div className="container quote-grid">
            <div className="quote-photo"><img src="/images/portrait.jpg" alt="Мария, участница NextHop" /><span className="verified"><BadgeCheck size={16} /> участница 4 кэмпов</span></div>
            <blockquote>
              <span className="quote-mark">“</span>
              <p>Раньше я узнавала о классных выездах, когда они уже заканчивались. Теперь открываю календарь и сразу понимаю, где хочу быть через месяц.</p>
              <footer><strong>Мария С.</strong><span>продакт-дизайнер · сейчас в Тбилиси</span></footer>
            </blockquote>
          </div>
        </section>

        <section className="final-cta">
          <div className="container cta-panel">
            <div className="cta-copy"><p className="eyebrow light">Следующая история — твоя</p><h2>Куда прыгнем<br />дальше?</h2><p>Присоединяйся к комьюнити и первым узнавай о новых заездах.</p><button className="button button-light button-large" onClick={() => setModalOpen(true)}>Найти свой NextHop <ArrowRight size={18} /></button></div>
            <div className="mascot-wrap"><span className="mascot-note">карта есть.<br />погнали!</span><img src="/images/frog.webp" alt="Лягушка-путешественница NextHop с рюкзаком и картой" /></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-top">
          <div className="footer-brand"><Logo /><p>Находим людей и места,<br />к которым хочется вернуться.</p><div className="socials"><a href="#instagram" aria-label="Instagram"><Instagram /></a><a href="#telegram" aria-label="Telegram"><Send /></a></div></div>
          <div><strong>Исследовать</strong><a href="#discover">Все кэмпы</a><a href="#calendar">Календарь</a><a href="#stories">Истории</a><a href="#opportunities">Возможности</a></div>
          <div><strong>NextHop</strong><a href="#about">О проекте</a><a href="#community">Комьюнити</a><a href="#contact">Связаться</a><a href="#organizers">Для организаторов</a></div>
          <div className="newsletter"><strong>Письмо раз в неделю</strong><p>Новые места и истории без шума.</p><button onClick={() => setModalOpen(true)}>Твой email <ArrowRight size={17} /></button></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 NextHop Club</span><span>Сделано между созвонами и перелётами</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div></div>
      </footer>
      <JoinModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={() => showToast('Добро пожаловать в NextHop!')} />
      <Toast message={toast} />
    </>
  )
}

export default App
