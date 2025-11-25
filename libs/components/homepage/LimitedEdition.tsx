import { Stack, Box } from "@mui/material";

type SpotlightWatch = {
  id: number;
  title: string;
  model: string;
  image: string;
  rarity: string;
  price: string;
  hoverImage: string;
};

const spotlightWatches: SpotlightWatch[] = [
  {
    id: 1,
    title: "Audemars Piguet",
    model: "Royal Oak Frosted Gold",
    image: "/img/watch/rasm1.png",
    hoverImage: "/img/watch/rasm3.png",
    rarity: "Ultra-Rare",
    price: "$128,000",
  },
  {
    id: 2,
    title: "Patek Philippe",
    model: "Grand Complications 5204",
    image: "/img/watch/rasm1.png",
    hoverImage: "/img/watch/rasm3.png",
    rarity: "Collector Grade",
    price: "$245,000",
  },
  {
    id: 3,
    title: "Rolex",
    model: "Daytona Meteorite Dial",
    image: "/img/watch/rasm1.png",
    hoverImage: "/img/watch/rasm3.png",
    rarity: "Discontinued",
    price: "$78,000",
  },
  {
    id: 4,
    title: "Richard Mille",
    model: "RM 65-01",
    image: "/img/watch/rasm1.png",
    hoverImage: "/img/watch/rasm3.png",
    rarity: "Boutique-Only",
    price: "$310,000",
  },
];

const LimitedEdition = () => {
  return (
    <Stack className="limited-spotlight-section">
      <h2 className="section-title">Limited Editions Spotlight</h2>

      {spotlightWatches.length === 0 ? (
        <p className="empty-label">No Limited Editions Available</p>
      ) : (
        <Stack className="spotlight-grid">
          {spotlightWatches.map((w) => (
            <Stack key={w.id} className="spotlight-card">
              <Box className="image-box">
                <img className="main-img" src={w.image} alt={w.model} />
                <img className="hover-img" src={w.hoverImage} alt={w.model} />

                
              </Box>

              <Stack className="info">
                <span className="title">{w.title}</span>
                <p className="model">{w.model}</p>
                <span className="price">{w.price}</span>
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default LimitedEdition;
