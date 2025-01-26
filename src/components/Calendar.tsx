import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Note } from '../types/note';

interface CalendarProps {
  notes: Note[];
}

export function Calendar({ notes }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const getNotesForDay = (day: number) => {
    return notes.filter((note) => {
      const noteDate = new Date(note.created);
      return (
        noteDate.getDate() === day &&
        noteDate.getMonth() === currentDate.getMonth() &&
        noteDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  return (
    <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={previousMonth}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={nextMonth}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {days.map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="h-24 bg-gray-50 p-2 dark:bg-gray-800"
          />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayNotes = getNotesForDay(day);

          return (
            <div
              key={day}
              className="dark:hover:bg-gray-750 group relative h-24 bg-gray-50 p-2 transition-colors hover:bg-gray-100 dark:bg-gray-800"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {day}
              </span>
              {dayNotes.length > 0 && (
                <div className="mt-1 space-y-1">
                  {dayNotes.map((note) => (
                    <div
                      key={note.id}
                      className={`truncate rounded px-1 py-0.5 text-xs ${
                        note.type === 'personal'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : note.type === 'business'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {note.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
