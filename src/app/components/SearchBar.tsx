'use client';

import React, { FC, useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FaceFrownIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

interface Item {
  url: string;
  id: number;
  name: string;
}

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

const Example: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(true);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function getItems() {
        const { data, error } = await supabase
            .from('profil')
            .select('*');
        if (error) {
            console.error(error);
        } else {
            setItems(data || []);
        }
    }
    getItems();
}, []);

  const filteredItems: Item[] =
    query === ''
      ? []
      : items.filter((item: Item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
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