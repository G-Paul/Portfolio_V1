/** Every string on the site. Edit here, not in the components. */
export const copy = {
  nav: {
    works: "works",
    contact: "contact",
  },
  home: {
    intro: "Hello world, I'm",
    /** Typed under the intro line — the h1 itself is `site.author`. */
    identityTags: ["Dev.", "Bots.", "Fun.", "Make things."],
    identityLead:
      "I love building robots - hardware, software, electronics, design - everything. It was my childhood dream - and somehow it became the thing I do every day.",
    identityBody:
      "I work as a Robotics Engineer in Eyecandy Robotics where we make robots that are fun and entertaining. Also we make them jump and dance sometimes.",
    contactLabel: "Contact me",
    domainTitle: "Worlds",
    domainHint:
      "Each place I worked in has been a world in itself from where I learnt a lot. Here are all of them:",
    present: "Present",
    featuredWork: "Featured Work",
    featuredWorkHint:
      "I have made a bunch of stuff, but here are some that I'm proud of -",
    ctaTitle: "I'd like to hear how you work",
    ctaBody:
      "I'm always curious how people in this field think — how they got here, what they're figuring out, what they'd do differently. Tell me about yours and I'll tell you about mine.",
    ctaButton: "Start a conversation",
  },
  work: {
    ongoing: "Ongoing",
    title: "Works",
    intro: "Things I have designed, built and shipped.",
    contents: "Contents",
    backTo: "All works",
    readingTime: "min read",
    tags: "Tags",
    empty: "Nothing published here yet — content is on the way.",
  },
  contact: {
    prompt: "echo $contact",
    title: "Get in touch",
    intro:
      "Always keen to meet people working in this space. Tell me what you're up to, ask me anything, or just say hi.",
    formHeading: "→ send a message",
    meetHeading: "→ wanna meet sometime?",
    meetLabel: "Book a call",
    directHeading: "→ or reach out directly",
    name: "Name",
    nameHint: "2–80 characters",
    email: "Email",
    message: "Message",
    submit: "Send message",
    success: "Opening your mail app…",
    invalid: "Please fill in every field correctly.",
    channels: {
      email: "Email",
      linkedin: "LinkedIn",
      x: "X",
    },
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with Next.js · Tailwind · TypeScript",
  },
  a11y: {
    skipToContent: "Skip to content",
    home: "home",
    primaryNav: "Primary",
    footerNav: "Footer",
    menu: "Menu",
    siteFooter: "Site footer",
    introduction: "Introduction",
  },
} as const;

/** Ordered nav entries shared by the header and the footer. */
export const navItems = [
  { key: "works", label: copy.nav.works, href: "/works/" },
  { key: "contact", label: copy.nav.contact, href: "/contact/" },
] satisfies { key: string; label: string; href: string }[];
