/**
 * Global site identity. Everything personal lives here — change these values
 * first when you make the site yours.
 */
export const site = {
  name: "Gunjan Paul — Portfolio",
  /** Shown next to the `#` in the header and as the terminal prompt handle. */
  shortName: "gpaul",
  description:
    "Dev. Pics. Pens. Software for creative workflows, photography of analog tools, and handmade craft.",
  url: "https://example.com",
  author: "Gunjan Paul",
  email: "hello@gpaul.dev",
  links: {
    linkedin: "https://www.linkedin.com/in/gunjanpaul",
    x: "https://x.com/hi_gpaul",
  },
  /** Booking link on the contact page. */
  meeting: {
    url: "https://calendly.com/gunjanpaul-dev/30min",
    /** Label row above the card — mirrors the form's field labels. */
    provider: "Calendly",
    /** Keep in sync with the event you point at. */
    duration: "30 min",
  },
} as const;
