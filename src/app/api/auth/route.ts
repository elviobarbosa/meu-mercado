import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supabase/supabase-client";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
  
        if (error) {
            return NextResponse.json({ status: 400, message: error.message }, { status: 400 });
        }
        return NextResponse.json({ status: 200, data }, { status: 200 }); 
    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error'}, { status: 500 });
    }
}
