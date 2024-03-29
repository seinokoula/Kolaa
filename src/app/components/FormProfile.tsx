"use client";

import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

function Form(_props: any) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [errorProfil, setErrorProfil] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

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
        console.log(access_token, refresh_token);
        const { data, error } = await supabase.from("profil").insert({
            name,
            description,
            location,
        });

        if (error) {
            console.log(error);
            setErrorProfil(true);
            setErrorMsg(error.message);
        } else {
            console.log(data);
            window.location.reload();
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <h2 className="text-4xl font-bold leading-10 tracking-tight ">Profile</h2>
            <form onSubmit={handleSubmit} className="pt-12 pb-8 mb-4">
                {errorProfil && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert
                            variant="filled"
                            severity="error"
                            onClose={() => {
                                setErrorProfil(false);
                            }}
                        >
                            {errorMsg}
                        </Alert>
                    </Stack>
                )}
                <div className="mb-4">
                    <label className="block text-xl text-left mb-2">Name:</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
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
                    <label className="block text-xl text-left mb-2">Location:</label>
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
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

export default Form;
