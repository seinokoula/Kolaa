"use client";

import React, { FC, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

interface Profil {
  id: number;
  name: string;
}

interface SearchBarProps {
  setSearchTermForPosts: React.Dispatch<React.SetStateAction<string>>;
}

const Example: FC<SearchBarProps> = ({ setSearchTermForPosts }) => {
  const [profils, setProfils] = useState<Profil[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function getProfils() {
      const { data, error } = await supabase.from("profil").select("*");
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
    <div
      className="mx-auto px-4 text-center md:max-w-7xl md:px-8 max-w-7xl"
      id="feed"
    >
      <input
        className="peer h-12 w-full text-sm text-white pr-2 rounded-full bg-black"
        type="text"
        id="search"
        placeholder="Search something.."
        onBlurCapture={() => {
          if (search) {
            console.log(search + " blur");
            setSearch(false);
          } else {
            console.log(search + " else");
          }
        }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSearch(true);
          setSearchTermForPosts(e.target.value);
        }}
      />
    </div>
  );
};

export default Example;
