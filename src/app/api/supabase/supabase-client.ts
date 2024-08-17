import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

// export async function supabaseLogin(email: string, password: string): Promise<{ data:any, error:any }> {
//     // const { data, error } = await supabase.auth.signInWithPassword({
//     //     email,
//     //     password,
//     // });

//     return { data: 'data', error: 'error' }
// }