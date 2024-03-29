import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { supabase } from "../components/Server/supabase";
import Modal from "../components/modal";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);

    const session = supabase.auth.getSession();

    session.then((data) => {
        if (data) {
            const user = data.data.session?.user.id;
            const userRefresh = data.data.session?.refresh_token;
            localStorage.setItem("user", user!);
            localStorage.setItem("userRefresh", userRefresh!);
        }
    });

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Error signing in:", error.message);
            setErrorLogin(true);
        } else {
            console.log("User signed in successfully:", data);
            // Redirect to the dashboard or any other page
            // window.location.href = "/"; // Replace '/dashboard' with your desired route
            setIsConnected(true);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            {isConnected && <Modal modalText={'Connexion Reussi !'} locationHref={"/"} />}
            <h2 className="text-4xl font-bold leading-10 tracking-tight">Login</h2>
            <div className="pt-12 pb-8 mb-4">
                {errorLogin && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert
                            variant="filled"
                            severity="error"
                            onClose={() => {
                                setErrorLogin(false);
                            }}
                        >
                            L&apos; email ou le mot de passe est incorrect
                        </Alert>
                    </Stack>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mt-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mt-4"
                />
                <button
                    onClick={handleLogin}
                    className="inline-block text-black p-4 text-lg font-medium text-indigo-600 bg-primary_300 border border-indigo-600 rounded-lg shadow-2xl mt-6 hover:bg-indigo-600 hover:text-black hover:shadow-none"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
