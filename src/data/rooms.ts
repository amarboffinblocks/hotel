export type Room = {
  id: string;
  slug: string;
  name: string;
  view: string;
  guests: number;
  sizeSqFt: number;
  bedType: string;
  pricePerNight: number;
  image: string;
  gallery: string[];
  video?: {
    src: string;
    poster: string;
    alt?: string;
  };
  popular?: boolean;
  description: string;
  longDescription: string;
  highlights: string[];
  amenities: string[];
  included: string[];
};

const sharedGallery = {
  bath: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
  lounge: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  desk: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
  balcony:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  dining: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
} as const;

export const rooms: Room[] = [
  {
    id: "1",
    slug: "deluxe-room",
    name: "Deluxe Room",
    view: "City View",
    guests: 2,
    sizeSqFt: 320,
    bedType: "King bed",
    pricePerNight: 8500,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARXuEHHpGSumfL3fITMKQ_tmX0vRpMi_anKT4xnNxm_zma_E6mAvygWIoGYOyOssLvfk-DLBMDxA0WItumxjRyjE-RkRZXQ32AbzKLmpUaiy0XrVq7siOo09kk3tvYm7YwXjkACmYg15rilMf1wyGbj7PzMrLx9S5K7t53bzyNG_veAF4l0GCXU61y6HZau7ix0hWnSrBzWaip_S9JCkSc-cY2QNYkZOuP_tdy0UiHvvS8QXFLem-_",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARXuEHHpGSumfL3fITMKQ_tmX0vRpMi_anKT4xnNxm_zma_E6mAvygWIoGYOyOssLvfk-DLBMDxA0WItumxjRyjE-RkRZXQ32AbzKLmpUaiy0XrVq7siOo09kk3tvYm7YwXjkACmYg15rilMf1wyGbj7PzMrLx9S5K7t53bzyNG_veAF4l0GCXU61y6HZau7ix0hWnSrBzWaip_S9JCkSc-cY2QNYkZOuP_tdy0UiHvvS8QXFLem-_",
      sharedGallery.bath,
      sharedGallery.desk,
      sharedGallery.lounge,
    ],
    description:
      "Thoughtfully appointed space with refined furnishings and a restful city outlook.",
    longDescription:
      "Our Deluxe Room is designed for unhurried city stays — soft lighting, tailored linens, and a calm workspace overlooking the skyline. Ideal for couples or solo travellers who want comfort without excess.",
    highlights: [
      "Floor-to-ceiling city outlook",
      "Rain shower with premium toiletries",
      "Dedicated work desk with USB charging",
      "Blackout curtains for restful sleep",
    ],
    amenities: [
      "King bed",
      "Rain shower",
      "Work desk",
      "Complimentary Wi-Fi",
      "Smart TV",
      "Mini fridge",
      "In-room safe",
      "Climate control",
    ],
    included: [
      "Daily housekeeping",
      "Bottled water refreshed daily",
      "Access to fitness centre",
      "High-speed Wi-Fi",
    ],
  },
  {
    id: "2",
    slug: "executive-room",
    name: "Executive Room",
    view: "City View",
    guests: 2,
    sizeSqFt: 380,
    bedType: "King bed",
    pricePerNight: 11500,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsi2oBZbsBJk1FpCY-MoJFi7QEwFRoGm5pAZiEdR2emjb-Ws2c8Z8PKVPOEDvd8SIky92HZvKzmOzLu3S0x3GRp3G8gnLwsHaXJYNipvcOCbhHUhPbClVXqD8SwoJMsKlLv8AtPEDsSoQq0dBJZmcluBcRW0Kz99rOeN1Am49AANbiisKgN8PmDrcmwsklR8mqEuAASctos3UMZ2kL_3wuFRmkffNOmYnbB2NQHoBJrpoA90STbksV",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsi2oBZbsBJk1FpCY-MoJFi7QEwFRoGm5pAZiEdR2emjb-Ws2c8Z8PKVPOEDvd8SIky92HZvKzmOzLu3S0x3GRp3G8gnLwsHaXJYNipvcOCbhHUhPbClVXqD8SwoJMsKlLv8AtPEDsSoQq0dBJZmcluBcRW0Kz99rOeN1Am49AANbiisKgN8PmDrcmwsklR8mqEuAASctos3UMZ2kL_3wuFRmkffNOmYnbB2NQHoBJrpoA90STbksV",
      sharedGallery.lounge,
      sharedGallery.desk,
      sharedGallery.bath,
    ],
    description:
      "Extra space and elevated amenities for guests who value comfort and quiet productivity.",
    longDescription:
      "The Executive Room pairs a generous layout with lounge seating and a proper work zone — so mornings feel productive and evenings feel considered. A refined choice for longer stays and business travel.",
    highlights: [
      "Separate lounge seating area",
      "Nespresso machine & mini bar",
      "Enhanced toiletries & soft robes",
      "Priority late check-out (subject to availability)",
    ],
    amenities: [
      "King bed",
      "Lounge seating",
      "Mini bar",
      "Nespresso",
      "Complimentary Wi-Fi",
      "Smart TV",
      "Bathrobe & slippers",
      "In-room safe",
    ],
    included: [
      "Daily housekeeping",
      "Evening turndown on request",
      "Access to fitness centre",
      "Complimentary Wi-Fi",
    ],
  },
  {
    id: "3",
    slug: "premium-suite",
    name: "Premium Suite",
    view: "Pool View",
    guests: 2,
    sizeSqFt: 520,
    bedType: "King bed",
    pricePerNight: 16500,
    popular: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDydMiL1_aHyooE1XvzwZn7PY3LEIWioWBNgWsCSngdLdWLih3jcdeDgFCwchP00AaZQ-8p3pWUoBbyjHGGGINgvTdxyTe8c0NHaQ_-BKDczKfoRA6wLOw3g-Tq-Jh9YuYRgvNmGu3FqXcwR7BYG5j77CRdyK2XfmktEW7HPqciHZIeltSLRjohtAugUT0qC6HB1TtfrnfrbDs0bNnNHyZfqVFDob3Fn5MkYk87lPwFDI56OGzoj0C5",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDydMiL1_aHyooE1XvzwZn7PY3LEIWioWBNgWsCSngdLdWLih3jcdeDgFCwchP00AaZQ-8p3pWUoBbyjHGGGINgvTdxyTe8c0NHaQ_-BKDczKfoRA6wLOw3g-Tq-Jh9YuYRgvNmGu3FqXcwR7BYG5j77CRdyK2XfmktEW7HPqciHZIeltSLRjohtAugUT0qC6HB1TtfrnfrbDs0bNnNHyZfqVFDob3Fn5MkYk87lPwFDI56OGzoj0C5",
      sharedGallery.lounge,
      sharedGallery.bath,
      sharedGallery.balcony,
    ],
    video: {
      src: "/videos/hero.mp4",
      poster: "/videos/hero-poster.jpg",
      alt: "Premium Suite experience film",
    },
    description:
      "Separate living area and pool-facing windows for a more expansive stay.",
    longDescription:
      "The Premium Suite opens into a distinct living space with pool-facing light. A soaking tub, butler-ready service cues, and quieter evenings make it ideal for celebrations or a proper escape.",
    highlights: [
      "Separate living & sleeping areas",
      "Pool-facing windows",
      "Soaking tub & rain shower",
      "Butler service on request",
    ],
    amenities: [
      "Living area",
      "Soaking tub",
      "Pool view",
      "Butler service",
      "King bed",
      "Nespresso",
      "Complimentary Wi-Fi",
      "Smart TV",
    ],
    included: [
      "Daily housekeeping & turndown",
      "Welcome amenities",
      "Access to spa facilities",
      "Complimentary Wi-Fi",
    ],
  },
  {
    id: "4",
    slug: "presidential-suite",
    name: "Presidential Suite",
    view: "Panoramic View",
    guests: 2,
    sizeSqFt: 800,
    bedType: "Two bedrooms",
    pricePerNight: 25000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAg99O5cqVYP9XjlaGxgWwy9ROPd9taIgVebOgarBKIcqpDQKjj1UV7VLL6LWyZmTxFnFeBrO8nc8EQ1PgdgB6r_QWsf4B0D7YrBr1i-EqUOyuzsjgMGIf2pbHqFxTscaKdP5tcwq0Txu_FTiZZH7yEwzk3EB44-jru4vSUV9Bur9RxV-pm9SP9vpkJED2nXOah0zMFsFYUkIYEdMImAI1DkBveNdbW7oJ1sntusy9mRliQTsAzzEIh",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAg99O5cqVYP9XjlaGxgWwy9ROPd9taIgVebOgarBKIcqpDQKjj1UV7VLL6LWyZmTxFnFeBrO8nc8EQ1PgdgB6r_QWsf4B0D7YrBr1i-EqUOyuzsjgMGIf2pbHqFxTscaKdP5tcwq0Txu_FTiZZH7yEwzk3EB44-jru4vSUV9Bur9RxV-pm9SP9vpkJED2nXOah0zMFsFYUkIYEdMImAI1DkBveNdbW7oJ1sntusy9mRliQTsAzzEIh",
      sharedGallery.dining,
      sharedGallery.lounge,
      sharedGallery.bath,
    ],
    video: {
      src: "/videos/hero.mp4",
      poster: "/videos/hero-poster.jpg",
      alt: "Presidential Suite cinematic tour",
    },
    description:
      "Our signature residence with panoramic views and bespoke hospitality.",
    longDescription:
      "The Presidential Suite is The Grandview’s signature residence — panoramic light, private dining, and concierge attention that feels personal rather than procedural. Designed for milestone stays and guests who expect more space.",
    highlights: [
      "Panoramic skyline & estate views",
      "Private dining for intimate hosting",
      "Dedicated concierge liaison",
      "Two-bedroom layout with lounge",
    ],
    amenities: [
      "Two bedrooms",
      "Private dining",
      "Panoramic view",
      "Concierge",
      "Living lounge",
      "Soaking tub",
      "Complimentary Wi-Fi",
      "Butler service",
    ],
    included: [
      "Personalised check-in",
      "Daily housekeeping & turndown",
      "Spa access for two",
      "Welcome champagne on arrival",
    ],
  },
  {
    id: "5",
    slug: "garden-room",
    name: "Garden Room",
    view: "Garden View",
    guests: 2,
    sizeSqFt: 340,
    bedType: "Queen bed",
    pricePerNight: 9500,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      sharedGallery.balcony,
      sharedGallery.bath,
      sharedGallery.desk,
    ],
    description:
      "Calm garden-facing room with soft natural light and a quiet corner for rest.",
    longDescription:
      "The Garden Room sits closer to greenery and quieter mornings. Soft natural light, a private balcony outlook, and a restful palette make it a favourite for guests seeking calm over the city edge.",
    highlights: [
      "Garden-facing balcony outlook",
      "Soft natural light throughout",
      "Quiet corner seating",
      "Complimentary Wi-Fi & rain shower",
    ],
    amenities: [
      "Queen bed",
      "Garden balcony",
      "Rain shower",
      "Complimentary Wi-Fi",
      "Smart TV",
      "Mini fridge",
      "In-room safe",
      "Climate control",
    ],
    included: [
      "Daily housekeeping",
      "Bottled water refreshed daily",
      "Access to fitness centre",
      "High-speed Wi-Fi",
    ],
  },
  {
    id: "6",
    slug: "family-suite",
    name: "Family Suite",
    view: "Courtyard View",
    guests: 4,
    sizeSqFt: 620,
    bedType: "Two bedrooms",
    pricePerNight: 18500,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      sharedGallery.lounge,
      sharedGallery.dining,
      sharedGallery.bath,
    ],
    description:
      "Spacious suite designed for families, with a separate lounge and flexible sleeping.",
    longDescription:
      "Built for families who want space without feeling institutional — two bedrooms, a lounge for shared evenings, and thoughtful kids amenities. Connecting options can be arranged when available.",
    highlights: [
      "Two-bedroom family layout",
      "Separate lounge for shared time",
      "Kids amenities on request",
      "Connecting-room option available",
    ],
    amenities: [
      "Two bedrooms",
      "Lounge",
      "Kids amenities",
      "Connecting option",
      "Complimentary Wi-Fi",
      "Smart TV",
      "Mini fridge",
      "Bathrobe & slippers",
    ],
    included: [
      "Daily housekeeping",
      "Welcome amenities for children",
      "Access to fitness centre",
      "Complimentary Wi-Fi",
    ],
  },
];

export const roomStayPolicies = [
  {
    title: "Check-in & check-out",
    body: "Check-in from 2:00 PM. Check-out by 11:00 AM. Early arrival or late departure can be arranged subject to availability.",
  },
  {
    title: "Cancellation",
    body: "Standard rates allow free cancellation up to 24 hours before arrival. Prepaid and offer rates may have different terms shown at booking.",
  },
  {
    title: "Guests & occupancy",
    body: "Rates are based on the room’s listed occupancy. Extra beds or cribs can be added on request for a fee.",
  },
  {
    title: "Smoking & pets",
    body: "All guestrooms are non-smoking. Pets are not permitted, except registered assistance animals.",
  },
] as const;

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}

export function getRelatedRooms(slug: string, limit = 3) {
  return rooms.filter((room) => room.slug !== slug).slice(0, limit);
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
