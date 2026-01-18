import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils/constants";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
        {/* Logo + About */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-orange-500">Job Seeker</h3>
          <p className="text-gray-600 max-w-xs">
            Discover thousands of curated opportunities. Helping applicants find the perfect match, and employers hire the best talent.
          </p>
          <Link to="/register" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-center rounded-full px-6 py-2 font-medium transition-colors">
            Start Hiring (For Employers)
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-gray-800">Navigation</h4>
          <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors">
            Home
          </Link>
          <Link to="/jobs" className="text-gray-600 hover:text-orange-500 transition-colors">
            Jobs
          </Link>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-gray-800">Jobs Categories</h4>
          <div className="flex flex-col gap-1 mt-1">
            {CATEGORIES.map((cat, i) => (
              <Link to={`/jobs?category=${cat.name}`} key={i} className="text-gray-800">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-6 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Job Seeker. All rights reserved.</p>
          {/* <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Contact</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
