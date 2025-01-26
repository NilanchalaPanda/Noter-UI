import { formatDistanceToNow, isPast } from 'date-fns';

export function formatTimeLeft(deadline: Date): string {
  if (isPast(deadline)) {
    return 'Overdue';
  }
  return formatDistanceToNow(deadline, { addSuffix: true });
}
