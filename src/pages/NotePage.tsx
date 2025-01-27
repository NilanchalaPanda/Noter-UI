import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { NoteForm } from '../components/NoteForm';
import toast from 'react-hot-toast';
import type { Note } from '../types/note';
import axios from 'axios';

export function NotePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/notes/${id}`);
        setNote(response.data);
      } catch (err) {
        toast.error('Could not find the note!');
        console.log(err);
      }
    };

    getNote();
  }, []);

  const handleDelete = () => {
    try {
      axios
        .delete(`http://127.0.0.1:8000/notes/${id}/`)
        .then(() => toast.success('Note deleted!'))
        .catch(() => toast.error('Something went wrong'));

      navigate('/');
    } catch (err) {
      toast.error('An unexpected error occured.');
      console.log(err);
    }
  };

  const handleUpdate = (noteData: Omit<Note, 'id' | 'created'>) => {
    try {
      axios
        .put(`http://127.0.0.1:8000/notes/${id}/`, noteData)
        .then((res) => {
          console.log(res.data);
          toast.success('Note updated successfully!');
        })
        .catch((err) => {
          console.log('Updating Error : ', err);
          toast.error('Failed to update note.');
        });
      navigate(`/note/${noteData.slug}/`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Failed to create note. Please try again later.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsEditing(false);
    }
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
          note && (
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
            </div>
          )
        )}
      </main>
    </div>
  );
}
