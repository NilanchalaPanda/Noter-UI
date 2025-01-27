import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { NoteForm } from '../components/NoteForm';
import toast from 'react-hot-toast';
import type { Note } from '../types/note';
import axios from 'axios';

export function NewNotePage() {
  const navigate = useNavigate();

  const handleSubmit = async (noteData: Omit<Note, 'id' | 'created'>) => {
    try {
      axios.post('http://127.0.0.1:8000/notes/', noteData);
      toast.success('Note created successfully!');
      navigate('/')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Failed to create note. Please try again later.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
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