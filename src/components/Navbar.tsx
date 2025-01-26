import { StickyNote, Menu, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isCalendarPage = location.pathname === '/calendar';

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white font-montserrat dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <StickyNote className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Notes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              to="/"
              className={`flex items-center space-x-2 ${
                !isCalendarPage
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <StickyNote className="h-5 w-5" />
              <span>Notes</span>
            </Link>
            <Link
              to="/calendar"
              className={`flex items-center space-x-2 ${
                isCalendarPage
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Calendar</span>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden bg-white dark:bg-gray-900 md:hidden"
      >
        <div className="space-y-3 px-4 py-3">
          <Link
            to="/"
            className={`flex items-center space-x-2 ${
              !isCalendarPage
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <StickyNote className="h-5 w-5" />
            <span>Notes</span>
          </Link>
          <Link
            to="/calendar"
            className={`flex items-center space-x-2 ${
              isCalendarPage
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Calendar className="h-5 w-5" />
            <span>Calendar</span>
          </Link>
          <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
            <ThemeToggle />
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
