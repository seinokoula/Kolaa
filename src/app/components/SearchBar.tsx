'use client';

import React, { FC, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FaceFrownIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { Combobox, Dialog, Transition } from '@headlessui/react';

interface Item {
  id: number;
  name: string;
  category: string;
  url: string;
}

const items: Item[] = [
  { id: 1, name: 'Workflow Inc.', category: 'Clients', url: '#' },
  { id: 24, name: 'Workflow2 Inc.', category: 'Projects', url: '#' },
  { id: 2, name: 'Blogging 101', category: 'Projects', url: '#' },
  { id: 3, name: 'Sales Presentation', category: 'Projects', url: '#' },
  { id: 4, name: 'UX Improvements', category: 'Projects', url: '#' },
  { id: 5, name: 'Engineering Blog', category: 'Internal', url: '#' },
  { id: 6, name: 'Customer Interviews', category: 'Internal', url: '#' },
  { id: 7, name: 'Product Strategy', category: 'Internal', url: '#' },
  { id: 8, name: 'Q4 Planning', category: 'Internal', url: '#' },
  { id: 9, name: 'Customer Interviews', category: 'Internal', url: '#' },
  { id: 10, name: 'Product Strategy', category: 'Internal', url: '#' },
  { id: 11, name: 'Q4 Planning', category: 'Internal', url: '#' },
  { id: 12, name: 'Customer Interviews', category: 'Internal', url: '#' },
  { id: 13, name: 'Product Strategy', category: 'Internal', url: '#' },
  { id: 14, name: 'Q4 Planning', category: 'Internal', url: '#' },
  { id: 15, name: 'Customer Interviews', category: 'Internal', url: '#' },
  { id: 16, name: 'Product Strategy', category: 'Internal', url: '#' },
  { id: 17, name: 'Q4 Planning', category: 'Internal', url: '#' },
  { id: 18, name: 'Customer Interviews', category: 'Internal', url: '#' },
  { id: 19, name: 'Product Strategy', category: 'Internal', url: '#' },
  { id: 20, name: 'Q4 Planning', category: 'Internal', url: '#' },
  { id: 21, name: 'Customer Interviews', category: 'Internal', url: '#' },
  { id: 22, name: 'Product Strategy', category: 'Internal', url: '#' },
  { id: 23, name: 'Q4 Planning', category: 'Internal', url: '#' },
];

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

const Example: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(true);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const filteredItems: Item[] =
    query === ''
      ? []
      : items.filter((item: Item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  const groupedItems: { [key: string]: Item[] } = {};
  filteredItems.forEach((item: Item) => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }
    groupedItems[item.category].push(item);
  });

  return (
    <div className='relative'>
      <Combobox onChange={(selectedItem: Item) => { window.location.href = selectedItem.url }}>
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            className="h-12 w-full border-2 border-white rounded-full bg-transparent pl-11 pr-4 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
        </div>

        {query === ''  && inputFocused && (
          <div className="border-t rounded-lg border-gray-100 px-6 py-14 text-center text-sm sm:px-14 w-full absolute bg-white z-10">
            <GlobeAmericasIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
            <p className="mt-4 font-semibold text-gray-900">Search for clients and projects</p>
            <p className="mt-2 text-gray-500">
              Quickly access clients and projects by running a global search.
            </p>
          </div>
        )}

        {filteredItems.length > 0 && inputFocused && (
          <Combobox.Options static className="max-h-80 rounded-lg scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2 bg-white absolute w-full z-10">
            {Object.entries(groupedItems).map(([category, items]) => (
              <li key={category}>
                <h2 className="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">{category}</h2>
                <ul className="mt-2 text-sm text-gray-800">
                  {items.map((item) => (
                    <Combobox.Option
                      key={item.id}
                      value={item}
                      className={({ active }) =>
                        classNames('cursor-pointer select-none px-4 py-2', active && 'bg-indigo-600 text-white')
                      }
                    >
                      {item.name}
                    </Combobox.Option>
                  ))}
                </ul>
              </li>
            ))}
          </Combobox.Options>
        )}

        {query !== '' && filteredItems.length === 0 && inputFocused && (
          <div className="border-t border-gray-100  px-6 py-14 text-center text-sm bg-white absolute w-full z-10 sm:px-14">
            <FaceFrownIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
            <p className="mt-4 font-semibold text-gray-900">No results found</p>
            <p className="mt-2 text-gray-500">We couldn’t find anything with that term. Please try again.</p>
          </div>
        )}
      </Combobox>
    </div>
  );
}

export default Example;