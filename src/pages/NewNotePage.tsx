import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { NoteForm } from '../components/NoteForm';
import toast from 'react-hot-toast';
import type { Note } from '../types/note';

export function NewNotePage() {
  const navigate = useNavigate();

  const handleSubmit = (noteData: Omit<Note, 'id' | 'created'>) => {
    // Add actual create logic here
    console.log('Creating note:', noteData);
    toast.success('Note created successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          Create New Note
        </h1>
        <NoteForm onSubmit={handleSubmit} onCancel={() => navigate('/')} />
      </main>
    </div>
  );
}