"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import PostForm from "./Post";

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
    image: string;
}
interface Module {
    id: number;
    module: string;
}

function GetAllPost(_props: any) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [modulesList, setModulesList] = useState<Module[]>([]);
    const [displayForm, setDisplayForm] = useState<boolean>(false);
    const [module, setModule] = useState<string>("");

    useEffect(() => {
        async function getPosts() {
            const { data, error } = await supabase
                .from("post")
                .select("*")
                .eq("module", module);
            if (error) {
                console.error(error);
            } else {
                setPosts(data ? data.reverse() : []);
            }
        }
        getPosts();
    }, [module]);

    useEffect(() => {
        async function getModules() {
            const { data, error } = await supabase.from("schoolModule").select("*");
            if (error) {
                console.error(error);
            } else {
                setModulesList(data ? data.reverse() : []);
            }
        }
        getModules();
    }, []);

    const handleButtonClick = () => {
        setDisplayForm((prevDisplayForm) => !prevDisplayForm);
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="flex w-full justify-between">
                <h2 className="text-4xl font-bold leading-10 tracking-tight">Feed</h2>
                <button
                    className='border-four_400 border-2 rounded-lg shadow-md p-4 mb-4'
                    onClick={handleButtonClick}
                >
                    Post +
                </button>
            </div>
            <select
                className=" text-white pr-2 bg-black rounded-lg shadow-md p-2 mb-4 w-80"
                onChange={(event) => setModule(event.target.value)}
                value={module}
            >
                <option value="">Select a Module</option>
                {modulesList.map((module: Module) => (
                    <option key={module.id} value={module.module}>
                        {module.module}
                    </option>
                ))}
            </select>
            {displayForm && <PostForm />}
            <h2 className="text-3xl font-bold leading-10 tracking-tight">{module}</h2>
            <div className="mt-8">
                {posts.map((post: Post) => (
                    <div
                        key={post.id}
                        className="border-secondary_200 border rounded-lg shadow-md p-4 mb-4 flex-wrap"
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
                            <p className="text-gray-500">{module}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default GetAllPost;
