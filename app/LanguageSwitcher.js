"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-language";

export default function LanguageSwitcher({ locale }) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    document.documentElement.lang = locale;

    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, [locale]);

  const rememberLanguage = (language) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Native links keep working when storage is unavailable.
    }
  };

  return (
    <span className="language-switcher" aria-label={locale === "ru" ? "Выбор языка" : "Language selection"}>
      <a
        href={`/ru/${hash}`}
        hrefLang="ru"
        lang="ru"
        aria-current={locale === "ru" ? "page" : undefined}
        onClick={() => rememberLanguage("ru")}
      >
        RU
      </a>
      <span aria-hidden="true">/</span>
      <a
        href={`/en/${hash}`}
        hrefLang="en"
        lang="en"
        aria-current={locale === "en" ? "page" : undefined}
        onClick={() => rememberLanguage("en")}
      >
        EN
      </a>
    </span>
  );
}
