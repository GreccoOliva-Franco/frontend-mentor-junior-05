"use client";

import ContactForm from "./contact-form";

export default function Home() {
  return (
    
    <main className="flex flex-col justify-center items-center min-h-screen p-4 bg-background">
      <section className="max-w-2xl rounded-2xl bg-surface">
        <ContactForm />
      </section>
    </main>
  );
}
