// Matthew Hurst | CSCE 242

import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import TutorialCard from "../component/TutorialCard";
import "./Tutorials.css";

import Tutorials1 from "../images/tutorials-1.jpg";
import Tutorials2 from "../images/tutorials-2.jpg";
import Tutorials3 from "../images/tutorials-3.jpg";

const TUTORIALS = [
  {
    name: "Chris Bumstead (CBUM)",
    img: Tutorials3,
    description: "Chris Bumstead (CBUM) is a multi-time Mr. Olympia Classic Physique champion known for structured bodybuilding training and consistent discipline.",
    youtube: "https://www.youtube.com/@ChrisBumstead",
  },
  {
    name: "Sam Sulek",
    img: Tutorials1,
    description: "Sam Sulek shares long, unfiltered training sessions that highlight intensity, effort, and consistency in the gym. His videos demonstrate how hard work, frequent training, and staying consistent over time drive results.",
    youtube: "https://www.youtube.com/@sam_sulek",
  },
  {
    name: "Jeff Nippard",
    img: Tutorials2,
    description: "Jeff Nippard teaches evidence-based training using biomechanics and research. His content breaks down exercises step-by-step and explains why they work, helping lifters train efficiently while reducing injury risk.",
    youtube: "https://www.youtube.com/@JeffNippard",
  },
];

export default function Tutorials() {
  return (
    <div id="main-content">
      <Navbar />

      <main id="content">
        <section className="upper-section">
          <h1>Tutorials & Learning Center</h1>
          <p>
            Learn the proper technique, training science, and gym knowledge from trusted experts.
            Instead of guessing from random TikToks, these creators teach why you train - not just what to do.
          </p>
        </section>

        {TUTORIALS.map((t, i) => (
          <TutorialCard key={i} img={t.img} name={t.name} description={t.description} youtube={t.youtube} />
        ))}

        <section className="lower-section">
          <h1>🎯 How To Use This Page</h1>
          <ol>
            <li>Pick a goal (build muscle, lose fat, build strength)</li>
            <li>Choose a creator that matches your style</li>
            <li>Watch videos and learn before your workout</li>
            <li>Apply new concepts each training session.</li>
            <li>Learn how to implement cardio into your workouts</li>
            <li>Learn the science behind what makes your muscles grow</li>
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  );
}