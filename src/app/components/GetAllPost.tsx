'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import PostForm from './Post';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);


interface Post {
    id: number;
    title: string;
    description: string;
    link: string;
    created_at: Date;
    profil_id: number;
}

function GetAllPost(_props: any) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [displayForm, setDisplayForm] = useState<boolean>(false);

    useEffect(() => {
        async function getPosts() {
            const { data, error } = await supabase
                .from('post')
                .select('*');
            if (error) {
                console.error(error);
            } else {
                setPosts(data || []);
            }
        }
        getPosts();
    }, []);

    const handleButtonClick = () => {
        setDisplayForm(true);
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <h2 className="text-4xl font-bold leading-10 tracking-tight">Feed</h2>
            <button onClick={handleButtonClick}>Post +</button>
            {displayForm && (
                <PostForm />
            )}
            <div className="mt-8">
                {posts.map((post: Post) => (
                    <div key={post.id} className="border-gray-200 border rounded-lg shadow-md p-4 mb-4">
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p className="text-gray-400 mb-2">{post.description}</p>
                        <a href={post.link} className="text-blue-500 hover:underline mb-2">{post.link}</a>
                        <p className="text-gray-600 text-sm">{post.created_at.toString()}</p>
                        <p>{post.profil_id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default GetAllPost;