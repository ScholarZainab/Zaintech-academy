import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Code, Palette, PenTool, Compass, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const courses = [
  {
    title: "Frontend Development",
    description:
      "Master HTML, CSS, JavaScript, and frameworks like React to build beautiful, responsive websites.",
    icon: <Code className="text-purple-600 dark:text-purple-400" size={40} />,
    syllabus: ["HTML5, CSS3, JavaScript", "React.js", "Responsive Design", "Git & GitHub"],
    tags: ["development", "frontend"]
  },
  {
    title: "UI/UX Design",
    description:
      "Design stunning and intuitive user interfaces. Learn Figma, prototyping, and user experience principles.",
    icon: <Palette className="text-pink-500 dark:text-pink-400" size={40} />,
    syllabus: ["Figma", "User Research", "Prototyping", "Accessibility"],
    tags: ["design", "uiux"]
  },
  {
    title: "Prompt Engineering",
    description:
      "Harness the power of AI by mastering prompt design for tools like ChatGPT and Midjourney.",
    icon: <Sparkles className="text-yellow-500 dark:text-yellow-300" size={40} />,
    syllabus: ["Prompt Structuring", "ChatGPT API", "Midjourney", "Fine-tuning"],
    tags: ["ai", "prompt"]
  },
  {
    title: "Product Management",
    description:
      "Learn to lead tech projects and teams from ideation to launch using agile and strategic tools.",
    icon: <Compass className="text-green-600 dark:text-green-400" size={40} />,
    syllabus: ["Agile Frameworks", "Product Strategy", "Jira/Notion", "MVP Development"],
    tags: ["management", "product"]
  },
  {
    title: "Fullstack Engineering",
    description:
      "Dive deep into both frontend and backend technologies including databases, APIs, and deployment.",
    icon: <PenTool className="text-blue-500 dark:text-blue-400" size={40} />,
    syllabus: ["Node.js & Express", "MongoDB", "REST APIs", "Deployment"],
    tags: ["fullstack", "development"]
  },
];


export default function CoursesPage() {
  const [activeCourse, setActiveCourse] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [tagLogic, setTagLogic] = useState("OR");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const highlightMatch = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? <mark key={idx} className="bg-yellow-200 dark:bg-yellow-600">{part}</mark> : part
    );
  };

  const filteredCourses = courses.filter((course) => {
    const matchQuery = course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase());

    const matchTags = activeTags.length === 0
      ? true
      : tagLogic === "AND"
      ? activeTags.every((tag) => course.tags.includes(tag))
      : activeTags.some((tag) => course.tags.includes(tag));

    return matchQuery && matchTags;
  });

  const allTags = Array.from(new Set(courses.flatMap(course => course.tags)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 to-white dark:from-gray-900 dark:to-black py-10 px-4 md:px-12 lg:px-24 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-fuchsia-700 dark:text-fuchsia-400">
          Zaintech Female Coding Academy
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
        >
          {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-800" />}
        </button>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
        Explore our hands-on tech programs tailored for women ready to launch their career in software engineering.
      </p>

      <div className="mb-4 flex justify-center gap-4 flex-wrap items-center">
        {allTags.map((tag) => (
          <motion.button
            layout
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${activeTags.includes(tag) ? 'bg-fuchsia-600 text-white border-fuchsia-600' : 'border-gray-300 dark:border-gray-600'}`}
          >
            {tag}
          </motion.button>
        ))}
        <div className="ml-2">
          <label className="mr-2 text-sm">Logic:</label>
          <select
            value={tagLogic}
            onChange={(e) => setTagLogic(e.target.value)}
            className="px-2 py-1 rounded-md text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          >
            <option value="OR">OR</option>
            <option value="AND">AND</option>
          </select>
        </div>
      </div>

      <div className="mb-8 flex flex-col items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredCourses.length} course{filteredCourses.length !== 1 && 's'}
        </p>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 text-lg mt-16">
          No matching courses found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 dark:bg-gray-800 dark:shadow-gray-900">
                <CardContent>
                  <div className="flex items-center mb-4 gap-4">
                    {course.icon}
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      {highlightMatch(course.title)}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{highlightMatch(course.description)}</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {course.tags.map(tag => (
                      <span key={tag} className="text-xs bg-fuchsia-100 dark:bg-fuchsia-800 text-fuchsia-700 dark:text-fuchsia-200 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-300 dark:border-fuchsia-500"
                    onClick={() => setActiveCourse(course)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {activeCourse && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setActiveCourse(null)}
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-700 dark:text-fuchsia-400">
                {activeCourse.title} Syllabus
              </h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
                {activeCourse.syllabus.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

