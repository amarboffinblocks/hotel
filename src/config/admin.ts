export const adminConfig = {
  title: "Admin",
  cookieName: "grandview_admin_session",
} as const;

export const adminNav = [
  { label: "Overview", href: "/admin", icon: "layout-dashboard" },
  { label: "Rooms", href: "/admin/rooms", icon: "bed-double" },
  { label: "Offers", href: "/admin/offers", icon: "tag" },
  { label: "Services", href: "/admin/services", icon: "concierge-bell" },
  { label: "Gallery", href: "/admin/gallery", icon: "images" },
  { label: "FAQs", href: "/admin/faqs", icon: "circle-help" },
  { label: "Reviews", href: "/admin/reviews", icon: "star" },
] as const;

export type AdminNavItem = (typeof adminNav)[number];
