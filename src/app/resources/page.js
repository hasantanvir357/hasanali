import ResourcesView from "./ResourcesView";

export const metadata = {
  title: "Resources",
  description:
    "ডিজিটাল অ্যাসেট, রেজিস্ট্রেশন ঘোষণা ও অনলাইন সেশন — সব এক জায়গায়। Digital assets, registration announcements and online sessions by Hasan Bin Ali.",
  openGraph: {
    title: "Resources — Hasan Bin Ali",
    description:
      "Digital assets, registration announcements and online sessions — all in one place.",
    url: "https://hasanbinali.com/resources",
  },
};

export default function ResourcesPage() {
  return (
    <main id="main">
      <ResourcesView />
    </main>
  );
}
