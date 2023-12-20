// 'usec client'

// import { createClient } from '@supabase/supabase-js';
// import { useState, useEffect } from 'react';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl!, supabaseKey!);

// interface Profile {
//     id: number;
//     name: string;
//     description: string;
//     location: string;
// }
// function InfoProfile(_props: any) {
// const [profile, setProfile] = useState(null);
// const session = supabase.auth.getSession();
// session.then((data) => {
//     if (data) {
//         const user = data.data.session?.user.id;
//         console.log('userid', user);
//         localStorage.setItem('userid', user!);
//     }
// })

// useEffect(() => {
//     async function getProfil() {
//         const { data, error } = await supabase
//             .from('profiles')
//             .select(`id, name, description, location`)
//             .eq('user_id', localStorage.getItem('userid'))
//             .single();
//         if (error) {
//             console.log('error', error);
//         } else{
//             setProfile(data) 
//         }
//     }
//     getProfil();
// }, []);

// return (
//     <div>

//     </div>
// )
// }
// export default InfoProfile;