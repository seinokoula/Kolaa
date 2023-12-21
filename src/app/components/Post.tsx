import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

function PostForm(_props: any) {
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if(localStorage.getItem('user') === null && localStorage.getItem('userRefresh') === null){
            alert('Please login first');
            return;
        }
        
        const access_token: string = localStorage.getItem('user') || '';
        const refresh_token: string = localStorage.getItem('userRefresh') || '';
        
        supabase.auth.setSession({
            access_token,
            refresh_token
        });

        const { data, error } = await supabase.from('post').insert({
            description: description,
            title: title,
            link: link,
           // profil_id: access_token,
        });
        console.log(access_token, refresh_token)
        console.log(data, error);
// user id to profile id et on insert le profil id
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            alert('Post created successfully');
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <h2 className="text-4xl font-bold leading-10 tracking-tight ">Create a Post</h2>
            <form
                onSubmit={handleSubmit}
                className="pt-12 pb-8 mb-4"
            >
                 <div className="mb-4">
                    <label className="block text-xl text-left mb-2">Title:</label>
                    <textarea
                        placeholder="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-xl text-left mb-2">Description:</label>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
               
                <div className="mb-4">
                    <label className="block text-xl text-left mb-2">Link:</label>
                    <input
                        type="text"
                        placeholder="Link"
                        value={link}
                        onChange={(event) => setLink(event.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="inline-block p-4 text-lg font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg shadow-2xl mt-6 hover:bg-indigo-600 hover:text-white hover:shadow-none"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default PostForm;
