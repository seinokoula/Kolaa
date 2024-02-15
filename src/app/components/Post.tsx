import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

interface Module {
  id: number;
  module: string;
}

function PostForm(_props: any) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [module, setModule] = useState("");
  const [modulesList, setModulesList] = useState<Module[]>([]);

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (
      localStorage.getItem("user") === null &&
      localStorage.getItem("userRefresh") === null
    ) {
      alert("Please login first");
      return;
    }

    const access_token: string = localStorage.getItem("user") || "";
    const refresh_token: string = localStorage.getItem("userRefresh") || "";

    supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    const { data, error } = await supabase.from("post").insert({
      description: description,
      title: title,
      link: link,
      module: module,
      // profil_id: access_token,
    });
    console.log(access_token, refresh_token);
    console.log(data, error);
    // user id to profile id et on insert le profil id
    if (error) {
      console.log(error);
    } else {
      console.log(data);
        // Clear the form fields
        setDescription("");
        setTitle("");
        setLink("");
        setModule("");
        alert("Post created successfully");
        window.location.reload();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
      <h2 className="text-4xl font-bold leading-10 tracking-tight ">
        Create a Post
      </h2>
      <form onSubmit={handleSubmit} className="pt-12 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-xl text-left mb-2">Module:</label>
          <select
            className="border-gray-400 text-black border rounded-lg shadow-md p-2 mb-4 w-80"
            onChange={(event) => setModule(event.target.value)}
            value={module}
          >
            <option value="">All</option>
            <option disabled value="">
              -------</option>
            {modulesList.map((module: Module) => (
              <option key={module.id} value={module.module}>
                {module.module}
              </option>
            ))}
          </select>
        </div>
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
          className="inline-block text-black p-4 text-lg font-medium text-indigo-600 bg-primary_300 border border-indigo-600 rounded-lg shadow-2xl mt-6 hover:bg-indigo-600 hover:text-black hover:shadow-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostForm;
