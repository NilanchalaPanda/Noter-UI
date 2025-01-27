import { Navbar } from '../components/Navbar';
import { motion } from 'framer-motion';
import { SearchBar } from '../components/SearchBar';
import { Calendar } from '../components/Calendar';
import type { Note } from '../types/note';

// Sample data - replace with actual data management
const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Meeting Notes',
    body: 'Discuss project timeline and deliverables with the team.',
    created: new Date('2024-03-10'),
    categories: 'business',
  },
  {
    id: '2',
    title: 'Shopping List',
    body: 'Buy groceries for the week: milk, eggs, bread...',
    created: new Date('2024-03-11'),
    categories: 'personal',
  },
  {
    id: '3',
    title: 'Project Deadline',
    body: 'Complete the project presentation by Friday.',
    created: new Date('2024-03-12'),
    categories: 'important',
  },
];

export function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-montserrat dark:bg-gray-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Calendar View
          </h1>
          <SearchBar />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Calendar notes={sampleNotes} />
        </motion.div>
      </main>
    </div>
  );
}
