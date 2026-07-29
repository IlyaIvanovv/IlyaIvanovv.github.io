import PortfolioPage from "../page";

export const metadata = {
  title: "Илья Иванов — Lead Game Designer",
  description:
    "Портфолио руководителя игрового дизайна: системный и боевой дизайн, ИИ, прогрессия и руководство разработкой.",
  alternates: {
    canonical: "/ru/",
    languages: {
      ru: "/ru/",
      en: "/en/",
      "x-default": "/en/",
    },
  },
};

export default function RussianPortfolio() {
  return <PortfolioPage locale="ru" />;
}
