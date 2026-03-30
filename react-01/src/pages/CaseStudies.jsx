// Matthew Hurst | CSCE 242

import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import FeaturedStudy from "../component/FeaturedStudy";
import StudyCard from "../component/StudyCard";
import "./CaseStudies.css";

import CaseStudies1 from "../images/case-studies-1.jpg";
import CaseStudies2 from "../images/case-studies-2.jpg";
import CaseStudies3 from "../images/case-studies-3.jpg";
import CaseStudies4 from "../images/case-studies-4.jpg";
import CaseStudies5 from "../images/case-studies-5.jpg";

const MIDDLE_STUDIES = [
  {
    img: CaseStudies1,
    title: "Creatine and Strength Gains",
    description: "How creatine supplementation enhances strength and muscle growth.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11547435/",
  },
  {
    img: CaseStudies2,
    title: "Creatine vs Placebo Study",
    description: "Study results comparing the effects of creatine vs a placebo on muscle gains.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10180745/",
  },
];

const LOWER_STUDIES = [
  {
    img: CaseStudies3,
    title: "Sleep & Muscle Recovery",
    description: "Impact of sleep quality on muscle recovery and growth",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9960533/",
  },
  {
    img: CaseStudies4,
    title: "Technique & Education",
    description: "Link between testosterone levels and muscle gains",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11195859/",
  },
  {
    img: CaseStudies5,
    title: "Nutrition Fundamentals",
    description: "Which supplements have been shown to aid muscle growth",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12655760/",
  },
];

export default function CaseStudies() {
  return (
    <div id="main-content">
      <Navbar />

      <main id="content">
        <section className="case-upper-section">
          <h1>Case Studies</h1>
          <p>Explore the research-backed insights on muscle growth and fitness</p>
        </section>

        {MIDDLE_STUDIES.map((study, i) => (
          <FeaturedStudy key={i} img={study.img} title={study.title} description={study.description} link={study.link} />
        ))}

        <section className="case-lower-section">
          <h1>Factors Impacting Gains</h1>
          <section className="case-cards">
            {LOWER_STUDIES.map((study, i) => (
              <StudyCard key={i} img={study.img} title={study.title} description={study.description} link={study.link} />
            ))}
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}