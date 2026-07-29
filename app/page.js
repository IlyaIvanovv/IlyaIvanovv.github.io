import CaseNavigation from './CaseNavigation';
import LanguageSwitcher from './LanguageSwitcher';
import { englishTranslations } from './translations.en';
import { cloneElement, isValidElement } from 'react';

const projects = [
  {
    number: '01', title: 'GRIMPS', type: 'FPS Action-Adventure · PC / Console', role: 'Lead Game Designer · WATT Studio',
    lead: 'Пересобрал концепцию проекта и выстроил единое направление для боя, прогрессии и исследования.',
    points: ['Репивот проекта и новое позиционирование', 'Combat Director для читаемых групповых боёв', 'Голубь-спутник как обучение, нарратор и источник способностей', 'Демоверсия для Steam за 6 месяцев'],
    stats: [['30 мин', 'целевая длительность демо'], ['36+ мин', 'медианное прохождение'], ['4 / 5', 'оценка плейтестов'], ['20k+', 'просмотров ролика IGN']], accent: 'acid', link: 'https://store.steampowered.com/app/3297800/GRIMPS/'
  },
  {
    number: '03', title: 'Zoochosis', type: 'Horror · PC · Unreal Engine 5', role: 'AI / Enemy Designer',
    lead: 'Переработал поведение противников, боевую систему и боссов в рамках пострелизной поддержки.',
    points: ['Боевые паттерны и логика ИИ для пяти боссов', 'Behavior Tree и конечные автоматы состояний', 'Три крупных обновления: хоррор-система, боссы и исправления', 'Работа с отзывами игроков после релиза'],
    stats: [['5', 'переработанных боссов'], ['3', 'крупных обновления'], ['Steam', '«В основном положительные»']], accent: 'ember', link: 'https://store.steampowered.com/app/2458560/Zoochosis/'
  },
  {
    number: '04', title: 'Breathedge: Cosmic Cluck', type: 'FPS Action-Adventure · VR / Oculus Quest · Release', role: 'Lead Game Designer · Сентябрь 2022 — май 2024',
    lead: 'Вёл общее игровое видение проекта на протяжении полного производственного цикла — от правил систем и основы локаций до релиза и поддержки.',
    points: ['Руководил командой из более чем пяти дизайнеров и координировал единое видение продукта', 'Заложил правила игровых и квестовых систем, дизайна уровней, боя и поведения противников', 'Проводил найм, развитие сотрудников, настройку баланса и A/B-тесты', 'Наладил межкомандную коммуникацию и сопровождал выпуск нескольких бесплатных дополнений'],
    stats: [['18 мес.', 'полный цикл производства'], ['5+', 'дизайнеров в команде'], ['Release', 'релиз и поддержка']], accent: 'frost', link: 'https://vk.cc/cvVgOW'
  },
  {
    number: '02', title: 'PIONER', type: 'Action MMORPG · PC · Early Access', role: 'Senior Designer / UX & FTUE · Август — октябрь 2024',
    lead: 'Провёл аудит первого пользовательского опыта и переработал обучение, взаимодействие с миром и постановку боевых эпизодов.',
    points: ['Перестроил темпо-ритм, навигацию и последовательность ввода механик', 'Унифицировал правила взаимодействия с окружением и интерактивными объектами', 'Доработал арены, роли противников, эскалацию угрозы и размещение ресурсов', 'Режиссировал постановочные сцены и сопровождал изменения до повторного тестирования'],
    stats: [['−15%', 'выходов в эпизоде с волками'], ['3 мес.', 'работы над проектом'], ['PC', 'целевая платформа']], accent: 'acid', link: 'https://vk.cc/cttXAA'
  }
];

const capabilities = [
  ['Системный дизайн', 'Связываю бой, прогрессию, исследование и окружение в понятные игроку правила.'],
  ['Боевой дизайн', 'Проектирую риск и награду, состояния противников, боссов и читаемую обратную связь.'],
  ['ИИ и противники', 'Behavior Tree, Blackboard, FSM, роли в группе, паттерны и боевые архетипы.'],
  ['Руководство', 'Формирую видение, декомпозирую задачи и синхронизирую дизайн, код и искусство.'],
  ['Прототипирование', 'Проверяю гипотезы в Unreal Engine и Unity до дорогостоящего производства контента.'],
  ['Путь игрока', 'Разбираю обучение, UX, сложность и удержание через плейтесты и наблюдение.']
];

function MediaPlaceholder({ kind, title, hint, className = '', locale = 'ru' }) {
  return <div className={`media-placeholder ${className}`} role="img" aria-label={locale === 'ru' ? `${title}. Требуется материал: ${hint}` : `${title}. Asset needed: ${hint}`}>
    <span>{kind}</span><strong>{title}</strong><small>{hint}</small>
  </div>;
}

function CaseSummary({ task, action, result, metric, tone = 'acid', locale = 'ru' }) {
  return <section className={`case-summary ${tone}`} aria-label={locale === 'ru' ? 'Краткое резюме кейса' : 'Case summary'}>
    <div><span>{locale === 'ru' ? '01 · Задача' : '01 · Challenge'}</span><p>{task}</p></div>
    <div><span>{locale === 'ru' ? '02 · Действие' : '02 · Action'}</span><p>{action}</p></div>
    <div className="case-summary-result"><span>{locale === 'ru' ? '03 · Результат' : '03 · Outcome'}</span><strong>{metric}</strong><p>{result}</p></div>
  </section>;
}

function CasePager({ previous, next, locale = 'ru' }) {
  return <div className="case-pager" aria-label={locale === 'ru' ? 'Переходы между кейсами' : 'Case navigation'}>
    <div>{previous && <a href={`#${previous.id}`}>← {previous.label}</a>}</div>
    <a className="case-pager-index" href="#case-index">{locale === 'ru' ? 'К индексу ↑' : 'Case index ↑'}</a>
    <div>{next && <a href={`#${next.id}`}>{next.label} →</a>}</div>
  </div>;
}

function translateValue(value) {
  if (typeof value === 'string') return englishTranslations[value] ?? value;
  if (Array.isArray(value)) return value.map(translateValue);
  if (value && value.constructor === Object) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateValue(item)]));
  }
  return value;
}

function translateTree(node) {
  if (typeof node === 'string') return englishTranslations[node] ?? node;
  if (Array.isArray(node)) {
    return node.map((child, index) => {
      const translated = translateTree(child);
      return isValidElement(translated) && translated.key == null
        ? cloneElement(translated, { key: `translated-${index}` })
        : translated;
    });
  }
  if (!isValidElement(node)) return node;

  const props = Object.fromEntries(
    Object.entries(node.props).map(([key, value]) => [
      key,
      key === 'children' ? translateTree(value) : translateValue(value),
    ])
  );

  if (typeof node.type !== 'string') props.locale = 'en';
  return cloneElement(node, props);
}

const grimpsMetrics = [
  ['≈30 мин', 'длительность демоверсии'],
  ['36+ мин', 'медианное время прохождения'],
  ['4 / 5', 'оценка по опросам'],
  ['20k+', 'просмотров ролика IGN']
];

const pionerAuditRows = [
  {
    problem: 'Последовательность обучения',
    observation: 'Новые правила вводились до закрепления предыдущих механик',
    impact: 'Когнитивная перегрузка и пропуск важных действий',
    priority: 'Высокий',
    solution: 'Перестройка порядка ввода механик и этапов закрепления'
  },
  {
    problem: 'Навигация и читаемость задач',
    observation: 'Маршрут и ожидаемое действие не всегда считывались из пространства и формулировки цели',
    impact: 'Остановки, движение в неверном направлении и потеря темпа',
    priority: 'Высокий',
    solution: 'Корректировка маршрутов, формулировок задач и визуальных ориентиров'
  },
  {
    problem: 'Логика взаимодействий',
    observation: 'Схожие интерактивные объекты могли использовать разные правила и обратную связь',
    impact: 'Игрок не мог уверенно переносить изученные правила на новые ситуации',
    priority: 'Высокий',
    solution: 'Унификация условий взаимодействия, подсказок и обратной связи'
  },
  {
    problem: 'Преследование волками',
    observation: 'Постановка, маршрут, поведение стаи и подсказки требовали дополнительной настройки',
    impact: 'Повторные ошибки и выходы во время эпизода',
    priority: 'Критический',
    solution: 'Переработка постановки, маршрута, поведения противников и аудиовизуальных подсказок'
  },
  {
    problem: 'Переходы между сценами и игровым процессом',
    observation: 'Смена управления, постановки и боевого состояния могла нарушать темпо-ритм отдельных эпизодов',
    impact: 'Снижение вовлечённости и потеря контекста происходящего',
    priority: 'Средний',
    solution: 'Корректировка триггеров, переходов, перемещения персонажей и звуковых акцентов'
  }
];

export default function Home({ locale }) {
  const activeLocale = locale || 'en';

  const page = <main>
    <nav><a className="mark" href="#top">II<span>.</span></a><div><a href="#work">Проекты</a><a href="#about">Обо мне</a><a href="#skills">Компетенции</a><a href="#contact">Контакты</a><LanguageSwitcher locale={activeLocale} /></div></nav>
    <header id="top" className="hero">
      <div className="eyebrow">Lead Game Designer · Game Director</div>
      <div className="hero-grid">
        <div className="hero-content">
          <h1>Превращаю игровые механики <em>в целостный опыт</em></h1>
          <p className="hero-copy"><strong>Руководитель игрового дизайна.</strong> Бой, противники, прогрессия и первый пользовательский опыт — от концепции и игровых правил до рабочего билда.</p>
          <div className="hero-actions"><a className="button primary" href="#work">Смотреть проекты</a><a className="button" href="#contact">Связаться ↘</a><span className="resume-status">Резюме — по запросу</span></div>
        </div>
        <div className="orbit" aria-hidden="true">
          <span className="orbit-ring orbit-ring-outer"></span>
          <span className="orbit-ring orbit-ring-inner"></span>
          <span className="orbit-ring orbit-ring-ellipse"></span>
          <span className="orbit-dot-track"><i className="orbit-dot"></i></span>
          <b className="orbit-words">
            <span className="orbit-word orbit-word-design">DESIGN</span>
            <span className="orbit-word orbit-word-systems">SYSTEMS</span>
            <span className="orbit-word orbit-word-play">PLAY</span>
          </b>
        </div>
      </div>
      <div className="hero-meta"><span>Более 6 лет в разработке</span><span>Руководство командами</span><span>Unreal Engine 4/5 · Unity</span><span>PC · Console · VR</span></div>
    </header>

    <section className="statement"><span>МОЙ ПОДХОД</span><p>Игровая механика работает, когда она поддерживает фантазию игрока, создаёт выбор и понятным образом меняет состояние мира.</p></section>

    <section id="case-index" className="case-index-section" aria-labelledby="case-index-title" tabIndex="-1">
      <div className="case-index-heading">
        <span>Основные кейсы</span>
        <h2 id="case-index-title">Три проекта — три стороны моей экспертизы</h2>
      </div>
      <div className="case-index-grid">
        <a className="case-index-card acid" href="#grimps-case">
          <span>01 · Combat & Systems</span>
          <h3>GRIMPS</h3>
          <small>Lead Game Designer</small>
          <strong>4 / 5 <small>оценка плейтестов</small></strong>
          <p>Сформировал целостное игровое направление и связал бой, противников, прогрессию и спутника в единую систему.</p>
          <b>Перейти к кейсу ↓</b>
        </a>
        <a className="case-index-card acid" href="#pioner-case">
          <span>02 · UX & FTUE</span>
          <h3>PIONER</h3>
          <small>Senior Designer / UX & FTUE</small>
          <strong>−15% <small>выходов в эпизоде преследования</small></strong>
          <p>Провёл UX-аудит первого пользовательского опыта и довёл изменения от выявленной проблемы до повторного тестирования.</p>
          <b>Перейти к кейсу ↓</b>
        </a>
        <a className="case-index-card frost" href="#breathedge-case">
          <span>03 · Leadership & Full Cycle</span>
          <h3>Breathedge:<br/>Cosmic Cluck</h3>
          <small>Lead Game Designer</small>
          <strong>18 месяцев <small>полный производственный цикл</small></strong>
          <p>Сформировал игровое направление VR-проекта, организовал работу дизайнеров и сохранил идентичность франшизы до релизной сборки.</p>
          <b>Перейти к кейсу ↓</b>
        </a>
      </div>
    </section>

    <section id="work" className="work"><div className="section-title"><span>Избранные проекты</span><b>01—04</b></div>
      <div className="featured-cases-shell">
      <CaseNavigation />
      <article id="grimps-case" className="featured-case" aria-labelledby="grimps-title" tabIndex="-1">
        <div className="case-index">01 · Флагманский кейс</div>
        <div className="case-cover-grid">
          <figure className="case-cover"><img src="/grimps-cover.jpg" alt="Официальная обложка GRIMPS: герой с импровизированным оружием сражается с плюшевыми существами в разрушенном городе" /><figcaption>Официальная обложка проекта GRIMPS</figcaption></figure>
          <aside className="case-facts">
            <span className="case-status">Демонстрационная версия</span>
            <h2 id="grimps-title">GRIMPS</h2>
            <p>FPS Action-Adventure с элементами метроидвании</p>
            <dl>
              <div><dt>Роль</dt><dd>Lead Game Designer</dd></div>
              <div><dt>Платформы</dt><dd>PC / Console</dd></div>
              <div><dt>Фокус</dt><dd>3C · Combat · AI · Progression</dd></div>
              <div><dt>Команда</dt><dd>Кросс-дисциплинарная: гейм-дизайн, нарративный дизайн, программирование, дизайн уровней, анимация, VFX и звук</dd></div>
              <div><dt>Ограничения</dt><dd>Демоверсия ≈30 минут · ограниченный объём контента · необходимость связать системы в цельный вертикальный срез</dd></div>
              <div><dt>Личная ответственность</dt><dd>Игровое видение · 3C и импакт · Combat Director · поведение противников · прогрессия · структура демоверсии</dd></div>
            </dl>
            <a className="button primary" href="https://store.steampowered.com/app/3297800/GRIMPS/" target="_blank" rel="noreferrer">Открыть в Steam ↗</a>
          </aside>
        </div>

        <CaseSummary
          task="Устранить слабый импакт боя и объединить основные системы демоверсии в единое игровое направление."
          action="Переработал 3C и обратную связь оружия, правила поведения противников, Combat Director, прогрессию и системную роль спутника."
          metric="4 / 5"
          result="Жалобы на недостаточный импакт перестали повторяться. Медианное время прохождения — более 36 минут."
        />

        <div className="case-intro"><span>Моя зона ответственности</span><p>Пересмотр концепции и позиционирования, формирование общего игрового видения, 3C и импакт оружия, поведение противников, Combat Director, прогрессия, спутник-голубь и структура демоверсии.</p></div>

        <div className="case-media-grid">
          <figure className="case-video">
            <iframe src="https://www.youtube.com/embed/Q1A49IeWHX4?rel=0" title="Обзор игрового процесса и ключевых систем GRIMPS" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            <figcaption><span>VIDEO · YOUTUBE · 01:10</span><strong>Обзор кейса GRIMPS</strong><small>Ключевые игровые системы, боевые столкновения, оружие и способности спутника. Качество выбирается в настройках плеера.</small></figcaption>
          </figure>
          <div className="screenshot-stack"><figure className="case-screenshot"><img src="/grimps-weapon-impact.jpg" alt="Игровой кадр GRIMPS: выстрел из импровизированного оружия, яркая вспышка и подсвеченные реакции плюшевых противников" /><figcaption><span>SCREENSHOT 01</span><strong>Импакт оружия</strong><small>Вспышка выстрела, силуэт оружия и реакции целей усиливают читаемость попадания.</small></figcaption></figure><figure className="case-screenshot"><img src="/grimps-group-combat.jpg" alt="Игровой кадр GRIMPS: игрок окружён несколькими типами плюшевых противников, занимающими ближние, средние и дальние позиции" /><figcaption><span>SCREENSHOT 02</span><strong>Групповой бой</strong><small>Разные типы противников распределяются по дистанциям и поддерживают давление без одновременной атаки всей группы.</small></figcaption></figure></div>
        </div>
        <div className="case-secondary-gallery">
          <figure className="case-screenshot case-screenshot-wide"><img src="/grimps-combat-staging.jpg" alt="Игровой кадр GRIMPS: в тёмном городском пространстве противник на мотоцикле атакует игрока с близкой дистанции на фоне фиолетовых органических структур" /><figcaption><span>SCREENSHOT 03</span><strong>Постановка боевого столкновения</strong><small>Контрастный свет, близкая дистанция и направленный силуэт противника усиливают ощущение угрозы и делают атаку выразительной.</small></figcaption></figure>
          <figure className="case-screenshot case-screenshot-wide"><img src="/grimps-pigeon-companion.jpg" alt="Игровой кадр GRIMPS: голубь-спутник атакует огнём крупного противника, пока игрок продолжает бой с оружием в руках" /><figcaption><span>SCREENSHOT 04</span><strong>Спутник как часть боевой системы</strong><small>Голубь применяет самостоятельную огненную способность и участвует в столкновении как функциональный напарник, связанный с боевыми возможностями игрока.</small></figcaption></figure>
        </div>

        <div className="case-story">
          <section><span>01 · Проблема</span><h3>Бою не хватало импакта и единого направления</h3><p>Игроки отмечали недостаточный импакт оружия и слабую выразительность реакций противников. Проекту также требовалось более ясное позиционирование и связанная структура основных систем.</p></section>
          <section><span>02 · Решение</span><h3>Итерации 3C, обратной связи и поведения врагов</h3><p>Усилены анимации, звук и визуальная индикация попаданий, характер оружия и реакции противников. Бой, исследование, прогрессия и спутник были объединены вокруг общего игрового видения.</p></section>
          <section><span>03 · Результат</span><h3>Проблема перестала повторяться в отзывах</h3><p>После следующих игровых тестирований жалобы на отсутствие импакта перестали повторяться. Демоверсия получила устойчивые показатели прохождения и оценки.</p></section>
        </div>

        <div className="case-metrics">{grimpsMetrics.map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>

        <div className="case-proof-grid">
          <figure className="diagram-card"><a href="/combat-director-full.webp" target="_blank" rel="noreferrer" aria-label="Открыть полную схему Combat Director"><img src="/combat-director-preview.webp" alt="Превью схемы Combat Director: три тактических круга, сектора вокруг игрока и распределение ролей противников" /><span>Открыть полную схему ↗</span></a><figcaption><strong>Схема Combat Director</strong><p>Система распределяет противников по трём тактическим кругам, учитывая роль, вес, положение относительно камеры, доступность пути и плотность союзников.</p><ul><li>ограничивает число активных атакующих;</li><li>распределяет роли и позиции с учётом веса;</li><li>пересчитывает позиции при движении камеры.</li></ul></figcaption></figure>
        </div>

        <div className="media-checklist"><strong>Материалы кейса</strong><span className="ready">✓ Обложка</span><span className="ready">✓ 4 скриншота</span><span className="ready">✓ Видео</span><span className="ready">✓ Схема Combat Director</span></div>
        <CasePager next={{ id: 'pioner-case', label: 'PIONER' }} />
      </article>

      <article id="pioner-case" className="featured-case pioner-case" aria-labelledby="pioner-title" tabIndex="-1">
        <div className="case-index">02 · UX & FTUE кейс</div>
        <div className="case-cover-grid">
          <figure className="case-cover pioner-cover"><img src="/pioner-cover-v2.webp" alt="Ключевой арт PIONER: три вооружённых персонажа в постапокалиптической зоне на фоне энергетической аномалии" /><figcaption>Официальный ключевой арт проекта PIONER</figcaption></figure>
          <aside className="case-facts">
            <span className="case-status">Early Access</span>
            <h2 id="pioner-title">PIONER</h2>
            <p>Action MMORPG · PC</p>
            <dl>
              <div><dt>Роль</dt><dd>Senior Designer / UX & FTUE</dd></div>
              <div><dt>Период</dt><dd>Август — октябрь 2024 · 3 месяца</dd></div>
              <div><dt>Команда</dt><dd>Кросс-дисциплинарная: гейм-дизайн, дизайн уровней, нарративный дизайн</dd></div>
              <div><dt>Ограничения</dt><dd>Работа с существующей сборкой и готовыми системами · ограниченный срок аудита · улучшение опыта без полной переработки проекта</dd></div>
              <div><dt>Личная ответственность</dt><dd>UX-аудит FTUE · поиск причин затруднений и выходов · переработка обучения и взаимодействий · постановка задач смежным отделам · сопровождение до повторного тестирования</dd></div>
            </dl>
            <a className="button primary" href="https://vk.cc/cttXAA" target="_blank" rel="noreferrer">Открыть проект ↗</a>
          </aside>
        </div>

        <CaseSummary
          task="За ограниченный срок найти причины затруднений и выходов игроков в FTUE существующей сборки."
          action="Провёл аудит игровых сессий, перестроил последовательность обучения, навигацию и правила взаимодействия, сопроводил изменения до повторного тестирования."
          metric="−15%"
          result="Доля выходов игроков в эпизоде преследования снизилась после внедрения изменений."
        />

        <div className="case-intro"><span>Кратко о кейсе</span><p>Провёл аудит первого пользовательского опыта, перестроил обучение и правила взаимодействия с миром, а также переработал проблемные игровые эпизоды. Изменения в сцене преследования волками снизили долю выходов игроков на 15%.</p></div>

        <section className="pioner-context" aria-labelledby="pioner-context-title">
          <div><span>01 · Контекст</span><h3 id="pioner-context-title">Улучшение FTUE внутри существующей сборки</h3><p>Работа проходила с уже реализованными системами Action MMORPG. В начале игры пользователю нужно было осваивать правила взаимодействия с миром, ориентироваться в пространстве, понимать задачи и переходить между исследованием, постановочными сценами и боевыми эпизодами.</p></div>
          <div><span>02 · Задача</span><h3>Найти причины затруднений и довести изменения до сборки</h3><p>За ограниченный срок требовалось выявить точки потери понимания и выходов, определить наиболее значимые проблемы и улучшить FTUE без полной переработки реализованных систем. Решения необходимо было передать смежным дисциплинам, сопроводить до внедрения в сборку и проверить повторным тестированием.</p></div>
        </section>

        <section className="audit-method" aria-labelledby="audit-method-title">
          <div className="audit-method-head"><span>Метод аудита</span><h3 id="audit-method-title">От наблюдения — до повторного тестирования</h3></div>
          <div className="audit-pipeline" aria-label="Процесс UX-аудита">
            {['Сбор наблюдений','Диагностика','Оценка влияния','Гипотеза','Постановка задач','Внедрение','Повторный тест'].map((step,index)=><div key={step}><b>{String(index+1).padStart(2,'0')}</b><span>{step}</span></div>)}
          </div>
          <p className="audit-subtitle">Что анализировалось</p>
          <ol>
            <li><b>01</b><span>Записи игровых сессий</span></li>
            <li><b>02</b><span>Поведение участников во время плейтестов</span></li>
            <li><b>03</b><span>Места остановок, ошибок и выходов</span></li>
            <li><b>04</b><span>Последовательность появления механик</span></li>
            <li><b>05</b><span>Понятность целей и маршрутов</span></li>
            <li><b>06</b><span>Соответствие подсказок доступным действиям</span></li>
            <li><b>07</b><span>Перегрузка игрока новой информацией</span></li>
            <li><b>08</b><span>Переходы между исследованием, постановочными сценами и боем</span></li>
          </ol>
        </section>

        <section className="ux-audit" aria-labelledby="pioner-audit-title">
          <div className="ux-audit-head">
            <div><span>Результаты аудита</span><h3 id="pioner-audit-title">Проблемы, влияние на опыт и принятые решения</h3></div>
            <p>Наблюдения переводились в изменения с учётом влияния на понимание цели, возможность продолжить прохождение и риск выхода из игровой сессии.</p>
          </div>
          <div className="ux-table-wrap">
            <table>
              <thead><tr><th>Проблема</th><th>Наблюдение</th><th>Влияние на опыт</th><th>Приоритет</th><th>Решение</th></tr></thead>
              <tbody>{pionerAuditRows.map((row)=><tr key={row.problem}><td>{row.problem}</td><td>{row.observation}</td><td>{row.impact}</td><td><strong>{row.priority}</strong></td><td>{row.solution}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="ux-audit-cards" aria-label="Результаты UX-аудита PIONER">
            {pionerAuditRows.map((row)=><article key={row.problem}>
              <h4>{row.problem}</h4>
              <dl>
                <div><dt>Наблюдение</dt><dd>{row.observation}</dd></div>
                <div><dt>Влияние</dt><dd>{row.impact}</dd></div>
                <div><dt>Приоритет</dt><dd><strong>{row.priority}</strong></dd></div>
                <div><dt>Решение</dt><dd>{row.solution}</dd></div>
              </dl>
            </article>)}
          </div>
        </section>

        <div className="case-story pioner-directions">
          <section><span>01 · FTUE</span><h3>Последовательность обучения</h3><p>Перестроил ввод механик по принципу: знакомство → безопасное применение → проверка понимания → сочетание с ранее изученными правилами → самостоятельное использование.</p></section>
          <section><span>02 · Взаимодействия</span><h3>Предсказуемые правила мира</h3><p>Унифицировал логику интерактивных объектов: доступность действия, формат подсказки, условия активации и обратную связь после взаимодействия.</p></section>
          <section><span>03 · Постановка</span><h3>Читаемые игровые эпизоды</h3><p>Корректировал маршруты, темпо-ритм, поведение противников, игровые триггеры и аудиовизуальные ориентиры, чтобы ожидаемое действие считывалось даже под давлением.</p></section>
        </div>

        <section className="before-after" aria-labelledby="before-after-title">
          <div className="before-after-head"><span>Изменение опыта</span><h3 id="before-after-title">До → после</h3><p>Сравнение показывает направление внесённых изменений без публикации внутренней документации проекта.</p></div>
          <div className="before-after-row">
            <strong>FTUE</strong>
            <div><span>До</span><p>Новые правила могли появляться до того, как игрок успевал закрепить предыдущие механики.</p></div>
            <i>→</i>
            <div><span>После</span><p>Механики вводились последовательно: знакомство, применение, проверка понимания и самостоятельное использование.</p></div>
          </div>
          <div className="before-after-row">
            <strong>Взаимодействия</strong>
            <div><span>До</span><p>Схожие интерактивные объекты могли использовать разные условия и обратную связь.</p></div>
            <i>→</i>
            <div><span>После</span><p>Условия активации, подсказки и обратная связь были приведены к более единой логике.</p></div>
          </div>
          <div className="before-after-row">
            <strong>Преследование</strong>
            <div><span>До</span><p>Постановка, маршрут, поведение стаи и подсказки приводили к повторным ошибкам и выходам.</p></div>
            <i>→</i>
            <div><span>После</span><p>Элементы эпизода были переработаны и согласованы между собой; доля выходов снизилась на 15%.</p></div>
          </div>
        </section>

        <div className="pioner-media-grid">
          <figure className="case-screenshot pioner-media-zone pioner-ftue-shot"><img src="/pioner-ftue-navigation-v1.jpg" alt="Игровой кадр PIONER: природный коридор направляет игрока к проходу, а маркер цели уточняет направление движения" /><figcaption><span>FTUE · НАВИГАЦИЯ</span><strong>Читаемое направление движения</strong><small>Геометрия прохода, световой контраст и маркер цели работают вместе, помогая игроку считать маршрут без остановки темпа.</small></figcaption></figure>
          <figure className="case-screenshot pioner-media-zone pioner-world-shot"><img src="/pioner-world-interaction-v1.jpg" alt="Игровой кадр PIONER: интерактивный объект выделен контуром, рядом показаны название предмета и доступные действия" /><figcaption><span>UX · ВЗАИМОДЕЙСТВИЕ</span><strong>Взаимодействие с миром</strong><small>Контур объекта, название и контекстные действия помогают быстро понять, с чем можно взаимодействовать и какой ввод ожидается.</small></figcaption></figure>
        </div>

        <section className="wolf-case" aria-labelledby="wolf-case-title">
          <div className="wolf-case-head"><span>Центральный мини-кейс</span><h3 id="wolf-case-title">Преследование волками</h3><strong>−15% выходов</strong></div>
          <div className="wolf-case-grid">
            <div><span>01 · Проблема</span><p>Плейтесты показали повторные ошибки и повышенную долю выходов во время эпизода преследования.</p></div>
            <div><span>02 · Гипотеза</span><p>На результат влияла совокупность факторов: постановка, читаемость маршрута, поведение стаи и аудиовизуальные ориентиры.</p></div>
            <div><span>03 · Решение</span><p>Переработал постановку эпизода, маршрут, поведение противников и расположение аудиовизуальных подсказок.</p></div>
            <div><span>04 · Результат</span><p>После внедрения изменений и повторного тестирования доля выходов во время эпизода снизилась на 15%.</p></div>
          </div>
          <div className="wolf-media-grid">
            <figure className="case-screenshot pioner-media-zone pioner-wolf-shot"><img src="/pioner-wolf-chase-v2.webp" alt="Игровой кадр PIONER из эпизода преследования: маршрут проходит между скалами к контрастной голубой аномалии и маркеру цели" /><figcaption><span>ПРЕСЛЕДОВАНИЕ · МАРШРУТ</span><strong>Преследование волками</strong><small>Геометрия прохода, контрастная аномалия и маркер цели формируют последовательные ориентиры по направлению движения.</small></figcaption></figure>
            <MediaPlaceholder className="pioner-media-zone" kind="DIAGRAM · BEFORE / AFTER" title="Схема эпизода" hint="Маршрут, точки появления угрозы и изменения постановки до и после" />
            <figure className="pioner-media-zone pioner-motion"><video className="motion-animation" autoPlay muted loop playsInline preload="metadata" poster="/pioner-wolf-chase-v2.webp" aria-label="Игровой фрагмент PIONER: вход в аномальную зону, появление стаи и давление в ближней дистанции"><source src="/pioner-wolf-chase-motion-v3.webm" type="video/webm" /></video><img className="motion-fallback" src="/pioner-wolf-chase-v2.webp" alt="" aria-hidden="true" /><figcaption><span>LOOP WEBM · 00:36</span><strong>Эпизод в движении</strong><small>Вход в аномальную зону сменяется появлением стаи: угроза перекрывает маршрут и быстро переносит давление в ближнюю дистанцию.</small></figcaption></figure>
          </div>
        </section>

        <section className="case-implementation"><span>Внедрение решений</span><p>По результатам аудита формировал задачи для дизайнеров уровней, нарративных дизайнеров и других задействованных специалистов. Сопровождал решения от постановки и согласования изменений до внедрения в сборку и повторного тестирования.</p></section>

        <div className="case-metrics pioner-metrics"><div><strong>−15%</strong><span>выходов в эпизоде с волками</span></div><div><strong>3 мес.</strong><span>аудит, внедрение и повторное тестирование</span></div><div><strong>PC</strong><span>целевая платформа</span></div></div>
        <CasePager previous={{ id: 'grimps-case', label: 'GRIMPS' }} next={{ id: 'breathedge-case', label: 'Breathedge' }} />
      </article>

      <article id="breathedge-case" className="featured-case breathedge-case" aria-labelledby="breathedge-title" tabIndex="-1">
        <div className="case-index">03 · Лидерский кейс</div>
        <div className="breathedge-hero">
          <figure className="case-cover breathedge-cover breathedge-cover-art"><img src="/breathedge-cosmic-cluck-cover.jpg" alt="Официальная обложка Breathedge: Cosmic Cluck с героями, курицей-напарником и логотипом проекта" /><figcaption>Официальная обложка Breathedge: Cosmic Cluck</figcaption></figure>
          <aside className="case-facts">
            <span className="case-status">Release</span>
            <h2 id="breathedge-title">Breathedge:<br/>Cosmic Cluck</h2>
            <p>FPS Action-Adventure для VR</p>
            <dl>
              <div><dt>Роль</dt><dd>Lead Game Designer</dd></div>
              <div><dt>Период</dt><dd>Сентябрь 2022 — май 2024</dd></div>
              <div><dt>Платформы</dt><dd>VR / Oculus Quest</dd></div>
              <div><dt>Команда</dt><dd>Более 5 дизайнеров и смежные отделы</dd></div>
              <div><dt>Производственный цикл</dt><dd>18 месяцев · от концепции до релиза</dd></div>
              <div><dt>Фокус</dt><dd>Идентичность франшизы · игровое видение · команда · системы · релиз</dd></div>
            </dl>
            <a className="button primary" href="https://vk.cc/cvVgOW" target="_blank" rel="noreferrer">Открыть проект ↗</a>
          </aside>
        </div>

        <CaseSummary
          tone="frost"
          task="Сформировать направление VR-проекта и сохранить идентичность франшизы на протяжении полного производственного цикла."
          action="Зафиксировал правила систем и уровней, руководил командой из более чем пяти дизайнеров и согласовывал решения между смежными отделами."
          metric="18 месяцев"
          result="Полный цикл от концепции до релиза и последующая поддержка бесплатными DLC."
        />

        <section className="breathedge-context">
          <div><span>Контекст</span><p>Breathedge: Cosmic Cluck разрабатывался как самостоятельный FPS Action-Adventure для VR. Проект прошёл полный производственный цикл продолжительностью 18 месяцев — от формирования концепции и основных систем до релиза и последующей поддержки.</p></div>
          <div><span>Лидерская задача</span><p>Требовалось сформировать единое направление VR-проекта, сохранить узнаваемую идентичность Breathedge и раскрыть её через новые формы взаимодействия, не нарушая ожидания существующей аудитории.</p></div>
          <blockquote>Сохранить идентичность Breathedge, адаптировать её под VR и усилить через игровые системы.</blockquote>
        </section>

        <section className="leadership-responsibilities" aria-labelledby="responsibility-title">
          <div className="compact-section-head"><span>Зона ответственности</span><h3 id="responsibility-title">От видения до качества сборки</h3></div>
          <div className="leadership-card-grid">
            <div><span>01</span><h4>Игровое видение</h4><p>Формировал и поддерживал общее видение проекта, определял принципы игровых систем и проверял соответствие решений целевому опыту.</p></div>
            <div><span>02</span><h4>Команда</h4><p>Руководил командой из более чем пяти дизайнеров: распределял направления, ставил задачи, проводил ревью и синхронизировал решения.</p></div>
            <div><span>03</span><h4>Производство</h4><p>Выстраивал взаимодействие между гейм-дизайном, программированием, дизайном уровней, нарративом, анимацией, интерфейсами, звуком и арт-отделом.</p></div>
            <div><span>04</span><h4>Качество продукта</h4><p>Сопровождал механики от концепции и документации до реализации, тестирования, балансировки и выпуска.</p></div>
            <div><span>05</span><h4>Идентичность франшизы</h4><p>Отвечал за сохранение и развитие узнаваемых принципов Breathedge: характера юмора, абсурдных ситуаций, роли окружения и отношений игрока с курицей-напарником.</p></div>
          </div>
        </section>

        <section className="breathedge-created" aria-labelledby="created-title">
          <div className="compact-section-head"><span>Что было создано</span><h3 id="created-title">Системный фундамент проекта</h3></div>
          <ol>
            <li>Заложил базовые принципы игровых систем с учётом идентичности франшизы и особенностей VR.</li>
            <li>Разработал правила работы квестовой системы.</li>
            <li>Сформировал правила дизайна уровней и основу игровых локаций.</li>
            <li>Участвовал в проектировании боевой системы и поведения противников.</li>
            <li>Проводил балансировку, анализировал поведение игроков и корректировал решения по результатам тестирования.</li>
            <li>Разработал концепцию курицы-напарника и правила её системного взаимодействия с игроком, игровым миром, окружением и ключевыми механиками.</li>
          </ol>
        </section>

        <div className="breathedge-media-grid">
          <figure className="case-screenshot breathedge-media-zone breathedge-location-shot"><img src="/breathedge-space-location.png" alt="Игровой кадр Breathedge: Cosmic Cluck: игрок перемещается среди астероидов и ярких космических объектов в открытом пространстве" /><figcaption><span>LOCATION · VR</span><strong>Атмосфера космических локаций</strong><small>Масштаб, вертикальность и контрастные ориентиры формируют выразительное пространство для исследования и взаимодействия в VR.</small></figcaption></figure>
          <figure className="case-screenshot breathedge-media-zone breathedge-combat-shot"><img src="/breathedge-enemy-attack.jpg" alt="Игровой кадр Breathedge: Cosmic Cluck: несколько роботов атакуют игрока с разных направлений в пространстве VR-локации" /><figcaption><span>COMBAT · VR</span><strong>Бой и поведение противников</strong><small>Противники распределены по высоте и направлениям, формируя групповую угрозу и сохраняя читаемость целей в пространстве VR.</small></figcaption></figure>
        </div>

        <section className="leadership-pipeline" aria-labelledby="pipeline-title">
          <div className="compact-section-head"><span>Лидерский процесс</span><h3 id="pipeline-title">Процесс принятия и сопровождения решений</h3></div>
          <div className="pipeline-flow" aria-label="Видение, правила дизайна, постановка задач, ревью реализации, плейтест, корректировка, релиз">
            {['Видение','Правила дизайна','Постановка задач','Ревью реализации','Плейтест','Корректировка','Релиз'].map((step,i)=><div key={step}><b>{String(i+1).padStart(2,'0')}</b><span>{step}</span></div>)}
          </div>
          <p>Моя задача заключалась не только в разработке отдельных решений, но и в сохранении их целостности при передаче между специалистами и последовательных производственных итерациях.</p>
        </section>

        <section className="franchise-leadership-case" aria-labelledby="franchise-leadership-title">
          <div className="franchise-leadership-head">
            <span>Лидерский мини-кейс</span>
            <h3 id="franchise-leadership-title">Как сохранил идентичность Breathedge при переходе в VR</h3>
            <p>Задача лидера заключалась не только в переносе знакомой вселенной на новую платформу, но и в сохранении её характера через правила игровых систем, взаимодействие с миром и роль курицы-напарника.</p>
          </div>
          <div className="franchise-leadership-grid">
            <article>
              <span>01 · Вызов</span>
              <h4>Сохранить характер, а не только визуальные признаки</h4>
              <p>Breathedge уже обладал узнаваемой идентичностью: абсурдным юмором, необычными предметами, игровыми ситуациями на границе комедии и опасности, а также особым отношением игрока с курицей. При переходе в VR существовал риск сохранить форму, но потерять характер игрового опыта.</p>
            </article>
            <article>
              <span>02 · Принципы</span>
              <h4>Перевести идентичность в правила дизайна</h4>
              <ul>
                <li>юмор раскрывается через действие игрока;</li>
                <li>окружение поддерживает исследование, задачи и комедийные ситуации;</li>
                <li>знакомые элементы получают функциональное развитие в VR;</li>
                <li>курица становится частью системного взаимодействия;</li>
                <li>решения учитывают присутствие игрока и направление взгляда.</li>
              </ul>
            </article>
            <article>
              <span>03 · Системное решение</span>
              <h4>Курица как связующий элемент проекта</h4>
              <p>Развил концепцию курицы-напарника как элемента, связывающего игрока, мир и идентичность франшизы. Она участвовала во взаимодействии с окружением, поддерживала исследование и игровые задачи, создавала комедийные ситуации и встраивалась в правила квестов, уровней и постановочных эпизодов.</p>
            </article>
            <article>
              <span>04 · Лидерское влияние</span>
              <h4>Сохранить единые принципы между отделами</h4>
              <p>Формировал направление проекта, проводил ревью решений и проверял, чтобы механики, уровни, квесты, бой, нарратив и взаимодействия с курицей поддерживали одни и те же принципы при передаче между дизайном, программированием, артом, анимацией и звуком.</p>
            </article>
          </div>
          <p className="franchise-leadership-summary">Breathedge: Cosmic Cluck показывает мою способность руководить разработкой внутри существующей франшизы: выделять её ключевые принципы, переводить их в конкретные правила дизайна и сохранять целостное игровое направление до релиза.</p>
        </section>

        <section className="leadership-mini-case" aria-labelledby="leadership-mini-title">
          <div className="compact-section-head"><span>Управленческий мини-кейс</span><h3 id="leadership-mini-title">Как выстроил согласованную работу дизайнеров</h3></div>
          <div className="leadership-mini-grid">
            <div><span>Проблема</span><p>Разные дизайнерские направления могли развиваться изолированно, создавая несогласованные правила и увеличивая количество повторных итераций.</p></div>
            <div><span>Решение</span><p>Зафиксировал базовые принципы систем, уровней и идентичности франшизы, распределил ответственность, ввёл регулярное ревью решений и синхронизацию со смежными отделами.</p></div>
            <div><span>Эффект</span><p>Команда быстрее согласовывала изменения, снизилось количество расхождений между направлениями, а производственные итерации стали более последовательными.</p></div>
          </div>
        </section>

        <div className="case-metrics breathedge-metrics">
          <div><strong>18 месяцев</strong><span>полный цикл от концепции до релиза</span></div>
          <div><strong>5+ дизайнеров</strong><span>руководство командой и согласование направлений</span></div>
          <div><strong>Release + DLC</strong><span>релиз и последующая поддержка проекта</span></div>
        </div>
        <p className="breathedge-summary">Breathedge: Cosmic Cluck показывает, что я умею руководить разработкой внутри существующей франшизы: сохранять её узнаваемую идентичность, адаптировать ключевые принципы под новую платформу и развивать их через игровые системы.</p>
        <CasePager previous={{ id: 'pioner-case', label: 'PIONER' }} />
      </article>
      </div>

      <div className="section-title secondary-title"><span>Дополнительная экспертиза</span><b>Post-release · AI · Enemy Design</b></div>
      <article className="zoochosis-compact" aria-labelledby="zoochosis-title">
        <header className="zoochosis-head">
          <div><span>04 · Horror · PC · Unreal Engine 5</span><h2 id="zoochosis-title">Zoochosis</h2></div>
          <div><span>Роль</span><strong>AI / Enemy Designer</strong></div>
        </header>
        <p className="zoochosis-lead">Участвовал в пострелизной переработке поведения противников, боевых столкновений и боссов на основе обратной связи игроков.</p>
        <div className="zoochosis-body">
          <div className="zoochosis-directions">
            <div><span>01</span><h3>Противники и боссы</h3><p>Проектировал боевые паттерны, состояния и логику поведения пяти боссов.</p></div>
            <div><span>02</span><h3>Пострелизные изменения</h3><p>Участвовал в трёх крупных обновлениях: доработке хоррор-системы, боссов и исправлении проблем игры.</p></div>
            <div><span>03</span><h3>Работа с отзывами</h3><p>Анализировал обратную связь после релиза и переводил повторяющиеся проблемы игроков в конкретные изменения механик и поведения противников.</p></div>
          </div>
          <figure className="zoochosis-boss-zone zoochosis-loop"><video autoPlay muted loop playsInline preload="metadata" aria-label="Игровой фрагмент Zoochosis с поведением противника и боевым взаимодействием"><source src="/zoochosis-boss-loop.webm" type="video/webm" /></video><figcaption><span>LOOP · WEBM</span><strong>Дизайн противников и боссов</strong><small>Короткий игровой фрагмент демонстрирует поведение угрозы и взаимодействие с противником в реальном времени.</small></figcaption></figure>
        </div>
        <div className="zoochosis-results">
          <div><strong>5 боссов</strong><span>поведение и боевые паттерны</span></div>
          <div><strong>3 обновления</strong><span>крупные пострелизные итерации</span></div>
          <div><strong>Post-release</strong><span>работа с отзывами аудитории</span></div>
          <a className="button zoochosis-link" href="https://store.steampowered.com/app/2458560/Zoochosis/" target="_blank" rel="noreferrer">Открыть Steam ↗</a>
        </div>
      </article>
    </section>

    <section className="other"><div className="section-title"><span>Другой опыт</span><b>05—06</b></div><div className="other-grid">
      <article><span>05 · ИГРОВОЙ ПРОЕКТ ДЛЯ IGN · 2021</span><h3>Гейм-дизайн и производство</h3><p>Создал игровой веб-проект: разработал концепцию, уровни, механики и повествование, составил дорожную карту и технические задания, вёл сроки, качество и коммуникацию с заказчиком.</p><div className="mini-stats"><strong>17 000+</strong><span>игроков за первую неделю без маркетинга</span></div><a className="project-link" href="https://vk.cc/c8EjjI" target="_blank" rel="noreferrer">Поиграть ↗</a></article>
      <article><span>06 · VR-НЕЙРОРЕАБИЛИТАЦИЯ</span><h3>Прототипирование с врачами</h3><p>Проектирование VR-упражнений для восстановления когнитивных функций. Проверка гипотез совместно с медицинскими специалистами и сбор метрик улучшений.</p></article>
    </div></section>

    <section id="about" className="about"><div><div className="eyebrow">Чем я полезен команде</div><h2>От идеи —<br/>до работающего билда</h2><p>Я соединяю творческое видение с производственной реальностью: определяю, что именно должна доказать механика, собираю прототип, проверяю его с игроками и довожу решение вместе с программистами и художниками.</p></div><div className="capabilities">{capabilities.map(([t,d],i)=><div key={t}><span>0{i+1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>

    <section id="skills" className="toolkit"><div className="section-title"><span>Инструменты и специализация</span></div><div className="tags">{['Unreal Engine 5','Unity','Blueprint','C#','GAS','Behavior Tree','Blackboard','FSM','Combat Design','AI Design','Progression','Level Design','GDD','Player Journey','Prototyping','Playtests','Jira','Git','Miro'].map(x=><span key={x}>{x}</span>)}</div></section>

    <footer id="contact"><div className="eyebrow">Открыт к предложениям</div><h2>Давайте сделаем игру,<br/><em>в которую хочется играть</em></h2><div className="contact-actions"><span className="button disabled-button" aria-disabled="true">Резюме — по запросу</span><a className="button" href="https://www.linkedin.com/in/ilya-ivanovv/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="button" href="https://t.me/IvanovvI" target="_blank" rel="noreferrer">Telegram ↗</a></div><a className="mail" href="mailto:ivanov_nord@mail.ru">ivanov_nord@mail.ru ↗</a><div className="footer-line"><span>Илья Иванов · 2026</span><span>Lead Game Designer / Game Director</span></div></footer>
  </main>;

  return activeLocale === 'en' ? translateTree(page) : page;
}
