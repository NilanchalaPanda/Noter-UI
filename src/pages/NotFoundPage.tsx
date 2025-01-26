import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-montserrat dark:bg-gray-900">
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="mb-4 text-9xl font-bold text-gray-200 dark:text-gray-700">
            404
          </h1>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
