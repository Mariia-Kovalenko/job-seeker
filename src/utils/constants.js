export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const API_URL = "http://localhost:4000/";
export const API_URL_PROD = "https://jobs-api-latest.onrender.com/";

export const SUGGESTED_CATEGORIES = ["Marketing", "Development", "UI/UX", "Management", "Design"];

export const PAGE_SIZE = 10;

export const INTRO_SECTION_IMAGES = [
  {
    id: 1,
    image: "/profile-1.webp",
  },
  {
    id: 2,
    image: "/profile-2.jpg",
  },
  {
    id: 3,
    image: "/profile-3.jpg",
  },
  {
    id: 4,
    image: "/profile-4.jpg",
  },
]

export const CATEGORIES = [
  { name: 'UI/UX Design', icon: '🎨' },
  { name: 'Editing', icon: '✏️' },
  { name: 'Development', icon: '💻' },
  { name: 'Marketing', icon: '📈' },
  { name: 'Accounting', icon: '📊' }
];

export const TESTIMONIALS = [
  {
    id: 1,
    text:
      "Thanks to this platform, I found a frontend role that perfectly matched my skills in less than two weeks. The filters actually work.",
    name: "Olivia Carter",
    position: "Frontend Developer",
  },
  {
    id: 2,
    text:
      "As a hiring manager, I was impressed by the quality of candidates coming from this platform. It saves an incredible amount of time.",
    name: "Daniel Moore",
    position: "CTO at FinTech Startup",
  },
  {
    id: 3,
    text:
      "I switched careers into tech and landed my first junior role here. The category-based search made everything much clearer.",
    name: "Emily Nguyen",
    position: "Junior React Developer",
  },
  {
    id: 4,
    text:
      "We filled two open positions faster than ever. This is now our go-to platform for tech hiring.",
    name: "Michael Thompson",
    position: "HR Lead",
  },
  {
    id: 5,
    text:
      "Clean UI, relevant jobs, no spam. I finally feel like the platform is built for developers, not recruiters.",
    name: "Sophia Martinez",
    position: "Full-Stack Engineer",
  },
];
