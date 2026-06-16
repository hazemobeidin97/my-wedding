export const en = {
  nav: {
    links: [
      { label: "Our Story", href: "#story" },
      { label: "The Day", href: "#timeline" },
      { label: "Venue", href: "#venue" },
      { label: "Gallery", href: "#gallery" },
    ],
    rsvp: "RSVP",
    toggleMenu: "Toggle menu",
    switchLanguage: "Switch language",
  },
  hero: {
    tagline: "We're Getting Married",
    date: "August 25, 2026",
    names: { bride: "Layla", groom: "Hazem", and: "&" },
  },
  countdown: {
    subtitle: "Counting down to our forever",
    units: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
  },
  story: {
    eyebrow: "Our Love Story",
    heading: "Our Story",
    entries: [
      {
        label: "How We Met",
        text: "Two souls found each other when they least expected it, a chance meeting that changed everything.",
      },
      {
        label: "The Proposal",
        text: "Under the open sky, with a heart full of love, the question was asked and the answer was yes.",
      },
      {
        label: "Forever Begins",
        text: "August 25, 2026, the day we say our vows and begin the greatest adventure of our lives together.",
      },
    ],
  },
  timeline: {
    eyebrow: "August 25, 2026",
    heading: "The Day",
    events: [
      { time: "15:00", title: "Celebration Begins", desc: "We warmly welcome you to join us in celebrating this special occasion." },
      { time: "16:00", title: "Welcome Speech", desc: "A welcoming address to officially begin the celebration." },
      { time: "18:00", title: "Dinner", desc: "Let us share a meal and celebrate together." },
      { time: "22:00", title: "End of the Evening", desc: "Thank you for being part of our special day and making our celebration complete." },
    ],
  },
  notices: {
    eyebrow: "Good to Know",
    heading: "A Few Notes",
    items: [
      {
        label: "Dress Code",
        title: "Formal Attire",
        text: "These shades are reserved for the bride, so we kindly ask our female guests to avoid white, ivory, cream, or beige.",
      },
      {
        label: "Little Ones",
        title: "Adults-Only Celebration",
        text: "While we adore your little ones, we kindly request that our wedding be an adults-only occasion. We appreciate your understanding and look forward to celebrating with you.",
      },
      {
        label: "Unplugged Ceremony",
        title: "We've Got This Covered",
        text: "The most beautiful memories are held in our hearts. We kindly ask that you put your phones away and be fully present with us. We'll take care of capturing the special moments.",
      },
    ],
  },
  venue: {
    eyebrow: "The Venue",
    heading: "Where It Happens",
    name: "DIAMANT EVENTHALLE",
    addressLine1: "Wambeler Hellweg 131",
    addressLine2: "44135 Dortmund, Germany",
    date: "Tuesday, August 25 · 2026",
    doors: "Doors open at 15:00",
    cta: "Get Directions",
  },
  gallery: {
    eyebrow: "Moments We Cherish",
    heading: "Our Gallery",
    slides: [
      { label: "Together", caption: "Where it all began" },
      { label: "She Said Yes", caption: "The happiest moment" },
      { label: "Bound", caption: "A promise made in gold" },
    ],
    prev: "Previous",
    next: "Next",
    slideLabel: "Slide",
  },
  video: {
    eyebrow: "Relive The Night",
    heading: "Our Moment",
    playHint: "Click the TV to play",
    quote: "“Every love story is beautiful — but ours is my favourite.”",
  },
  rsvp: {
    eyebrow: "Join Our Celebration",
    heading: "RSVP",
    deadline: "Please respond by July 31, 2026",
    placeholders: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      message: "A message for the couple (optional)",
    },
    errors: {
      name: "Name is required",
      email: "Email is required",
      phone: "Phone is required",
      attending: "Please select attendance",
    },
    attendQuestion: "Will you attend?",
    attendance: {
      accept: "Joyfully Accepts",
      decline: "Regretfully Declines",
    },
    guestOptions: ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5 Guests"],
    sendError: "Something went wrong. Please try again.",
    sending: "Sending…",
    submit: "Send RSVP",
    success: {
      title: "Thank You",
      subtitle: "We can't wait to celebrate with you.",
    },
  },
  footer: {
    dateLocation: "August 25, 2026 · Dortmund, Germany",
    thanks: [
      "Thank you for being part of our love story.",
      "We are so grateful to celebrate with those we love most.",
    ],
    bottomDate: "08.25.2026",
  },
} as const;
