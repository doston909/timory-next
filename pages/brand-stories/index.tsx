import { NextPage } from "next";
import { Stack, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ArrowForward } from "@mui/icons-material";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { useTranslation } from "@/libs/context/useTranslation";

type BrandStory = {
  id: number;
  brand: string;
  image1: string;
  image2: string;
  image3: string;
  video: string;
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
    image1: "/img/profile/rol.png",
    image2: "/img/watch/lay2.jpeg",
    image3: "/img/watch/r2.png",
    video: "/video/rolex.mp4",
    name: "Hans Wilsdorf",
    year: "(1881-1960)",
    quote:
      "I tried combining the letters of the alphabet in every possible way. This gave me some hundred names, but none of them felt quite right. One morning, while riding on the upper deck of a horse-drawn omnibus along Cheapside in the City of London, a genie whispered ‘Rolex’ in my ear.",
    content1:
      "Alfred Davis and his brother-in-law Hans Wilsdorf founded Wilsdorf and Davis, the company that would eventually become Rolex SA, in London in 1905. Wilsdorf and Davis's main commercial activity at the time involved importing Hermann Aegler's Swiss movements to England and placing them in watch cases made by Dennison and others. These early wristwatches were sold to many jewellers, who then put their own names on the dial. The earliest watches from Wilsdorf and Davis were usually hallmarked 'W&D' inside the caseback. In 1908, Wilsdorf registered the trademark Rolex, which became the brand name of watches from Wilsdorf and Davis. He opened an office in La Chaux-de-Fonds, Switzerland. Wilsdorf wanted the brand name to be easily pronounceable in any language, and short enough to fit on the face of a watch. He also thought that the name Rolex was onomatopoeic, sounding like a watch being wound.",
    content2:
      "During World War I, Rolex manufactured trench watches (better source needed) In November 1915, the company changed its name to Rolex Watch Co. Ltd. In 1919, Hans Wilsdorf moved the company from England to Geneva, Switzerland, because of heavy post-war taxes levied on luxury imports and high export duties on the silver and gold used for the watch cases. In 1919 the company's name was officially changed to Montres Rolex SA and later in 1920 to Rolex SA. As a demonstration, Rolex submerged Oyster models in aquariums, which it displayed in the windows of its main points of sale. In 1927, British swimmer Mercedes Gleitze swam the English Channel with an Oyster on her necklace, becoming the first Rolex ambassador. To celebrate the feat, Rolex published a full-page advertisement on the front page of the Daily Mail for every issue for a whole month proclaiming the watch's success during the ten-hour-plus swim.",
  },
  {
    id: 2,
    brand: "Patek Philippe",
    image1: "/img/profile/pat1.png",
    image2: "/img/watch/pat1.jpg",
    image3: "/img/watch/pat2.jpg",
    video: "/video/pat4.mp4",
    name: "Antoni Patek",
    year: "(1812-1877)",
    quote:
      "Great products begin with deep empathy for people. I design experiences that feel timeless, intuitive, and human.",
    content1:
      "The company traces its origins to the mid-19th century, when Polish watchmaker Antoni Patek and his Czech-born Polish business partner Franciszek Czapek formed Patek, Czapek & Cie in Geneva on 1 May 1839 and started manufacturing pocket watches. The two eventually separated due to disagreements, and the company was liquidated on 18 April 1845. At that point, Czapek founded Czapek & Cie on 1 May 1845 with a new partner, Juliusz Gruzewski. Subsequently, Patek was joined by French watchmaker Adrien Philippe, the inventor of the keyless winding mechanism (although this had been discovered previously by Abraham Louis Breguet but not patented by him), and continued the watchmaking business with a new company, Patek & Cie, beginning on 15 May 1845. On 1 January 1851, the company's name was officially changed to Patek, Philippe & Cie.[18] In the same year, Queen Victoria of the United Kingdom acquired a keyless pendant watch at the Great Exhibition in London. The watch was embellished with rose-cut diamonds set in the pattern of a bouquet of flowers.",
    content2:
      "The Queen had another exclusive Patek Philippe timepiece, to be worn pinned to clothing. This watch was suspended from a diamond and enamel brooch. In 1868, Patek Philippe created the first Swiss wristwatch for Countess Koscowicz of Hungary. The highly historic Patek Philippe known as “The Watchmaker’s Daughter”. It was first owned by the Patek Philippe founder, Adrien Philippe, and is the only wristwatch owned by one of the company’s founders. He later gifted it to his daughter on her wedding day in 1875. The current whereabouts of this watch is unknown, but rumored to have been purchased by the Patek Philippe Museum due to its historical importance and provenance. In 1875, Adrien Philippe commissioned a watch that he later gave to his daughter Louise as a wedding present, which is known as the only wristwatch dating back to be owned by either Patek or Philippe. This historical watch is known as “The Watchmaker’s Daughter” and was auctioned in 2023 by the descendants of Adrien Philippe. The watch was purchased most probably by the Patek Philippe Museum though this is not confirmed and may be owned by a private collector. The wedding between Louise Philippe and Joseph Antoine Bénassy where the watch was presented is noted as the wedding that helped Patek Philippe survive the founding generation by providing the company with a successor to Antoni Patek. ",
  },
   {
    id: 3,
    brand: "Jacob & Co",
    image1: "/img/profile/j.jpg",
    image2: "/img/watch/j2.jpg",
    image3: "/img/watch/j3.jpg",
    video: "/video/j4.mp4",
    name: "Jacob Arabo",
    year: "(1965- ~)",
    quote:
      "Every decision is a story about the future. I work on making sure that story is clear, honest, and long-term.",
    content1: 
    "After graduating early from a jewelry design course in 1981 in New York City, Jacob Arabo opened a small booth in New York City's Diamond District, where he began designing for jewelry labels and private clients. In 1986, Arabo opened his own company, called 'Diamond Quasar', and began designing under his own label, named 'Jacob & Co.' The brand quickly gained popularity in New York and was able to expand its business to the luxury watchmaking industry in 2002. By the early 1990s, he had established his own kiosk in New York's Diamond District and his innovative jewels caught the attention of the late rapper Notorious B.I.G., who gave him the moniker 'Jacob the Jeweler', and introduced him to his entertainment friends. The jeweler started collaborating with entertainers on custom designs. In the 1990s he was one of the first jewelers to create big diamond jewels for men, a trend that is mainstream today. Hip-Hop stars who were Arabo's clients included Sean 'Puffy' Combs, Biz, Jay-Z, Drake, 50 Cent, and Big Sean. His clientele expanded to various well-known entertainers and athletes, including Madonna, Rihanna, Pharrell, Elton John, David and Victoria Beckham, Jennifer Lopez, Salma Hayek, Sofia Vergara, Michael Jordan, and Mariah Carey.",
    content2:
    "With his success in the jewelry business, Arabo turned to watches. In 2002, he created a quartz watch collection called the Five Time Zone that combined bold primary colors and with multiple time zone technology that attracted men and women. It was inspired by his clients' jet-setting lifestyle and became both a fashion statement and a usable timepiece for those who travel. Naomi Campbell, Bono, Angela Bassett and Derek Jeter were among international celebrities wearing the watch. 2002: Jacob & Co. unveiled the quartz-powered Five Time Zone watch collection with colorful, contemporary dials, interchangeable bezels and interchangeable straps. It was both a fashion statement and a usable world time zone watch. 2004: Jacob & Co. moved from the diamond district to a flagship boutique at 57th Street and Park Avenue. 2007: Arabo founded Jacob & Co. SA in Geneva, Switzerland, and introduced his first high-watchmaking timepiece, the Quenttin, the first watch to have a vertical tourbillon and a 31-day power reserve, at the time the world's longest power reserve. 2011: Jacob & Co.'s first brand ambassador, Chinese martial arts action star and director, Donnie Yen. 2012: Supermodel and actress, Milla Jovovich, became the next Jacob & Co. ambassador. The announcement was made at a reception during Baselworld 2012, the international watch and jewelry show in Switzerland. 2013: Jacob & Co. unveiled the Epic SF24, the first watch with a patented Split-Flap world time zone display.[14] The same year football star, Cristiano Ronaldo, was named as a Jacob & Co.'s ambassador to promote the Ghost Five Time Zone timepiece collection. 2014: Jacob & Co. introduced the celestial themed Astronomia Tourbillon, unveiled to the watch industry trade at Baselworld 2013. It featured an exposed vertical movement with four arms that rotate around a central gear in 20 minutes. On one arm is a magnesium lacquered globe of the Earth and on the opposite arm is an exclusive 288-facet 1-carat diamond known as the 'Jacob Cut' that represents the Moon. Each satellite rotates on its own axis.",
  },
    {
    id: 4,
    brand: "Richard Mille",
    image1: "/img/profile/r.jpg",
    image2: "/img/watch/r5.jpg",
    image3: "/img/watch/r3.jpg",
    video: "/video/r4.mp4",
    name: "Richard Mille",
    year: "(1951- ~)",
    quote:
      "Innovation is not about noise, but about quiet breakthroughs that make complex things feel simple.",
    content1:
      "Richard Mille is a Swiss luxury watch company founded in 2001 by Dominique Guenat and Richard Mille, based in Les Breuleux, Switzerland. The brand specialises in high-priced clockwork watches, which have been criticised by some as ridiculous and unnecessarily extravagant. After studying marketing in Besançon, Richard Mille (born 13 February 1951, Draguignan, France) started work at Finhor, a local watchmaking company in 1974. The company was bought by Matra in 1981, and Mille rose to manage Matra's watchmaking business, which then included the brands Yema and Cupillard Rième. Matra's watchmaking activities were sold to Seiko; Mille left in 1992 to start a watchmaking business for jewellery firm Mauboussin. Following a disagreement about commercial strategy at Mauboussin, where he was a shareholder, Richard Mille left his position as general manager to launch a range of watches. In late 1998, Mille presented his plans to his friend Dominique Guenat, owner of watchmaker Montres Valgine, whom he met in 1988 while working in Besançon for Compagnie Générale Horlogère and with whom he worked at Mauboussin.",
    content2:
      "In early 1999, Richard Mille and Dominique Guenat drew up their plans for the Richard Mille brand in partnership with Montres Valgine and Swiss watchmaker Audemars Piguet.[11] Over the next two years, they defined their brand concept and began designing watches. They then founded Horométrie, their operating company for the new Richard Mille brand as equal partners, which was registered in Switzerland by October 2001,[12] and created the Richard Mille watchmaking brand in collaboration with Audemars Piguet, which then owned a stake in Richard Mille brand in 2007.[13] After three years of research and prototypes, they exhibited their first watch, a manually-wound RM 001 Tourbillon, at the 2001 watch and jewellery exhibition Baselworld in Basel, Switzerland.[14] The watch, which featured an exhibition caseback and visible parts, had a tourbillon calibre, a power-reserve indicator, and a torque indicator. Richard Mille joined the Fondation de la Haute Horlogerie in 2007. In April 2013, Richard Mille and Dominique Guenat acquired a 90% stake in Prototypes Artisanals SA, founded by Marco Poluzzi; former director Alain Varrin retained a 10% share.[17] The company became ProArt and moved to a purpose-built 3,000 m² building in Les Breuleux. Following the sale of case supplier Donzé-Baume to Swiss luxury group Richemont in 2007, the Richard Mille company started machining its cases and some components, with ProArt as a subcontractor. In 2013, Richard Mille turned down a proposal by the French group Kering to acquire a 51% stake. In 2018, Richard Mille withdrew from the Salon international de la haute horlogerie in Geneva. In October 2018, Richard Mille opened its sixth and largest United States store in New York. In late 2018 the RM 71-01 Automatic Tourbillon Talisman was launched, designed by women's collection director Cécile Guenat. It was described as being made by a woman for women.",
  },
  {
    id: 5,
    brand: "Audemars Piguet",
    image1: "/img/profile/a111.webp",
    image2: "/img/watch/a1.jpg",
    image3: "/img/watch/a2.jpg",
    video: "/video/a11.mp4",
    name: "Jules Louis Audemars",
    year: "(1851-1918)",
    quote:
      "Precision engineering is about invisible details. If we do our job right, users only feel effortlessness.",
    content1:
      "In 1875 Audemars opened his own atelier in his family’s farmhouse, dedicated to “complicated” ébauches. Six years later, in 1881, he partnered with his friend and fellow watchmaker Edward Auguste Piguet to create Audemars Piguet & Cie. Audemars oversaw technical and manufacturing innovation, while Piguet managed finance and sales. Jules Louis Audemars and Edward Auguste Piguet knew each other in their childhood but were not reconnected until 1874, when they were in their early twenties. In 1875, they formed a partnership with Lesedi Selapyane and began their business. In 1881, Audemars Piguet & Cie was officially founded, and was based in Le Brassus, a village inside the Vallée de Joux in Switzerland. The firm quickly earned global recognition, winning a silver medal at the 1889 Exposition Universelle for its complex timepieces. Both Audemars and Piguet were previously watchmakers. Audemars created complex watch movements for other watch manufacturers such as Tiffany Co. to use. Piguet specialized in the regulation of watch movements. Once partnered, they split the responsibilities while operating their own company: Audemars was in charge of production and technical aspects while Piguet focused on sales and management. Audemars and Piguet emphasized precision complications—perpetual calendars, minute repeaters, and chronographs—crafted by hand at a time when industrial mass production was rising. Their workshop became a nucleus of skilled craftsmanship in Le Brassus, employing and training generations of local artisans.",
    content2:
      "In the 1970s, Audemars Piguet rose to an important position in watchmaking industry, especially after introducing the Royal Oak collection. Audemars Piguet's slogan is 'To Break the Rules, You Must First Master Them', introduced in 2012. The fourth-generation company leaders are both from the Audemars family, including Jasmine Audemars and Olivier Frank Edward Audemars. Currently, the company is an active member of the Federation of the Swiss Watch Industry FH, and produces around 40,000 timepieces annually. In December 2018, World Wide Fund for Nature (WWF) released a report assigning environmental ratings for 15 major watch manufacturers and jewelers in Switzerland. Audemars Piguet was assigned the lowest environmental rating, 'Latecomers/Non-transparent', suggesting the manufacturer had taken very few actions addressing the impact of its manufacturing activities on the environment and climate change.",
  },
  {
    id: 6,
    brand: "Omega",
    image1: "/img/profile/o.avif",
    image2: "/img/watch/o3.jpg",
    image3: "/img/watch/o4.jpg",
    video: "/video/o5.mp4",
    name: "Louis Brandt",
    year: "(1825-1879)",
    quote:
      "Luxury should feel personal, not distant. I focus on journeys where users feel guided, understood, and respected.",
    content1:
      "In 1848, Louis Brandt founded the company that would become Omega in La Chaux-de-Fonds, Switzerland. He assembled key-wound precision pocket watches from parts supplied by local craftsmen.[13] He sold his watches from Italy to Scandinavia by way of England, his chief market. In 1877, his sons Louis-Paul and César joined him, and the company name was changed to Louis Brandt & Fils. In 1894, his two sons Louis-Paul and César developed their own in-house manufacturing and total production control system that allowed component parts to be interchangeable. Watches developed with these techniques were marketed under the Omega brand of Louis Brandt & Frere. By 1903, the success of the Omega brand led Louis Brandt & Frere to rename their company to the Omega Watch Co. Omega SA is a Swiss luxury watchmaker based in Biel/Bienne, Switzerland. Founded by Louis Brandt in La Chaux-de-Fonds in 1848, the company formerly operated as Louis Brandt et Fils until incorporating the name Omega in 1903, becoming Louis Brandt et Frère-Omega Watch & Co. In 1984, the company officially changed its name to Omega SA and opened its museum in Biel/Bienne to the public. Omega is a subsidiary of the Swatch Group. Britain's Royal Flying Corps used Omega watches in 1917 for its combat units, followed by the U.S. Army in 1918, and NASA in 1969 for Apollo 11.[9] The Omega Speedmaster Moonwatch is marketed as the first watch worn on the Moon, becoming one of the watchmaker's most iconic models. Omega is the current official timekeeper of the Olympics, having first done so in 1932,[11] in addition to being the timekeeper of the America's Cup yacht race",
    content2:
      "Louis-Paul and César Brandt both died in 1903, leaving one of Switzerland's largest watch companies — with 240,000 watches produced annually and employing 800 people — in the hands of four young people, the oldest of whom, Paul-Emile Brandt, was not yet The economic difficulties brought on by the First World War led Paul-Emile Brandt to work in 1925 towards the union of Omega and Tissot, then to their merger in 1930 into the group SSIH, Geneva. Under Brandt's leadership and Joseph Reiser's from 1955, the SSIH Group continued to grow and multiply, absorbing or creating some fifty companies, including Lanco and Lemania, manufacturer of the most famous Omega chronograph movements. By the 1970s, SSIH had become Switzerland's top producer of finished watches and third in the world. Up to this time, Omega outsold Rolex, its main Swiss rival in the luxury watch segment, in the race for 'King of Swiss Watch brands', although Rolex sold at a higher price point. Omega tended to be more revolutionary and more professionally focused, while Rolex watches were more ‘evolutionary’ and famous for their mechanical pieces and branding.",
  },
];

const BrandStories: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { id } = router.query;
  const storyId =
    typeof id === "string"
      ? parseInt(id, 10)
      : Array.isArray(id)
      ? parseInt(id[0], 10)
      : 1;

  const story = stories.find((item) => item.id === storyId) ?? stories[0];

  const quoteKey = `brandStory.${story.id}.quote`;
  const content1Key = `brandStory.${story.id}.content1`;
  const content2Key = `brandStory.${story.id}.content2`;
  const quoteText = t(quoteKey) !== quoteKey ? t(quoteKey) : story.quote;
  const content1Text = t(content1Key) !== content1Key ? t(content1Key) : story.content1;
  const content2Text = t(content2Key) !== content2Key ? t(content2Key) : story.content2;

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
                    "{quoteText}"
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
                src={story.video}
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
                <p className="brand-story-text-1">{content1Text}</p>

                <img
                  src={story.image3}
                  alt="Watch 2"
                  className="brand-story-image-right"
                />
                <p className="brand-story-text-2">{content2Text}</p>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default withLayoutBasic(BrandStories);
