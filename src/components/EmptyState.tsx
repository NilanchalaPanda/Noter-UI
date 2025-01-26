import { StickyNote, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-800/50"
    >
      <StickyNote className="mb-4 h-12 w-12 text-gray-400 dark:text-gray-500" />
      <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
        No notes yet
      </h3>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        Get started by creating your first note
      </p>
      <Link
        to="/new"
        className="inline-flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
      >
        <Plus className="h-5 w-5" />
        <span>Create Note</span>
      </Link>
    </motion.div>
  );
}
