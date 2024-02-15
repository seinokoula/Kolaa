'use client';

import SearchBar from '../app/components/SearchBar'
import GetAllPost from '../app/components/GetAllPost'
import Header from './components/Header';
import { useState } from 'react';


export default function Example() {
  const [searchTermForPosts, setSearchTermForPosts] = useState<string>('');

  return (
    <div className="mw">
      <link rel="icon" href="/src/app/favicon.ico" sizes="any" />
      <Header />
      <SearchBar setSearchTermForPosts={setSearchTermForPosts} />
      <GetAllPost searchTerm={searchTermForPosts} />
    </div>
  );
}
