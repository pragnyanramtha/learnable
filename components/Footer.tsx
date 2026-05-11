import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="border-t border-[color:rgba(237,224,196,0.18)] bg-[color:rgba(15,37,71,0.94)]"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <section aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="font-display text-3xl text-[var(--color-cream)]">
            LearnABLE
          </h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--color-text-secondary)]">
            Accessible, audio-first support for blind and visually impaired students. Use this platform for class notes and quizzes, then return to the main site for the full LearnABLE experience.
          </p>
        </section>

        <section aria-labelledby="footer-links-heading">
          <h3 id="footer-links-heading" className="font-display text-2xl text-[var(--color-cream)]">
            Links
          </h3>
          <div className="mt-3 flex flex-col gap-3 text-sm">
            <Link
              href="https://learnableindia.org"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit LearnABLE India website"
              className="text-[var(--color-text-secondary)] underline decoration-[color:rgba(237,224,196,0.4)] underline-offset-4 hover:text-[var(--color-cream)] focus-visible:outline-none"
            >
              learnableindia.org
            </Link>
            <Link
              href="https://www.instagram.com/learnable_india/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit LearnABLE India Instagram profile"
              className="text-[var(--color-text-secondary)] underline decoration-[color:rgba(237,224,196,0.4)] underline-offset-4 hover:text-[var(--color-cream)] focus-visible:outline-none"
            >
              Instagram: @learnable_india
            </Link>
          </div>
        </section>

        <section aria-labelledby="footer-contact-heading">
          <h3 id="footer-contact-heading" className="font-display text-2xl text-[var(--color-cream)]">
            Contact
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
            For support, volunteering, and partnership enquiries, use the contact route on the main LearnABLE site.
          </p>
          <Link
            href="https://learnableindia.org"
            target="_blank"
            rel="noreferrer"
            aria-label="Go to LearnABLE India to contact the team"
            className="mt-3 inline-block text-sm text-[var(--color-cream)] underline decoration-[color:rgba(237,224,196,0.45)] underline-offset-4 hover:text-white focus-visible:outline-none"
          >
            Contact LearnABLE
          </Link>
        </section>
      </div>
    </footer>
  );
}
