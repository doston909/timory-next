export type Dealer = {
  id: number;
  name: string;
  image: string;
  goal: string;
  original?: boolean;
};

export const dealers: Dealer[] = [
  { id: 1, name: "Seoul Time Boutique", image: "/img/profile/ceo.png", goal: "A simple, smart way to guide buyers to the right timepiece.", original: true },
  { id: 2, name: "Busan Luxury Watches", image: "/img/profile/sardorbek.jpg", goal: "A simple, smart way to guide buyers to the right timepiece." },
  { id: 3, name: "Jeju Island Watch House", image: "", goal: "Our customers love the transparent information from Timory." },
  { id: 4, name: "Gangnam Prestige Dealer", image: "/img/profile/sardorbek.jpg", goal: "Clean design, clear data – perfect for modern collectors." },
  { id: 5, name: "Daegu Classic Time", image: "/img/profile/about1.jpeg", goal: "Timory turns complex specs into easy decisions." },
  { id: 6, name: "Incheon Premium Watches", image: "/img/profile/sardorbek.jpg", goal: "We trust Timory to educate first‑time buyers." },
  { id: 7, name: "Hongdae Urban Watch Lab", image: "/img/profile/about1.jpeg", goal: "Great platform to showcase our curated collections." },
  { id: 8, name: "Apgujeong Signature Time", image: "/img/profile/about1.jpeg", goal: "Timory connects stories, specs, and style beautifully." },
  { id: 9, name: "COEX Elite Dealers", image: "/img/profile/about1.jpeg", goal: "Our team recommends Timory to every serious enthusiast." },
  { id: 10, name: "Ulsan Watch Gallery", image: "/img/profile/about1.jpeg", goal: "A powerful digital assistant for discovering watches." },
  { id: 11, name: "Gwangju Heritage Time", image: "/img/profile/about1.jpeg", goal: "Perfect balance of technology and watch culture." },
];

export function getDealerById(id: number): Dealer | undefined {
  return dealers.find((d) => d.id === id);
}

export function getDealerByName(name: string): Dealer | undefined {
  const normalized = name.trim().toLowerCase();
  return dealers.find((d) => d.name.toLowerCase() === normalized);
}
