"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

interface Profile {
    id: number;
    name: string;
    description: string;
    location: string;
}

interface Post {
    id: number;
    title: string;
    description: string;
    link: string;
    created_at: Date;
    profil_id: number;
    image: string;
}

interface InfoProfileProps {
    onProfileNotFound: () => void;
}

function InfoProfile({ onProfileNotFound }: InfoProfileProps) {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [lastFetchTime, setLastFetchTime] = useState(0);
    const [posts, setPosts] = useState<Post[]>([]);

    let access_token: string = "";
    if (typeof window !== "undefined") {
        access_token = localStorage.getItem("user") || "";
    }

    useEffect(() => {
        async function getProfil() {
            const currentTime = Date.now();
            if (currentTime - lastFetchTime > 1000) {
                const { data, error } = await supabase
                    .from("profil")
                    .select(`id, name, description, location`)
                    .eq("user_id", access_token)
                    .single();

                if (error) {
                    console.log("error", error);
                } else {
                    if (data) {
                        onProfileNotFound();
                        setProfile(data);
                        setLastFetchTime(currentTime);
                        console.log("profil", profile);
                    } else {
                    }
                }
            }
        }
        getProfil();
    }, [access_token, profile, lastFetchTime, onProfileNotFound]);

    useEffect(() => {
        async function getPosts() {
            const { data, error } = await supabase
                .from("post")
                .select("*")
                .eq("user_id", access_token);
            if (error) {
                console.error(error);
            } else {
                setPosts(data ? data.reverse() : []);
            }
        }
        getPosts();
    }, [access_token]);

    async function deletePost(postId: number) {
        const { data, error } = await supabase
            .from("post")
            .delete()
            .eq("id", postId);

        if (error) {
            console.error("Error deleting post:", error);
        } else {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        }
    }

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
                <div className="mt-8">
                    {posts.map((post: Post) => (
                        <div
                            key={post.id}
                            className="relative border-gray-400 border rounded-lg shadow-md p-4 mb-4 flex-wrap"
                        >
                            <div className="card-content">
                                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                <p className="text-gray-400 mb-2">{post.description}</p>
                                <a
                                    href={post.link}
                                    className="text-blue-500 hover:underline mb-2 max-w-fit"
                                    style={{ wordBreak: "break-all" }}
                                >
                                    {post.link}
                                </a>
                                <p className="text-gray-600 text-sm">
                                    {new Date(post.created_at).toLocaleDateString("fr-FR", {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: false,
                                    })}
                                </p>
                                <button
                                    onClick={() => deletePost(post.id)}
                                    className="border-gray-400 border rounded-lg shadow-md p-2 flex-wrap absolute bottom-0 right-0 mr-4 mb-4"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default InfoProfile;
