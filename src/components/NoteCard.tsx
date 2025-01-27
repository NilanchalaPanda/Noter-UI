import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Note } from '../types/note';
import { formatTimeLeft } from '../utils/formatTimeLeft';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  console.log(note)

  return (
    <Link
      to={`/note/${note.slug}`}
      className="group block space-y-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {note.title}
        </h3>
      </div>

      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Calendar className="mr-1 h-4 w-4" />
        <span>{new Date(note.created).toLocaleDateString()}</span>
      </div>

      <p className="line-clamp-3 text-gray-600 dark:text-gray-300">
        {`${note.body.split(' ').slice(0, 10).join(' ')}...`}
      </p>

      <div
        className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
        style={{
          backgroundColor:
            note.categories === 'PERSONAL'
              ? 'rgba(59, 130, 246, 0.1)'
              : note.categories === 'BUSINESS'
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(239, 68, 68, 0.1)',
          color:
            note.categories === 'PERSONAL'
              ? 'rgb(59, 130, 246)'
              : note.categories === 'BUSINESS'
                ? 'rgb(16, 185, 129)'
                : 'rgb(239, 68, 68)',
        }}
      >
        {note.categories}
      </div>
    </Link>
  );
}
