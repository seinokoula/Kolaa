import { useState } from 'react';
import { supabase } from '../components/Server/supabase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                throw error;
            }
            // Handle successful signup
            console.log('User signed up:', data);
            alert('your account has been created, an email has been send')
        } catch (error) {
            console.log('Error signing up:', error);
            alert('error')
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <h2 className="text-4xl font-bold leading-10 tracking-tight">Sign Up</h2>
            <div className="pt-12 pb-8 mb-4">
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
                    onClick={handleSignUp}
                    className="inline-block p-4 text-lg font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg shadow-2xl mt-6 hover:bg-indigo-600 hover:text-white hover:shadow-none"
                >
                    Sign Up
                </button>
            </div>
        </div>

    );
};

export default SignUp;
