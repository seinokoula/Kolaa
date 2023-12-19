import { useState } from 'react';
import { supabase } from '../components/Server/supabase';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const session = supabase.auth.getSession();

    session.then((data) => {
        if (data) {
            const user = data.data.session?.access_token;
            const userRefresh = data.data.session?.refresh_token;
           // const userId = supabase.auth.getUser();
           // console.log('userid',userId);
            console.log(userRefresh);
            localStorage.setItem('user', user!);
            localStorage.setItem('userRefresh', userRefresh!);
          //  localStorage.setItem('userId', userId!);
        }
    })

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Error signing in:', error.message);
        } else {
            console.log('User signed in successfully:', data);
            // Redirect to the dashboard or any other page
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <h2 className="text-4xl font-bold leading-10 tracking-tight">Login</h2>
            <div className="pt-12 pb-8 mb-4">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline mt-4"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline mt-4"
            />
            <button
                onClick={handleLogin}
                className="inline-block p-4 text-lg font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg shadow-2xl mt-6 hover:bg-indigo-600 hover:text-white hover:shadow-none"
            >
                Login
            </button>
            </div>
        </div>
    );
}
