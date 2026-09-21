export type Review = {
  id: string;
  name: string;
  city: string;
  quote: string;
  rating: number;
  avatar: string;
};

export const reviews: Review[] = [
  {
    id: "1",
    name: "Rohit Sharma",
    city: "New Delhi",
    quote:
      "The stay was absolutely amazing! The staff was courteous, the rooms were clean and the food was exceptional.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    name: "Ananya Verma",
    city: "Mumbai",
    quote:
      "Perfect place for a weekend getaway. Beautiful property with all modern amenities.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286db2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "3",
    name: "Vikram Malhotra",
    city: "Bangalore",
    quote:
      "We celebrated our anniversary here and everything was perfect. Highly recommended!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "4",
    name: "Priya Nair",
    city: "Kochi",
    quote:
      "From check-in to checkout, every detail felt intentional. The spa and dining made our family trip unforgettable.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "5",
    name: "Arjun Mehta",
    city: "Ahmedabad",
    quote:
      "Quiet rooms, excellent service, and a location that made exploring effortless. We will book again.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "6",
    name: "Sneha Kapoor",
    city: "Chandigarh",
    quote:
      "A refined stay with warm hospitality. The evening ambience and breakfast were standout moments.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
];
