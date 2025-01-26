import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            exit={{ opacity: 0, width: 0 }}
            className="absolute right-0 top-1/2 z-50 w-full -translate-y-1/2 md:w-96"
          >
            <div className="relative">
              <input
                type="search"
                placeholder="Search notes..."
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Search className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
