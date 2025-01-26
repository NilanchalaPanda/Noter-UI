import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { NoteForm } from '../components/NoteForm';
import toast from 'react-hot-toast';
import type { Note } from '../types/note';

// Sample data - replace with actual data management
const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Meeting Notes',
    body: 'Discuss project timeline and deliverables with the team.',
    created: new Date('2024-03-10'),
    type: 'business',
  },
];

export function NotePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const note = sampleNotes.find((n) => n.id === id);

  if (!note) {
    return <div>Note not found</div>;
  }

  const handleDelete = () => {
    // Add actual delete logic here
    toast.success('Note deleted successfully');
    navigate('/');
  };

  const handleUpdate = (noteData: Omit<Note, 'id' | 'created'>) => {
    // Add actual update logic here
    console.log('Updating note:', noteData);
    toast.success('Note updated successfully');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {isEditing ? (
          <div>
            <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
              Edit Note
            </h1>
            <NoteForm
              note={note}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {note.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Created on {new Date(note.created).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="mb-6 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
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
          </div>
        )}
      </main>
    </div>
  );
}