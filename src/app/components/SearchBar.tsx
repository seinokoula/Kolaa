'use client';

import React, { FC, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

interface Profil {
  id: number;
  name: string;
}

const Example: FC = () => {
  const [profils, setProfils] = useState<Profil[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function getProfils() {
      const { data, error } = await supabase
        .from('profil')
        .select('*');
      if (error) {
        console.error(error);
      } else {
        setProfils(data || []);
      }
    }
    getProfils();
  }, [setProfils]);

  const filteredProfils = profils.filter((profil) =>
  profil.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className='max-w-md mx-auto'>
      <input
          className="peer h-full w-full text-sm text-black pr-2"
          type="text"
          id="search"
          placeholder="Search something.."
          
          onBlurCapture={() => {
            if (search ) {
              console.log( search +' blur')
              setSearch(false)
            }else{
              console.log( search +' else')
            }
          }}
          
          // onFocusCapture={() => {
          //   if (search ) {
          //     console.log( search +' blur')
          //     setSearch(true)
          //   }else{
          //     console.log( search +' else')
          //   }
          // }}

          onChange={(e) => {
            console.log(search + " change");
            setSearchTerm(e.target.value);
            setSearch(true);
          }}
        />
      {search  && (
        <div className=' text-white'>
          {filteredProfils.map((profil: Profil) => (
            <div key={profil.id} className="border-gray-200 border rounded-lg shadow-md p-4 mb-4">
              <h3>{profil.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
    
  );
}

export default Example;
