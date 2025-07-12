import React, { useState, useEffect, useRef } from "react";
import { useSpring, useTrail, animated } from "@react-spring/web";

// --- Data extracted from resume ---

interface Project {
  title: string;
  description: string;
  tags: string[];
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Skill {
  name: string;
  icon: string;
}

interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

interface PortfolioData {
  name: string;
  title: string;
  summary: string;
  contact: Contact;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
}

const portfolioData: PortfolioData = {
  name: "Kumar Raja Pedagopu",
  title: "Frontend Developer (ReactJS, React-Native)",
  summary:
    "A highly skilled and results-driven Frontend Developer with over 8 years of comprehensive experience in MERN stack and mobile app development. Proficient in JavaScript, ReactJS, Redux, and Node.js, with a proven track record of building scalable, high-performance applications. Passionate about creating innovative solutions and enhancing user experiences.",
  contact: {
    email: "kumar.pedagopu@gmail.com",
    phone: "+91 8956466641",
    linkedin: "https://www.linkedin.com/in/kumar-raja-pedagopu",
    github: "https://github.com/kumarraja",
  },
  skills: [
    { name: "JavaScript (ES6+)", icon: "💻" },
    { name: "TypeScript", icon: "🔷" },
    { name: "ReactJS & Redux", icon: "⚛️" },
    { name: "React Native", icon: "📱" },
    { name: "Node.js & Express", icon: "🚀" },
    { name: "HTML5 & CSS3", icon: "📄" },
    { name: "Tailwind CSS & MUI", icon: "🎨" },
    { name: "Python & FastAPI", icon: "🐍" },
    { name: "SQL & MySQL", icon: "💾" },
    { name: "Git & GitHub", icon: "🌿" },
    { name: "Docker", icon: "🐳" },
    { name: "Agile Methodologies", icon: "🔄" },
  ],
  experience: [
    {
      role: "Associate IT Consultant (ReactJs)",
      company: "ITC Infotech India Ltd.",
      period: "Feb 2022 – Present",
      description:
        "Engineered and optimized 20+ reusable React components, cutting frontend development time by 30%. Spearheaded daily Agile standups and sprint planning, boosting feature delivery speed by 25%.",
    },
    {
      role: "Sr. Software Engineer",
      company: "Mobigesture Software Pvt. Ltd.",
      period: "Feb 2021 – Jan 2022",
      description:
        "Designed and maintained ReactJS & React Native applications, enhancing app stability and performance by 20%. Engineered 30+ reusable components, accelerating development time by 25%.",
    },
    {
      role: "Sr. Web Developer (MERN)",
      company: "VZ PetroCorp Innovation Pvt. Ltd.",
      period: "Feb 2018 – Jan 2021",
      description:
        "Spearheaded the end-to-end development of web applications using JavaScript, ReactJS, and NodeJS. Implemented Agile methodologies, accelerating project delivery timelines by 15%.",
    },
    {
      role: "Manager (Key Accounts & IT)",
      company: "Swamymalai Transports",
      period: "Feb 2017 – Jan 2018",
      description:
        "Directed branch operations and key account management, elevating customer satisfaction scores by 30%. Architected IT solutions to streamline administrative tasks, reducing processing time by 50%.",
    },
  ],
  projects: [
    {
      title: "DMR Modernization (MasterBrand)",
      description:
        "Developed a ReactJS web application from scratch to manage product discrepancies for warehouse users, integrating with ERP systems.",
      tags: ["React JS", "Redux Toolkit", "MUI", "React Query"],
    },
    {
      title: "District One (Danske Bank)",
      description:
        "Built a modern micro-frontend UI for a corporate banking platform, simplifying user experience and enhancing functionality.",
      tags: ["React JS", "Micro-frontend", "React Query"],
    },
    {
      title: "Walmart Financial Forecasting Apps",
      description:
        "Developed internal financial forecasting applications for Walmart, enabling department managers to submit financial data efficiently.",
      tags: ["React JS", "Redux", "Tailwind CSS"],
    },
    {
      title: "EdgeGrid Mobile App",
      description:
        "Created a React Native mobile app connecting energy service providers with users to track energy usage and earnings.",
      tags: ["React Native", "Redux Saga", "React Native Paper"],
    },
    {
      title: "Smart Admin LIMS (Web & Mobile)",
      description:
        "A cloud-based Laboratory Information Management System (LIMS) for accredited calibration labs using the MERN stack.",
      tags: ["ReactJS", "Node.js", "Express.js", "MySQL"],
    },
    {
      title: "IEC-CRM System",
      description:
        "A web and mobile-based enquiry management system to streamline marketing tasks and customer coordination.",
      tags: ["React Native", "Express.js", "MySQL"],
    },
  ],
};

// --- Helper Components & Hooks ---

// Custom hook to trigger animations on scroll
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const spring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(50px)",
    config: { mass: 1, tension: 280, friction: 60 },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, spring };
};

// --- Main Components ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const handleMobileMenuClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-bold text-gray-800">KRP.</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 my-1 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <nav className="container mx-auto px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleMobileMenuClick(link.href)}
                className="block py-3 text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium border-b border-gray-100 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const props = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 800 },
  });

  return (
    <section className="min-h-screen flex items-center bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <animated.div style={props}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-800 leading-tight">
            {portfolioData.name}
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-600 font-medium">
            {portfolioData.title}
          </p>
          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed px-4">
            {portfolioData.summary}
          </p>
          <div className="mt-8 sm:mt-10">
            <a
              href="#projects"
              className="bg-blue-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 inline-block text-sm sm:text-base"
            >
              View My Work
            </a>
          </div>
        </animated.div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, spring } = useScrollAnimation();
  const trail = useTrail(portfolioData.skills.length, {
    from: { opacity: 0, transform: "translateX(-30px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
    config: { mass: 1, tension: 280, friction: 40 },
    delay: 200,
  });

  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <animated.div ref={ref} style={spring}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-center text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
            I'm a dedicated developer focused on building beautiful, functional,
            and user-centric web and mobile applications. Here are some of the
            technologies I excel at:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {trail.map((style, index) => (
              <animated.div
                key={portfolioData.skills[index].name}
                style={style}
                className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm flex items-center space-x-3 hover:shadow-md transition-shadow duration-200"
              >
                <span className="text-xl sm:text-2xl flex-shrink-0">
                  {portfolioData.skills[index].icon}
                </span>
                <span className="font-medium text-gray-700 text-sm sm:text-base">
                  {portfolioData.skills[index].name}
                </span>
              </animated.div>
            ))}
          </div>
        </animated.div>
      </div>
    </section>
  );
};

const Experience = () => {
  const { ref, spring } = useScrollAnimation();
  const trail = useTrail(portfolioData.experience.length, {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { mass: 1, tension: 280, friction: 40 },
    delay: 200,
  });

  return (
    <section id="experience" className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <animated.div ref={ref} style={spring}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Career Journey
          </h2>
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line - positioned for mobile and desktop */}
            <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 md:transform md:-translate-x-1/2"></div>

            <div className="space-y-6 sm:space-y-8">
              {trail.map((style, index) => (
                <animated.div
                  key={`experience-${portfolioData.experience[index].company}-${index}`}
                  style={style}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-6 md:left-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full border-2 sm:border-4 border-white shadow-lg md:transform md:-translate-x-1/2 z-10"></div>

                  {/* Content card */}
                  <div
                    className={`ml-12 sm:ml-16 md:ml-0 md:w-5/12 ${
                      index % 2 === 0
                        ? "md:mr-auto md:pr-8"
                        : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 border-blue-500">
                      <div className="text-xs sm:text-sm text-blue-600 font-medium mb-1">
                        {portfolioData.experience[index].period}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                        {portfolioData.experience[index].role}
                      </h3>
                      <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">
                        {portfolioData.experience[index].company}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {portfolioData.experience[index].description}
                      </p>
                    </div>
                  </div>
                </animated.div>
              ))}
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [props, api] = useSpring(() => ({
    transform: "scale(1)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    config: { mass: 1, tension: 350, friction: 25 },
  }));

  return (
    <animated.div
      style={props}
      onMouseEnter={() =>
        api.start({
          transform: "scale(1.05)",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        })
      }
      onMouseLeave={() =>
        api.start({
          transform: "scale(1)",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        })
      }
      className="bg-white rounded-lg overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 flex-grow text-sm sm:text-base leading-relaxed">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </animated.div>
  );
};

const Projects = () => {
  const { ref, spring } = useScrollAnimation();
  const trail = useTrail(portfolioData.projects.length, {
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { mass: 1, tension: 210, friction: 20 },
    delay: 200,
  });

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <animated.div ref={ref} style={spring}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {trail.map((style, index) => (
              <animated.div
                key={`project-${portfolioData.projects[index].title}`}
                style={style}
              >
                <ProjectCard project={portfolioData.projects[index]} />
              </animated.div>
            ))}
          </div>
        </animated.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, spring } = useScrollAnimation();
  const { email, linkedin, github } = portfolioData.contact;

  return (
    <footer id="contact" className="bg-gray-800 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <animated.div ref={ref} style={spring}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="text-gray-300 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base px-4">
            I'm currently seeking new opportunities and am open to
            collaboration. Feel free to reach out.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a
              href={`mailto:${email}`}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-base sm:text-lg font-medium"
            >
              📧 Email
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-base sm:text-lg font-medium"
            >
              💼 LinkedIn
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-base sm:text-lg font-medium"
            >
              🐙 GitHub
            </a>
          </div>
        </animated.div>
      </div>
    </footer>
  );
};

// --- Portfolio Component ---
export default function PortfolioComponent() {
  return (
    <div className="bg-white antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
      </main>
      <Contact />
    </div>
  );
}
