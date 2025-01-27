export type NoteType = 'PERSONAL' | 'BUSINESS' | 'IMPORTANT';

export interface Note {
  id: string;
  title: string;
  body: string;
  slug?: string;
  created: Date;
  categories: NoteType;
}
