import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../supabase/supabase-client";

export type LoginResponse = {
    status: number
    session?: any
    userData?: any
    message?: string
}
export async function POST(req: NextRequest): Promise<LoginResponse> {
    const { email, password } = await req.json();
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
  
        if (error) {
            return NextResponse.json({ status: 400, message: error.message }, { status: 400 });
        }
        return isLogged(data);
    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error'}, { status: 500 });
    }
}

async function isLogged(userData: any): Promise<LoginResponse> {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          return NextResponse.json({ status: 400, message: error.message }, { status: 400 });
        }
        return NextResponse.json({ status: 200, session, userData }, { status: 200 });
      } catch (error) {
          return NextResponse.json({ status: 500, message: 'Internal Server Error'}, { status: 500 });
      }
}
