import WorkView from "./WorkView";

export const metadata = {
  title: "Work",
  description:
    "Selected video editing, cinematography, and drone projects by Hasan Bin Ali — based in Dhaka, Bangladesh.",
  openGraph: {
    title: "Work — Hasan Bin Ali",
    description:
      "Selected video editing, cinematography, and drone projects.",
    url: "https://hasanbinali.com/work",
  },
};

export default function WorkPage() {
  return (
    <main id="main">
      <WorkView />
    </main>
  );
}
