'use client';

import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { motion } from "framer-motion"
import SearchBar from '../app/components/SearchBar'
import GetAllPost from '../app/components/GetAllPost'
import Header from './components/Header';
import { useState } from 'react';

const features = [
  {
    name: 'Push to deploy',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
  },
]

export default function Example() {
  const [searchTermForPosts, setSearchTermForPosts] = useState<string>('');

  return (
    <div className="mw">
      <Header />
      <SearchBar setSearchTermForPosts={setSearchTermForPosts} />
      <GetAllPost searchTerm={searchTermForPosts} />
    </div>
  );
}
