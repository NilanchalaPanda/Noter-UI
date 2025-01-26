import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Note } from '../types/note';
import { formatDate } from '../utils/formatDate';
import { formatTimeLeft } from '../utils/formatTimeLeft';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const timeLeft = note.deadline ? formatTimeLeft(note.deadline) : null;

  return (
    <Link
      to={`/note/${note.id}`}
      className="group block space-y-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {note.title}
        </h3>
        {timeLeft && (
          <div className="flex items-center space-x-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            <Clock className="h-4 w-4" />
            <span>{timeLeft}</span>
          </div>
        )}
      </div>

      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Calendar className="mr-1 h-4 w-4" />
        <span>{formatDate(note.created)}</span>
      </div>

      <p className="line-clamp-3 text-gray-600 dark:text-gray-300">
        {note.body}
      </p>

      <div
        className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
        style={{
          backgroundColor:
            note.type === 'personal'
              ? 'rgba(59, 130, 246, 0.1)'
              : note.type === 'business'
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(239, 68, 68, 0.1)',
          color:
            note.type === 'personal'
              ? 'rgb(59, 130, 246)'
              : note.type === 'business'
                ? 'rgb(16, 185, 129)'
                : 'rgb(239, 68, 68)',
        }}
      >
        {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
      </div>
    </Link>
  );
}
