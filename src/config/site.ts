export const siteConfig = {
  name: "The Grandview",
  fullName: "The Grandview Hotel & Resort",
  tagline: "Hotel & Resort",
  description:
    "Luxury rooms, exceptional dining, and unforgettable experiences in a setting of refined comfort and timeless beauty.",
  copyright: "© 2025 The Grandview Hotel & Resort. All rights reserved.",
  address: "12 Ridgeview Avenue, Hillside Estate",
  city: "New Delhi, India",
  phone: "+91 11 4567 8900",
  email: "reservations@thegrandview.com",
} as const;

/** Primary header links (visible in main nav) */
export const marketingNav = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Events", href: "/#experiences" },
  { label: "Offers", href: "/offers" },
] as const;

/** Links under header "More" dropdown */
export const marketingMoreNav = [
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const footerExploreLinks = [
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Special Offers", href: "/offers" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
] as const;

export const footerGuestLinks = [
  { label: "Book a Stay", href: "/rooms" },
  { label: "Concierge", href: "/contact" },
  { label: "Private Events", href: "/#experiences" },
  { label: "Spa & Wellness", href: "/#experiences" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/contact" },
  { label: "Terms of Stay", href: "/contact" },
  { label: "Accessibility", href: "/contact" },
] as const;
