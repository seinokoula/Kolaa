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
  module: string;
  user_id: string;
}
interface Module {
  id: number;
  module: string;
}

interface GetAllPostProps {
  searchTerm: string;
}

interface Profile {
  id: number;
  name: string;
  user_id: string;
}

function GetAllPost({ searchTerm }: GetAllPostProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [module, setModule] = useState<string>("");
  const [profile, setProfile] = useState<Profile[]>([]);

  useEffect(() => {
    async function getPosts() {
      const { data, error } = await supabase
        .from("post")
        .select("*")
        .eq("module", module)
        .ilike("title", `%${searchTerm}%`);
      if (error) {
        console.error(error);
      } else {
        setPosts(data ? data.reverse() : []);
      }
    }
    getPosts();
  }, [module, searchTerm]);

  useEffect(() => {
    async function getAllPosts() {
      const { data, error } = await supabase
        .from("post")
        .select("*")
        .ilike("title", `%${searchTerm}%`);
      if (error) {
        console.error(error);
      } else {
        setAllPosts(data ? data.reverse() : []);
      }
    }
    getAllPosts();
  }, [searchTerm]);

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
  }, [setModulesList]);

  useEffect(() => {
    async function getProfil() {
      const { data, error } = await supabase.from("profil").select("*");
      if (error) {
        console.error(error);
      } else {
        setProfile(data ? data.reverse() : []);
      }
    }
    getProfil();
  }, [setProfile]);
  
  const handleButtonClick = () => {
    setDisplayForm((prevDisplayForm) => !prevDisplayForm);
  };

  const findProfilName = (userId: string) => {
    return profile.find((p) => p.user_id === userId)?.name || "Inconnu";
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="flex w-full justify-between">
        <h2 className="text-4xl font-bold leading-10 tracking-tight">Feed</h2>
        <button
          className="border-four_400 border-2 rounded-lg shadow-md p-4 mb-4"
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
        <option value="">All</option>
        <option disabled value="">
          -------
        </option>

        {modulesList.map((module: Module) => (
          <option key={module.id} value={module.module}>
            {module.module}
          </option>
        ))}
      </select>
      {displayForm && <PostForm />}
      <h2 className="text-3xl font-bold leading-10 tracking-tight">{module}</h2>
      <div className="mt-8">
        {module === ""
          ? allPosts.map((post: Post) => (
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
                  <p className="text-gray-500">{post.module}</p>
                    <h3 className="text-gray-500">
                      Par : {findProfilName(post.user_id)}
                    </h3>
                </div>
              </div>
            ))
          : posts.map((post: Post) => (
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
                  <p className="text-gray-500">{post.module}</p>
                    <h3 className="text-gray-500">
                      Par : {findProfilName(post.user_id)}
                    </h3>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
export default GetAllPost;
