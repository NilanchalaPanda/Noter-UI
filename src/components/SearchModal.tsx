import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NoteCard } from './NoteCard';
import type { Note } from '../types/note';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: Note[];
  setIsSearchOpen: (isOpen: boolean) => void;  // Add this to control opening the modal
}

export function SearchModal({ isOpen, onClose, notes, setIsSearchOpen }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open the modal with 'Ctrl + K' (or 'Cmd + K' on macOS)
      if (e.key === 'k' && (e.metaKey || e.ctrlKey) && !isOpen) {
        e.preventDefault(); // Prevent default behavior
        setIsSearchOpen(true);  // Open the modal when Ctrl + K is pressed
      }

      // Close the modal with 'Escape' key
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, setIsSearchOpen]);

  useEffect(() => {
    // Filter notes based on the search query
    if (searchQuery) {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes([]);
    }
  }, [searchQuery, notes]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-[95%] max-w-3xl rounded-lg bg-white shadow-xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search notes... (Press Ctrl + K)"
                className="w-full rounded-t-lg border-b border-gray-200 bg-transparent py-4 pl-12 pr-12 text-gray-900 focus:outline-none dark:border-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {filteredNotes.length > 0 ? (
                <div className="grid gap-4">
                  {filteredNotes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              ) : searchQuery ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No notes found
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
