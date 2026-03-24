// Matthew Hurst | CSCE 242

import { useState } from "react";
import Navbar from "../component/Navbar";
import "./About.css";

import TrainingImg from "../images/Training-About.jpg";
import TechniqueImg from "../images/Technique-About.jpg";
import NutritionAboutImg from "../images/Nutrition-About.jpg";
import InspirationImg from "../images/Inspiration-About.jpg";

export default function About() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formMessage, setFormMessage] = useState({ text: "", color: "" });

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    data.append("_captcha", "false");
    data.append("_template", "table");
    try {
      const response = await fetch("https://formsubmit.co/r.matthewhurst@gmail.com", {
        method: "POST", body: data, headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setFormMessage({ text: "Success! Your message has been sent.", color: "#7CFC98" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormMessage({ text: "Error: Please make sure all fields are filled out correctly.", color: "#ffb3b3" });
      }
    } catch {
      setFormMessage({ text: "Error: Message could not be sent right now.", color: "#ffb3b3" });
    }
  }

  return (
    <div id="main-content">
      <Navbar />

      <main id="content">
        <section className="top-section">
          <h1>About</h1>
          <p>
            Fitness Planner was created to cut through the noise of modern fitness culture.
            No gimmicks. No unrealistic expectations. Just smart training, solid nutrition, and consistent progress.
          </p>
        </section>

        <section className="top-middle">
          <h1>Our Philosophy</h1>
          <p>
            Fitness isn't about chasing trends or maxing out every workout. It's about showing up,
            learning proper technique, and building habits you can maintain long-term.
          </p>
          <ul>
            <li>✅ Quality movement over ego lifting</li>
            <li>✅ Consistency over intensity</li>
            <li>✅ Education over shortcuts</li>
          </ul>
        </section>

        <section className="lower-middle">
          <h1>What We Offer</h1>
          <section className="about-cards">
            <div className="about-frames">
              <img src={TrainingImg} alt="Structured Training" />
              <h2>Structured Training</h2>
              <p>Clear instructed training, that you can follow anytime, anywhere.</p>
            </div>
            <div className="about-frames">
              <img src={TechniqueImg} alt="Technique and Education" />
              <h2>Technique & Education</h2>
              <p>Simple explanations, form cues, and tutorials to help you move better and avoid injury.</p>
            </div>
            <div className="about-frames">
              <img src={NutritionAboutImg} alt="Nutrition Fundamentals" />
              <h2>Nutrition Fundamentals</h2>
              <p>No extremes- just practical guidance on protein, carbs, fats, and fueling performance.</p>
            </div>
          </section>
        </section>

        <section className="lower-section">
          <div id="lower-frame">
            <img src={InspirationImg} alt="Inspiration" />
          </div>
          <div id="lower-frame-txt">
            <h1>Inspiration & Influence</h1>
            <p>Fitness Planner is inspired by former athletes and coaches who prioritize longevity, discipline, and intelligent training.</p>
          </div>
        </section>

        <section className="contact-section">
          <h1>Contact Me</h1>
          <p className="contact-intro">Have questions about workouts, nutrition, or training? Send a message below.</p>
          <form id="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required />
            <button type="submit" className="contact-btn">Send Message</button>
            {formMessage.text && <p id="form-message" style={{ color: formMessage.color }}>{formMessage.text}</p>}
          </form>
        </section>
      </main>

      <footer id="main-footer"><p>© mhurst1</p></footer>
    </div>
  );
}