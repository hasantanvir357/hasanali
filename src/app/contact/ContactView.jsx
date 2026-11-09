"use client";

import ContactCTA from "@/components/sections/ContactCTA";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactView() {
  return (
    <ContactCTA
      as="h1"
      index="01"
      sectionId="contact-page"
      headingId="contact-page-title"
      className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-28"
    >
      <ContactForm />
    </ContactCTA>
  );
}
