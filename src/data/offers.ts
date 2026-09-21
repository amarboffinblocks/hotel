export type Offer = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceLabel: string;
  priceNote: string;
  image: string;
};

export const offers: Offer[] = [
  {
    id: "1",
    slug: "weekend-escape",
    name: "Weekend Escape",
    description: "Relax and unwind with our weekend special package.",
    priceLabel: "₹9,999",
    priceNote: "/ night",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbfmMCxwoKXrZMBekHwO3EYaCNWnTcydG_pRinW5gh9TUrO2--ZcZmSgjtGsKgLv_GwMB4JOTzSEY26HGwD96-9qcF8gZjrtV0AJ31fV6_Or_nhgxeebO9LrGoSocVv7JaKc3PUrsbWqfZMnvtsxsLcp5H09rD_Bv30o1U8_hVRGM5AyQpwiO9kcVwkwghwCO-3LInrgFZ3fVW9tXcqJoXsX8c0VZEHHoMlX3RwEXDsiY9ZRPogCd6",
  },
  {
    id: "2",
    slug: "stay-3-pay-2",
    name: "Stay 3 Nights, Pay for 2",
    description: "Stay longer and save more with this special offer.",
    priceLabel: "₹17,999",
    priceNote: "/ 3 Nights",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1v7IO9G1MEFjLbBvgEi-p2cnuwm0UxCIhoNii-dcuG_e3JHslc5M3_TxIf6vh996GL1wwBEWAbgz05_RbKEY8YNg29WH7g4Zj2hvKJiD-4LgXJNkqOF_liIvlXi-dMUUlE3s6uiCq0f3fnaIYdMpkmOYC62ZeXMfKrUgy4kIBsFPzFRud4ubDNYeE_aGYHHEFWFytVGNmKTe_Hy2jORCsE45ZxO_dMgPBIXrmPDc7OqMVTzgD8aZM",
  },
  {
    id: "3",
    slug: "romantic-getaway",
    name: "Romantic Getaway",
    description: "Perfect package for couples and honeymooners.",
    priceLabel: "₹12,999",
    priceNote: "/ night",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAYYuxOeWL097bJizq4Av3BDU7Fu2RoBiD1P_hJTSL_axnnL7fvUGjJQQHn17ylAd_39fY8hkxZPMcFvaqGPZ7hsydUIyzDtdp9p3sUd2LrDSgDdT19BPiAK62GrYwOOj5MjJ-wT5C1HfjKYsEGJDTDw5hkaM4PXnP5yoJD9x_lDBJcURUwc0XZ-I0DMUEtR6GELymeZfYEck2gd6nZlcdiBnhOluB4cFqz8VS0lZpR2dOomgx1hrF",
  },
  {
    id: "4",
    slug: "family-package",
    name: "Family Package",
    description: "Comfortable stay with exciting benefits for family.",
    priceLabel: "₹15,999",
    priceNote: "/ night",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgDG_qn2Na-H0IoC1E_wjgBswKQVIw4Cf4RLuz92U0fl2KjYltExEKPu-LoQmAdcqa3hP13u1AivkxZEIPSU2UieagB9DJnaysAqEYbCnUzuHK58wDXRK5ZloxkNnhi6_fXAho_v8mcxWfqyiv4SQksEwVjlCGDETWUzOARcKUQtMkbtxSaFyqHxR9FZ88WH5--mP7Ww-ogjRKwXPmjBt7--HO2ts6EZ2iHKyNvxgotPKdNRGS15F1",
  },
];
