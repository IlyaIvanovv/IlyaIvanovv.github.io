import PortfolioPage from "../page";

export const metadata = {
  title: "Ilya Ivanov — Lead Game Designer",
  description:
    "Lead Game Designer portfolio: systems and combat design, AI, progression, player experience, and design leadership.",
  alternates: {
    canonical: "/en/",
    languages: {
      ru: "/ru/",
      en: "/en/",
      "x-default": "/en/",
    },
  },
};

export default function EnglishPortfolio() {
  return <PortfolioPage locale="en" />;
}
