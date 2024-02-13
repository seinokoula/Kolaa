'use client'

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);
interface Profile {
    id: number;
    name: string;
    description: string;
    location: string;
}
function InfoProfile(_props: any) {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [lastFetchTime, setLastFetchTime] = useState(0);

    let access_token: string = '';
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('user') || '';
    }

    useEffect(() => {
        async function getProfil() {
            const currentTime = Date.now();
            if (currentTime - lastFetchTime > 1000) {
                const { data, error } = await supabase
                    .from('profil')
                    .select(`id, name, description, location`)
                    .eq('user_id', access_token)
                    .single();
                if (error) {
                    console.log('error', error);
                } else {
                    setProfile(data || null);
                    setLastFetchTime(currentTime);
                    console.log('profil', profile);
                }
            }
        }

        // Call getProfil function only when access_token changes
        getProfil();
    }, [access_token, profile, lastFetchTime]);

    return (
        <>
            <h2 className="text-4xl font-bold leading-10 tracking-tight px-6">Profile</h2>
            <div className='mx-auto max-w-7xl px-6 sm:py-24 lg:px-8 gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                <div className="border border-secondary_200 text-white shadow-lg rounded-lg p-6">
                    <div>
                        <h1 className='text-xl'>Nom : </h1>
                        <p className='font-bold text-4xl w-fit'>{profile?.name}</p>
                    </div>
                </div>
                <div className="border border-secondary_200 text-white shadow-lg rounded-lg p-6">
                    <div>
                        <h1 className='text-xl'>Description : </h1>
                        <p className='font-bold text-4xl w-fit'>{profile?.description}</p>
                    </div>
                </div>
                <div className="border border-secondary_200 text-white shadow-lg rounded-lg p-6">
                    <div>
                        <h1 className='text-lg'>localisation : </h1>
                        <p className='font-bold text-4xl w-fit'>{profile?.location}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default InfoProfile;