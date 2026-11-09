import ResumeView from "./ResumeView";

export const metadata = {
  title: "Résumé",
  description:
    "Résumé of Hasan Bin Ali — video editor and cinematographer based in Dhaka, Bangladesh. Experience, services, education and selected work. Print or save as PDF.",
  openGraph: {
    title: "Résumé — Hasan Bin Ali",
    description:
      "Experience, services, education and selected work — video editor and cinematographer, Dhaka.",
    url: "https://hasanbinali.com/resume",
  },
};

export default function ResumePage() {
  return (
    <main id="main">
      <ResumeView />
    </main>
  );
}
