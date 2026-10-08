export type Faq = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
};

export const faqs: Faq[] = [
  {
    id: "1",
    question: "What is the check-in and check-out time?",
    answer:
      "Check-in begins at 2:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be arranged subject to availability — share your preference when you book.",
    sortOrder: 0,
    published: true,
  },
  {
    id: "2",
    question: "Can I request an extra bed or crib?",
    answer:
      "Yes. Extra beds and baby cribs can be added on request for a fee. Please mention this while booking, or speak with our concierge before arrival.",
    sortOrder: 1,
    published: true,
  },
  {
    id: "3",
    question: "Is breakfast included with the room?",
    answer:
      "Breakfast is available as an add-on or package inclusion. Direct bookings may include seasonal breakfast privileges depending on the rate selected.",
    sortOrder: 2,
    published: true,
  },
  {
    id: "4",
    question: "Do rooms have a city or garden view?",
    answer:
      "Views vary by category. Deluxe and Executive rooms typically face the city or courtyard; Suites and Garden rooms offer greenery or panoramic outlooks. You can note a preference at booking.",
    sortOrder: 3,
    published: true,
  },
  {
    id: "5",
    question: "Is smoking allowed in the rooms?",
    answer:
      "All guestrooms are non-smoking. Designated outdoor smoking areas are available on property. A cleaning fee applies if smoking occurs indoors.",
    sortOrder: 4,
    published: true,
  },
  {
    id: "6",
    question: "What is your cancellation policy?",
    answer:
      "Most standard rates allow free cancellation up to 24 hours before arrival. Special offers and prepaid rates may have different terms, shown clearly at booking.",
    sortOrder: 5,
    published: true,
  },
];
