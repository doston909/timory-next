import AiPage, { AiWatchResult } from "@/pages/ai";
import { Stack, Box, Button, Typography, TextField, Select, MenuItem } from "@mui/material";
import { useState } from "react";


const CreateAI = () => {
  const [form, setForm] = useState({
    gender: "",
    style: "",
    budget: "",
    wrist: "",
    color: "",
    occasion: "",
  });

  const [results, setResults] = useState<AiWatchResult[]>([]);

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleRecommend = () => {
    console.log("SEND TO AI:", form);
    
    // Mock AI results based on form data
    const mockResults: AiWatchResult[] = [
      {
        model: "Submariner",
        brand: "Rolex",
        price: "$8,500",
        image: "/img/watch/rasm1.png",
        reason: `Perfect match for ${form.style || "classic"} style with ${form.color || "silver"} preference`,
        description: "A timeless classic that combines luxury with functionality. Ideal for both casual and formal occasions."
      },
      {
        model: "Speedmaster",
        brand: "Omega",
        price: "$6,200",
        image: "/img/brand/watch2.png",
        reason: `Excellent choice for ${form.gender || "men"} with ${form.budget || "mid-range"} budget`,
        description: "Precision engineering meets elegant design. This watch is built for those who appreciate craftsmanship."
      },
      {
        model: "Royal Oak",
        brand: "Audemars Piguet",
        price: "$15,000",
        image: "/img/brand/watch3.png",
        reason: `Premium selection matching your ${form.style || "luxury"} preference`,
        description: "An iconic timepiece that represents the pinnacle of Swiss watchmaking excellence."
      }
    ];
    
    setResults(mockResults);
  };

  return (
    <Stack className="ai-finder-section">
      <Typography className="title">AI-Powered Watch Finder</Typography>
      <Typography className="subtitle">
        Tell us your style — Timory AI will pick the perfect watch for you.
      </Typography>

      <Stack className="form-box">
        <Select
          displayEmpty
          value={form.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
        >
         
          <MenuItem value="men">Men</MenuItem>
          <MenuItem value="women">Women</MenuItem>
        
        </Select>

        <Select
          displayEmpty
          value={form.style}
          onChange={(e) => handleChange("style", e.target.value)}
        >
         
          <MenuItem value="luxury">Luxury</MenuItem>
          <MenuItem value="classic">Classic</MenuItem>
          <MenuItem value="sport">Sport</MenuItem>
          <MenuItem value="minimal">Minimal</MenuItem>
        </Select>

        <Select
          displayEmpty
          value={form.budget}
          onChange={(e) => handleChange("budget", e.target.value)}
        >
          <MenuItem value="">Budget</MenuItem>
          <MenuItem value="2000-5000">$2,000 — $5,000</MenuItem>
          <MenuItem value="5000-10000">$5,000 — $10,000</MenuItem>
          <MenuItem value="10000+">$10,000+</MenuItem>
        </Select>

        <Select
          displayEmpty
          value={form.color}
          onChange={(e) => handleChange("color", e.target.value)}
        >
          <MenuItem value="">Color Preference</MenuItem>
          <MenuItem value="gold">Gold</MenuItem>
          <MenuItem value="silver">Silver</MenuItem>
          <MenuItem value="black">Black</MenuItem>
          <MenuItem value="rose">Rose Gold</MenuItem>
        </Select>
      </Stack>

      <Button className="recommend-btn" onClick={handleRecommend}>
        Recommend Watches →
      </Button>

      {results.length > 0 && (
        <Box className="ai-result-grid">
          {results.map((item, index) => (
            <AiPage key={index} item={item} />
          ))}
        </Box>
      )}
    </Stack>
  );
};

export default CreateAI;
