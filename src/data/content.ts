export type Experience = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Restaurant & Dining",
    description: "Delicious food crafted by expert chefs.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCocMnK95hJkWonr1ORmAMFGbWzAhZkDgJ0MuhdqbvjtIs7RQZLueLsXlOfJUJ9F0U-jRs4x3JDBmzVNCijQ3gWOdPdDwbl0dKGFZUDbWDcDc8WUPfS68HVheNQf8MII2EFhB5vZbb44RNkG5Jrk6hUdsF4swJGtU0TmHMECuZDsdt3e6ayUZXWZn0GQDELQv2hA7kLC99JB7Y2Qai9eVXvLP2GcZUUEmkLFNrMaAgBcWdEAWk58lkT",
  },
  {
    id: "2",
    title: "Events & Celebrations",
    description: "Make every moment truly unforgettable.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB63jNUDx1VE5yEzt3rGTfPYYWDfN6vshLxuFexXr8s0eQaHGrFB2kBRA_KX1T9GNEcehGVeY2QEYabt4HpTM-20vgrmW1JRpz6VQnxFqAXS6u-6eDwEHtWjGUBZcSXwkZXlzvtywngaU0DrdkTXTqzDbggxG0w1czelQx04U8O5IzsyXJQMIfqipAQ-MAM3o0nBcZYxhEnKL-0i5CDxVr9ek9g8WPprCgABcVzMGLr9XNf7J7-GrUZ",
  },
  {
    id: "3",
    title: "Weddings",
    description: "Dream weddings with perfect arrangements.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDR6QJ24Yixjr0dljXF5B42nitxgv7kct9poNkf_SP6KXxAYIlOIiyK1H_nmZBm9zXchk0-gVVatAKPoq5dpoSEQCpu0NAKSKmkbcxJSYZP8tpl1CV7-BN2XaZGmNIVRz-sqpMjNjUfm9VqDMq8Z7DTKorpq2S80tzfjqaklx1SpihBpOH6W8kiqszUFPEwEwdPBp3LIoej057rfY1ssPAXl7lwg1WY8_aUyp605714MUQodney_gVH",
  },
  {
    id: "4",
    title: "Corporate Events",
    description: "Professional spaces for meetings & conferences.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9vVCKG5_tqKsTXpH7J7ayavKd9edawBt1fBa0949gtvogGjQ5Z9cYae_zsWkRUhyI-Kk96OIx2RQ8l7c59VPf-8DecTNDCay_sJgK5tUAoeN_wq3b-mvpEALdq31hAWoZLNlxr_lsezcAGU7UkvsCxW_DBh32yUxRulHneRtU_KjJO7BIFvM_a_SUFs0dRNdt0ZoIoG1Ewy-02-nsWIRj77CsjJnPLdqDUBsX3NfxPfrg6oVorU4O",
  },
];

export const services = [
  {
    number: "01",
    title: "Restaurant",
    description:
      "Seasonal ingredients, a considered wine list, and a dining room that is genuinely worth the visit.",
  },
  {
    number: "02",
    title: "Garage & Parking",
    description:
      "Secure underground parking with valet service, EV charging, and 24-hour security on each level.",
  },
  {
    number: "03",
    title: "Laundry",
    description:
      "Same-day laundry, dry cleaning, and pressing for all garments. Drop off by 9am and back by evening.",
  },
  {
    number: "04",
    title: "Spa & Wellness",
    description:
      "A full-service spa with pool, sauna, steam room, and a complete treatment menu for every guest.",
  },
] as const;

export const trustItems = [
  {
    title: "Best Price Guarantee",
    description: "Exclusive rates & perks when booking direct",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Flexible Cancellation",
    description: "Stress-free bookings with easy modifications",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Complimentary Wi-Fi",
    description: "High-speed fibre internet resort-wide",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "24/7 Support",
    description: "Personal concierge ready at any hour",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "100% Secure",
    description: "Encrypted payment & protected data",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
  },
] as const;

export const heroContent = {
  headline: "Stay Somewhere Worth Remembering",
  subheadline:
    "Luxury rooms, exceptional dining, and unforgettable experiences in a setting of refined comfort and timeless beauty.",
  /** Local poster (extracted from hero video) */
  backgroundImage: "/videos/hero-poster.jpg",
  /** Local muted loop — served from /public/videos */
  videoSrc: "/videos/hero.mp4",
};

export const servicesBackdropImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCI6m4NFIi_6YZWIMHU0PUtWV67OFaX_V7EValDhRvkZbXPbB13JgxTr6R4wHrvqf5xJ8JPAQYegsrWNK2MEeu767VzFrYyEqSk_XniykEPhPGAWbI49x6Ws-rhfhKwNDBLleG-3966nq1t6abVb6Hb7YGiocDnOc4tdXcNRwQvWqNftLRSl5THr3uT9I1wLunPwb7BgFEiotRfIjwNQpjLdMIOoAXMT1Pn_Mv9HzqbKUauGwHu9efx";

export const ctaBackdropImage =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80";

/** Background images for inner-page heroes */
export const pageHeroImages = {
  rooms:
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=2000&q=80",
  offers:
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80",
  gallery:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80",
  about:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80",
  contact:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80",
  booking:
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2000&q=80",
} as const;

export const aboutStory = {
  eyebrow: "Our Heritage",
  title: "A sanctuary shaped by quiet luxury",
  lead: "Every stay should feel considered, personal, and worth remembering.",
  paragraphs: [
    "The Grandview began as a hillside retreat for travellers seeking calm above the city. Over the years it has grown into a full hotel and resort — still guided by that same idea.",
    "Today our rooms, dining rooms, and event spaces are designed around light, landscape, and unhurried service. We host weekends away, celebrations, and long work trips with the same attention — so guests leave rested, not rushed.",
  ],
  meta: "Hillside Estate · New Delhi",
  image:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  imageAlt: "Sunlit suite interior at The Grandview",
  secondaryImage:
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  secondaryImageAlt: "Pool terrace and resort grounds at dusk",
} as const;

export const aboutValues = [
  {
    title: "Attentive service",
    description:
      "Concierge and floor teams who anticipate needs without crowding your space.",
  },
  {
    title: "Thoughtful design",
    description:
      "Rooms and public areas shaped for rest, privacy, and a clear sense of place.",
  },
  {
    title: "Honest hospitality",
    description:
      "Clear rates, flexible bookings when possible, and no surprises at checkout.",
  },
  {
    title: "Culinary craft",
    description:
      "Seasonal menus and spaces meant for long meals, not quick transactions.",
  },
] as const;

