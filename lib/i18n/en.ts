export const en = {
  nav: {
    links: [
      { label: "Our Story", href: "#story" },
      { label: "The Day", href: "#timeline" },
      { label: "Venue", href: "#venue" },
      { label: "Gallery", href: "#gallery" },
      { label: "RSVP", href: "#rsvp" },
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
      { time: "17:00", title: "Guest Arrival", desc: "Welcome to our celebration — find your seat and soak in the atmosphere." },
      { time: "17:30", title: "Welcome Drinks", desc: "Champagne, cocktails & light refreshments in the garden." },
      { time: "18:00", title: "Wedding Ceremony", desc: "The sacred moment — our vows, our rings, our forever." },
      { time: "20:00", title: "Wedding Dinner", desc: "A feast prepared with love, shared with the people we cherish most." },
      { time: "22:00", title: "Celebration & Dancing", desc: "Music fills the room — dance with us all night long." },
      { time: "00:00", title: "Special Moments", desc: "A night written in stars, a memory carried forever." },
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
        text: "We kindly invite you to put away your phones and be fully present with us on our special day. A professional photography team has been hired to capture every precious moment, so you can relax and enjoy the celebration with us. We look forward to sharing these beautiful memories with you afterward.",
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
    doors: "Doors open at 17:00",
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
