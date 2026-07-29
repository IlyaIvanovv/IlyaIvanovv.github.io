import './styles.css';
import './contact.css';
import './featured-case.css';
import './diagram.css';

const languageBootstrap = `
(() => {
  if (location.pathname !== '/' && location.pathname !== '/index.html') return;

  let saved = null;
  try {
    saved = localStorage.getItem('portfolio-language');
  } catch {}

  const primaryLanguage =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    'en';
  const prefersRussian = String(primaryLanguage).toLowerCase().startsWith('ru');

  if (saved === 'ru' || (saved !== 'en' && prefersRussian)) {
    location.replace('/ru/' + location.hash);
  }
})();
`;

export const metadata = {
  title: 'Ilya Ivanov — Lead Game Designer',
  description: 'Lead Game Designer portfolio: systems and combat design, AI, progression, player experience, and design leadership.',
  alternates: {
    canonical: '/',
    languages: {
      ru: '/ru/',
      en: '/en/',
      'x-default': '/',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
