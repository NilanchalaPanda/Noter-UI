import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Note, NoteType } from '../types/note';

interface NoteFormProps {
  note?: Note;
  onSubmit: (note: Omit<Note, 'id' | 'created'>) => void;
  onCancel: () => void;
}

export function NoteForm({ note, onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');
  const [slug, setSlug] = useState(note?.slug || '');
  const [categories, setCategories] = useState<NoteType>(
    note?.categories || 'personal'
  );
  const [deadline, setDeadline] = useState(
    note?.deadline ? new Date(note.deadline).toISOString().split('T')[0] : ''
  );

  const handleTitleAndSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    const titleVal = e.target.value;
    setSlug(titleVal.toLowerCase().split(' ').join('-'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      body,
      slug,
      categories,
      deadline: deadline ? new Date(deadline) : undefined,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleAndSlug}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Slug
        </label>
        <input
          disabled
          type="slug"
          id="slug"
          value={slug}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="categories"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Type
        </label>
        <select
          id="categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value as NoteType)}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="PERSONAL">Personal</option>
          <option value="BUSINESS">Business</option>
          <option value="IMPORTANT">Important</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="deadline"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Deadline (optional)
        </label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          {note ? 'Update' : 'Create'} Note
        </button>
      </div>
    </motion.form>
  );
}
