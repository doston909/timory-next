import { NextPage } from "next";
import { Stack, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ArrowForward } from "@mui/icons-material";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import Footer from "@/libs/components/Footer";

type BrandStory = {
  id: number;
  brand: string;
  image1: string;
  image2: string;
  image3: string;
  name: string;
  year: string;
  quote: string;
  content1: string;
  content2: string;
};

const stories: BrandStory[] = [
  {
    id: 1,
    brand: "Rolex",
    image1: "/img/profile/serge.png",
    image2: "/img/watch/rasm3.png",
    image3: "/img/watch/rasm3.png",
    name: "Sergey",
    year: "Data / AI",
    quote:
      "AI should serve people, not complexity. I focus on transforming data into practical models that improve discovery, recommendations, and decision-making.",
    content1:
      "Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.This story began with a simple question: how can we make discovering watches feel as intelligent as the timepieces themselves? Sergey led the data and AI work that powers our recommendations, connecting thousands of datapoints into something that feels natural and human. Instead of complex dashboards, he focused on clarity, trust, and subtle intelligence that quietly guides every decision.",
    content2:
      "Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient. Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.Torbi tincidunt augue Behind every suggestion there is a model, but behind every model there is intent. Sergey’s philosophy is that technology should disappear behind experience: fast, accurate, and honest. This brand story is not about algorithms – it is about people finding exactly what reflects their personality, without needing to understand how the system works.",
  },
  {
    id: 2,
    brand: "Patek Philippe",
    image1: "/img/profile/serge.png",
    image2: "/img/profile/serge.png",
    image3: "/img/watch/rasm3png",
    name: "Elena",
    year: "Product Design",
    quote:
      "Great products begin with deep empathy for people. I design experiences that feel timeless, intuitive, and human.",
    content1:
      "For Elena, design is not decoration – it is a language. When she started shaping the Patek Philippe experience in TIMORY, her goal was to respect the heritage of the brand while removing friction from every interaction. She studied how people browse, compare, and dream about watches, then turned that into an interface that feels calm, precise, and quietly luxurious.",
    content2:
      "Each element in this story is placed with intention: spacing that lets the eye breathe, typography that feels classic yet modern, and flows that never rush the user. Elena believes that true luxury is not shouting, but whispering with confidence. This page is her way of letting the brand speak in its own natural rhythm.",
  },
  {
    id: 3,
    brand: "Audemars Piguet",
    image1: "/img/profile/serge.png",
    image2: "/img/profile/serge.png",
    image3: "/img/watch/rasm3png",
    name: "Daniel",
    year: "Engineering",
    quote:
      "Precision engineering is about invisible details. If we do our job right, users only feel effortlessness.",
    content1:
      "Daniel approached this project like a movement inside a mechanical watch: every part must align with purpose. Page load times, animation timing, image optimization, and scroll behavior were tuned to make the experience feel frictionless. Users may never see his work directly, but they feel it in the way everything just responds instantly.",
    content2:
      "His story is one of restraint: using modern frameworks and infrastructure, but always in service of reliability and clarity. When a user explores this brand, Daniel wants nothing to get in the way – no jank, no delay, no confusion. Just a sense that the experience is as carefully engineered as the watch itself.",
  },
  {
    id: 4,
    brand: "Richard Mille",
    image1: "/img/profile/serge.png",
    image2: "/img/profile/serge.png",
    image3: "/img/watch/rasm3png",
    name: "Maya",
    year: "Innovation",
    quote:
      "Innovation is not about noise, but about quiet breakthroughs that make complex things feel simple.",
    content1:
      "Maya’s work lives at the edge between imagination and implementation. For this story, she experimented with new layouts, video integration, and narrative structure to make the brand feel alive without overwhelming the user. The goal was not to add more features, but to add more meaning to every interaction.",
    content2:
      "Her belief is that innovation should feel natural – like something that always should have existed. As users move through this page, small details, transitions, and content choices reflect her vision: a modern storytelling layer on top of a timeless industry.",
  },
  {
    id: 5,
    brand: "Vacheron Constantin",
    image1: "/img/profile/serge.png",
    image2: "/img/profile/serge.png",
    image3: "/img/watch/rasm3png",
    name: "Kenji",
    year: "Strategy",
    quote:
      "Every decision is a story about the future. I work on making sure that story is clear, honest, and long-term.",
    content1:
      "Kenji started this brand chapter by asking: what role should TIMORY play between users and legendary maisons? His answer was simple – TIMORY should never try to replace the brand, only to illuminate it. This page is structured to respect that: clear information, strong visuals, and a narrative that always points back to the origin.",
    content2:
      "Each section of the layout is intentional: introduction, story, detail, and discovery. Kenji sees strategy as choreography, making sure users always know where they are and what comes next. His work ensures that this story is not just beautiful, but also directionally true to the brand’s long-term identity.",
  },
  {
    id: 6,
    brand: "Omega",
    image1: "/img/profile/serge.png",
    image2: "/img/profile/serge.png",
    image3: "/img/watch/rasm3png",
    name: "Amira",
    year: "Customer Experience",
    quote:
      "Luxury should feel personal, not distant. I focus on journeys where users feel guided, understood, and respected.",
    content1:
      "For Amira, every interaction is part of a promise: we see you, we hear you, and we respect your time. This story page was crafted as a quiet companion to the user’s curiosity – never pushing, always inviting. Copy, layout, and tone are built to make users feel like they are in conversation with a trusted guide, not a sales funnel.",
    content2:
      "From the first scroll to the last line of text, Amira wanted the experience to feel like a concierge rather than a catalog. Clear language, thoughtful pacing, and warm but neutral visuals are all part of her approach. This is her way of showing that digital luxury can be both informative and deeply human.",
  },
];

const BrandStories: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const storyId =
    typeof id === "string"
      ? parseInt(id, 10)
      : Array.isArray(id)
      ? parseInt(id[0], 10)
      : 1;

  const story = stories.find((item) => item.id === storyId) ?? stories[0];

  return (
    <>
      <Stack id="pc-wrap">
        <Stack id="main">
          <Stack className="brand-story-page">
            <Typography className="brand-story-title">{story.brand}</Typography>

            <Box className="brand-story-section">
              <Box className="brand-story-card">
                <Box className="brand-story-content">
                  <Box className="brand-story-name-year-wrapper">
                    <Typography className="brand-story-name">
                      {story.name}
                    </Typography>
                    <Typography className="brand-story-year">
                      {story.year}
                    </Typography>
                  </Box>
                  <Typography className="brand-story-quote">
                    "{story.quote}"
                  </Typography>
                </Box>

                <Box className="brand-story-image-right">
                  <Box className="brand-story-portrait-wrapper">
                    <img
                      src={story.image1}
                      alt={story.name}
                      className="brand-story-portrait"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="brand-story-video-box">
              <video
                className="brand-story-video"
                src="/video/about-v.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </Box>

            <Box className="watch-back-wrapper">
              <Box
                className="see-all-text"
                onClick={() =>
                  router.push({
                    pathname: "/",
                    query: { fromStoryId: story.id },
                    hash: "watch-story-section",
                  })
                }
              >
                Back <ArrowForward className="see-all-arrow" />
              </Box>
            </Box>

            <Typography className="brand-story-history-title">
              How history began ...
            </Typography>

            <Box className="brand-story-boxes">
              <Box className="brand-story-content">
                <img
                  src={story.image2}
                  alt="Watch"
                  className="brand-story-image"
                />
                <p className="brand-story-text-1">{story.content1}</p>

                <img
                  src={story.image3}
                  alt="Watch 2"
                  className="brand-story-image-right"
                />
                <p className="brand-story-text-2">{story.content2}</p>
              </Box>
            </Box>
          </Stack>
        </Stack>

        <Stack id="footer">
          <Footer />
        </Stack>
      </Stack>
    </>
  );
};

export default withLayoutBasic(BrandStories);
