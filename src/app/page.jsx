import HeroSection from "./components/hero";
import Skills from "./components/skills";
import Projects from "./components/projects";
import Certifications from "./components/certifications";
import Experience from "./components/experince";
import Contact from "./components/contact";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact /> 
    </main>
  );
}
