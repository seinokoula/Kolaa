'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function DarkMode() {
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    return (

        <button
            className={`w-8 rounded-md hover:bg-gray-100 p-2 ml-4 flex items-center`}
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
        >
            {currentTheme === 'dark' ? <SunIcon className="h-4 w-4 text-yellow-400 mx-auto" /> : <MoonIcon className="h-4 w-4 text-gray-600 mx-auto" />}
        </button>

    )
}