import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { NoteFilter } from '../components/NoteFilter';
import { NoteCard } from '../components/NoteCard';
import { SearchModal } from '../components/SearchModal';
import { EmptyState } from '../components/EmptyState';
import type { Note, NoteType } from '../types/note';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SkeletonCard } from '../components/SkeletonCard';

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
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/notes/');
        setNotes(response.data);
        setLoading(false);
      } catch(err) {
        toast.error('Failed to load notes. Please try again later.');
        console.log(err)
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);



  const filteredNotes = notes
    .filter((note) => (filter === 'all' ? true : note.categories === filter))

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
          onTypeChange={setFilter}
        />

        {loading ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {[...Array(6)].map((_, index) => (
              <motion.div key={index} variants={item}>
                <SkeletonCard />
              </motion.div>
            ))}
          </motion.div>
        ) : filteredNotes.length === 0 ? (
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

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)} // Close the modal
        notes={notes}
        setIsSearchOpen={setIsSearchOpen} // Pass setIsSearchOpen to control modal visibility
      />
    </div>
  );
}
