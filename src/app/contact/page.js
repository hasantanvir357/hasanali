import ContactView from "./ContactView";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Hasan Bin Ali for video editing, cinematography, and visual storytelling projects.",
  openGraph: {
    title: "Contact — Hasan Bin Ali",
    description:
      "Get in touch for video editing, cinematography, and visual storytelling projects.",
    url: "https://hasanbinali.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main id="main">
      <ContactView />
    </main>
  );
}
