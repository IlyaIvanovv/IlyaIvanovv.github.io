import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

execFileSync(process.execPath, ['./node_modules/next/dist/bin/next', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }
});

const rootPage = join('dist', 'index.html');
const languageDetectionScript = `<script>
(() => {
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
</script>`;

const html = readFileSync(rootPage, 'utf8').replace(
  '</head>',
  `${languageDetectionScript}</head>`
);

writeFileSync(rootPage, html);
writeFileSync(join('dist', '.nojekyll'), '');
