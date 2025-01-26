import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { NoteFilter } from '../components/NoteFilter';
import { NoteCard } from '../components/NoteCard';
import { SearchModal } from '../components/SearchModal';
import { EmptyState } from '../components/EmptyState';
import type { Note, NoteType } from '../types/note';

// Sample data - replace with actual data management
const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Meeting Notes',
    body: 'Discuss project timeline and deliverables with the team.',
    created: new Date('2024-03-10'),
    deadline: new Date('2024-03-15'),
    type: 'business',
  },
  {
    id: '2',
    title: 'Shopping List',
    body: 'Buy groceries for the week: milk, eggs, bread...',
    created: new Date('2024-03-11'),
    deadline: new Date('2024-03-12'),
    type: 'personal',
  },
  {
    id: '3',
    title: 'Project Deadline',
    body: 'Complete the project presentation by Friday.',
    created: new Date('2024-03-12'),
    deadline: new Date('2024-03-17'),
    type: 'important',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function HomePage() {
  const [filter, setFilter] = useState<NoteType | 'all'>('all');
  const [status, setStatus] = useState<'all' | 'active' | 'overdue'>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredNotes = sampleNotes
    .filter((note) => (filter === 'all' ? true : note.type === filter))
    .filter((note) => {
      if (status === 'all') return true;
      const isOverdue = note.deadline && new Date(note.deadline) < new Date();
      return status === 'overdue' ? isOverdue : !isOverdue;
    });

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat dark:bg-gray-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Notes
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)} // Open the modal
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <div className="flex items-center justify-center gap-x-2">
                <span className="opacity-50">(Ctrl + K)</span>
                <Search className="h-5 w-5" />
              </div>
            </button>
            <Link
              to="/new"
              className="flex items-center space-x-1 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add Note</span>
            </Link>
          </div>
        </div>

        <NoteFilter
          selected={filter}
          status={status}
          onTypeChange={setFilter}
          onStatusChange={setStatus}
        />

        {filteredNotes.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredNotes.map((note) => (
              <motion.div key={note.id} variants={item}>
                <NoteCard note={note} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Pass setIsSearchOpen to SearchModal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)} // Close the modal
        notes={sampleNotes}
        setIsSearchOpen={setIsSearchOpen} // Pass setIsSearchOpen to control modal visibility
      />
    </div>
  );
}
