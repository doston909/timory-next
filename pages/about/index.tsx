import { Stack, Box, Typography } from "@mui/material";
import { NextPage } from "next";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import Footer from "@/libs/components/Footer";

const About: NextPage = () => {
  const stats = [
    {
      id: 1,
      icon: (
        <img
          src="/img/flag/tr4.png"
          alt="rating"
          width={280}
          height={190}
        />
      ),
      title: "4.7 out of 5 stars",
      description: "from 5,000 reviews worldwide",
    },
    {
      id: 2,
      icon: (
        <img
          src="/img/flag/tr3.png"
          alt="rating"
          width={260}
          height={170}
        />
      ),
      title: "10.000",
      description: "watch enthusiasts use Timory each month",
    },
    {
      id: 3,
      icon: (
        <img
          src="/img/flag/tr2.png"
          alt="rating"
          width={280}
          height={170}
        />
      ),
      title: "Over 23,000",
      description: "customers choose Buyer Protection annually",
    },
    {
      id: 4,
      icon: (
        <img
          src="/img/flag/tr1.png"
          alt="rating"
          width={280}
          height={170}
        />
      ),
      title: "More than 17,000",
      description: "trustworthy sellers",
    },
  ];

  return (
    <>
      <Stack id="pc-wrap">
        <Stack id={"main"}>
          <Stack className="about-page">
            <Typography className="about-main-title">
              Timory (Time + Story) — Where time, trust, and elegance meet.
            </Typography>
            
            <Stack className="our-goal-section">
              <Box className="stats-section">
                <Box className="stats-grid">
                  {stats.map((stat) => (
                    <Box key={stat.id} className="stat-box">
                      <Box className="stat-icon">{stat.icon}</Box>
                      <Typography className="stat-title">{stat.title}</Typography>
                      <Typography className="stat-description">
                        {stat.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Stack>
            
            <Box className="about-content">
              <Box className="about-image-wrapper">
                <img 
                  src="/img/profile/about1.jpeg" 
                  alt="About TIMORY" 
                  className="about-image"
                />
              </Box>
              
              <Box className="about-text-content">
                <Typography className="about-text">
                  TIMORY is a digital platform designed to help people discover, explore, and compare watches with ease. We bring together watch information, modern technology, and intelligent recommendations to simplify the way users find timepieces that match their style, preferences, and lifestyle.
                </Typography>
                
                <Typography className="about-text">
                  Our goal is to create a transparent and user-friendly environment where watch enthusiasts and everyday users can access reliable information without complexity. TIMORY does not sell watches directly. Instead, we focus on providing curated content and guiding users to official brands and trusted retailers.
                </Typography>
                
                <Typography className="about-text">
                  By combining data-driven insights with artificial intelligence, TIMORY delivers personalized recommendations and a smarter discovery experience. We believe that finding the right watch should be intuitive, informative, and enjoyable.
                </Typography>
                
                <Typography className="about-text">
                  TIMORY is built by a team of developers, designers, and digital strategists who are passionate about technology, product design, and innovation. We are continuously improving the platform to offer better features, better insights, and a better experience for our users.
                </Typography>
              </Box>
            </Box>

            <Typography className="testimonial-section-title">
              WHAT OUR TEAMS SAY
            </Typography>

            <Box className="testimonial-section">
              {[
                {
                  id: 1,
                  image: "/img/profile/ceo.png",
                  name: "Dostonbek ",
                  role: "CEO & Founder",
                  quote: "We believe time deserves meaning, not noise. At TIMORY, we build products that respect people’s time and help them choose with confidence. Technology is our tool — trust is our responsibility."
                },
                {
                  id: 2,
                  image: "/img/profile/about1.jpeg",
                  name: "Safiya",
                  role: "Product Marketing Manager",
                  quote: "My job is to make sure the right people understand the right value at the right moment."
                },
                {
                  id: 3,
                  image: "/img/profile/about1.jpeg",
                  name: "Felix ",
                  role: "Senior Data Engineer ",
                  quote: "Behind every smart decision is reliable data. At TIMORY, I design and maintain data pipelines that turn raw information into trustworthy insights at scale."
                },
                {
                  id: 4,
                  image: "/img/profile/about1.jpeg",
                  name: "Julia ",
                  role: "UI/UX Designer",
                  quote: "MARKETING IS ABOUT UNDERSTANDING PEOPLE AND CREATING VALUE. WE TELL STORIES THAT MATTER AND BUILD BRANDS THAT LAST FOR GENERATIONS."
                },
                {
                  id: 5,
                  image: "/img/profile/serge.png",
                  name: "Sergey ",
                  role: "Data / AI",
                  quote: "AI should serve people, not complexity. I focus on transforming data into practical models that improve discovery, recommendations, and decision-making."
                }
              ].map((testimonial, index, array) => {
                const nextTestimonial = array[index + 1] || array[0];
                return (
                  <Box key={testimonial.id} className="testimonial-card">
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
          </Stack>
        </Stack>

        <Stack id={"footer"}>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
};

export default withLayoutBasic(About);

