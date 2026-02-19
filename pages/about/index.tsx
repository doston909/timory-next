import { Stack, Box, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { useTranslation } from "@/libs/context/useTranslation";

const About: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const stats = [
    {
      id: 1,
      icon: (
        <img src="/img/flag/tr4.png" alt="rating" width={280} height={190} />
      ),
      titleKey: "home.stats1Title",
      descKey: "home.stats1Desc",
    },
    {
      id: 2,
      icon: (
        <img src="/img/flag/tr3.png" alt="rating" width={260} height={170} />
      ),
      titleKey: "home.stats2Title",
      descKey: "home.stats2Desc",
    },
    {
      id: 3,
      icon: (
        <img src="/img/flag/tr2.png" alt="rating" width={280} height={170} />
      ),
      titleKey: "home.stats3Title",
      descKey: "home.stats3Desc",
    },
    {
      id: 4,
      icon: (
        <img src="/img/flag/tr1.png" alt="rating" width={280} height={170} />
      ),
      titleKey: "home.stats4Title",
      descKey: "home.stats4Desc",
    },
  ];

  return (
    <>
      <Stack id="pc-wrap">
        <Stack id={"main"}>
          <Stack className="about-page">
            <Box className="about-content">
              <Typography className="about-main-title">
                {t("about.tagline")}
              </Typography>
              <Box className="about-image-wrapper">
                <img
                  src="/img/profile/about1.jpeg"
                  alt="About TIMORY"
                  className="about-image"
                />
              </Box>
              <Box className="about-text-content">
                <Typography className="about-text">
                  {t("about.paragraph1")}
                </Typography>

                <Typography className="about-text">
                  {t("about.paragraph2")}
                </Typography>

                <Typography className="about-text">
                  {t("about.paragraph3")}
                </Typography>

                <Typography className="about-text">
                  {t("about.paragraph4")}
                </Typography>
              </Box>
            </Box>

            <Typography className="testimonial-section-title">
              {t("about.whatOurTeamsSay")}
            </Typography>

            <Box className="testimonial-section">
              {[
                {
                  id: 1,
                  image: "/img/profile/ceo.png",
                  name: "Dostonbek ",
                  role: "CEO & Founder",
                  quote:
                    "We believe time deserves meaning, not noise. At TIMORY, we build products that respect people’s time and help them choose with confidence. Technology is our tool — trust is our responsibility.",
                },
                {
                  id: 2,
                  image: "/img/profile/safiya.png",
                  name: "Safiya",
                  role: "Product Marketing Manager",
                  quote:
                    "My job is to make sure the right people understand the right value at the right moment.",
                },
                {
                  id: 3,
                  image: "/img/profile/sardorbek.jpg",
                  name: "Sardorbek ",
                  role: "Senior Data Engineer ",
                  quote:
                    "Behind every smart decision is reliable data. At TIMORY, I design and maintain data pipelines that turn raw information into trustworthy insights at scale.",
                },
                {
                  id: 4,
                  image: "/img/profile/jul1.jpg",
                  name: "Julia ",
                  role: "UI/UX Designer",
                  quote:
                    "MARKETING IS ABOUT UNDERSTANDING PEOPLE AND CREATING VALUE. WE TELL STORIES THAT MATTER AND BUILD BRANDS THAT LAST FOR GENERATIONS.",
                },
                {
                  id: 5,
                  image: "/img/profile/serge.png",
                  name: "Sergey ",
                  role: "Data / AI",
                  quote:
                    "AI should serve people, not complexity. I focus on transforming data into practical models that improve discovery, recommendations, and decision-making.",
                },
              ].map((testimonial, index, array) => {
                const nextTestimonial = array[index + 1] || array[0];
                return (
                  <Box
                    key={testimonial.id}
                    className={`testimonial-card ${
                      testimonial.id === 3 ? "testimonial-card-id3" : ""
                    }`}
                  >
                    <Box className="testimonial-image-left">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="testimonial-portrait"
                      />
                    </Box>

                    <Box className="testimonial-content">
                      <Box className="testimonial-name-role-wrapper">
                        <Typography className="testimonial-name">
                          {testimonial.name}
                        </Typography>
                        <Typography className="testimonial-role">
                          {testimonial.role}
                        </Typography>
                      </Box>
                      <Typography className="testimonial-quote">
                        "{testimonial.quote}"
                      </Typography>
                    </Box>

                    {testimonial.id !== 5 && (
                      <Box className="testimonial-image-right">
                        <img
                          src={nextTestimonial.image}
                          alt={nextTestimonial.name}
                          className="testimonial-portrait-partial"
                        />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>

            <Stack className="our-goal-section">
              <Box className="stats-section">
                <Box className="stats-grid">
                  {stats.map((stat) => (
                    <Box key={stat.id} className="stat-box">
                      <Box className="stat-icon">{stat.icon}</Box>
                      <Typography className="stat-title">
                        {t(stat.titleKey)}
                      </Typography>
                      <Typography className="stat-description">
                        {t(stat.descKey)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Stack>

            <Box className="about-video-section">
              <video
                className="about-video"
                src="/video/about-v.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </Box>

            <Box className="about-cta-section">
              <Typography className="about-cta-title">
                {t("about.ctaTitle")}
              </Typography>
              <Typography className="about-cta-subtitle">
                {t("about.ctaSubtitle")}
              </Typography>
              <button
                className="about-cta-button"
                onClick={() =>
                  router.push({
                    pathname: "/cs",
                    hash: "cs-contact-section",
                  })
                }
              >
                {t("about.contactUs")}
                <ArrowForward sx={{ ml: 1, fontSize: 24 }} />
              </button>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default withLayoutBasic(About);
