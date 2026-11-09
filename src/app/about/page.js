import AboutView from "./AboutView";

export const metadata = {
  title: "About",
  description:
    "Learn about Hasan Bin Ali — video editor and cinematographer based in Dhaka, Bangladesh. Experience, education, and creative approach.",
  openGraph: {
    title: "About — Hasan Bin Ali",
    description:
      "Video editor and cinematographer based in Dhaka, Bangladesh.",
    url: "https://hasanbinali.com/about",
  },
};

export default function AboutPage() {
  return (
    <main id="main">
      <AboutView />
    </main>
  );
}
