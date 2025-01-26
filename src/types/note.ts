export type NoteType = 'personal' | 'business' | 'important';

export interface Note {
  id: string;
  title: string;
  body: string;
  created: Date;
  deadline?: Date;
  type: NoteType;
}
