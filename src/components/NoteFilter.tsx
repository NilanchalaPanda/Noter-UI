import { ChevronDown } from 'lucide-react';
import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';
import type { NoteType } from '../types/note';

interface NoteFilterProps {
  selected: NoteType | 'all';
  status: 'all' | 'active' | 'overdue';
  onTypeChange: (type: NoteType | 'all') => void;
  onStatusChange: (status: 'all' | 'active' | 'overdue') => void;
}

export function NoteFilter({
  selected,
  status,
  onTypeChange,
  onStatusChange,
}: NoteFilterProps) {
  const types = [
    { value: 'all', label: 'All Notes' },
    { value: 'personal', label: 'Personal' },
    { value: 'business', label: 'Business' },
    { value: 'important', label: 'Important' },
  ] as const;

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'overdue', label: 'Overdue' },
  ] as const;

  return (
    <div className="mb-6 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
      <div className="font-montserrat italic text-gray-600 dark:text-gray-300">
        "Organization is the key to productivity"
      </div>

      <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
        <Menu as="div" className="relative">
          <Menu.Button className="flex min-w-[160px] items-center justify-between space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            <span>{types.find((t) => t.value === selected)?.label}</span>
            <ChevronDown className="h-4 w-4" />
          </Menu.Button>

          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none dark:border-gray-700 dark:bg-gray-800">
            {types.map((type) => (
              <Menu.Item key={type.value}>
                {({ active }) => (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} ${
                      selected === type.value
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-900 dark:text-white'
                    } group flex w-full items-center px-4 py-2 text-sm`}
                    onClick={() => onTypeChange(type.value)}
                  >
                    {type.label}
                  </motion.button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>

        <Menu as="div" className="relative">
          <Menu.Button className="flex min-w-[160px] items-center justify-between space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            <span>{statuses.find((s) => s.value === status)?.label}</span>
            <ChevronDown className="h-4 w-4" />
          </Menu.Button>

          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none dark:border-gray-700 dark:bg-gray-800">
            {statuses.map((statusOption) => (
              <Menu.Item key={statusOption.value}>
                {({ active }) => (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} ${
                      status === statusOption.value
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-900 dark:text-white'
                    } group flex w-full items-center px-4 py-2 text-sm`}
                    onClick={() => onStatusChange(statusOption.value)}
                  >
                    {statusOption.label}
                  </motion.button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}