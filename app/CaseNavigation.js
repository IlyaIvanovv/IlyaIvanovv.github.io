"use client";

import { useEffect, useState } from "react";

const cases = [
  { id: "grimps-case", label: "01 · GRIMPS" },
  { id: "pioner-case", label: "02 · PIONER" },
  { id: "breathedge-case", label: "03 · Breathedge" },
];

export default function CaseNavigation({ locale = "ru" }) {
  const [activeCase, setActiveCase] = useState("grimps-case");

  useEffect(() => {
    const sections = cases
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveCase(visible[0].target.id);
      },
      {
        rootMargin: "-18% 0px -64% 0px",
        threshold: [0, 0.05, 0.2],
      }
    );

    sections.forEach((section) => observer.observe(section));

    const focusTarget = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute("href").slice(1);
      if (!["case-index", ...cases.map((item) => item.id)].includes(id)) return;

      window.requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) target.focus({ preventScroll: true });
      });
    };

    document.addEventListener("click", focusTarget);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", focusTarget);
    };
  }, []);

  return (
    <div className="case-nav" role="navigation" aria-label={locale === "ru" ? "Навигация по основным кейсам" : "Featured case navigation"}>
      <div className="case-nav-inner">
        <span className="case-nav-label">{locale === "ru" ? "Основные кейсы" : "Featured cases"}</span>
        <div className="case-nav-links">
          {cases.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeCase === id ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </div>
        <a className="case-nav-index" href="#case-index">
          {locale === "ru" ? "↑ К индексу" : "↑ Case index"}
        </a>
      </div>
    </div>
  );
}
