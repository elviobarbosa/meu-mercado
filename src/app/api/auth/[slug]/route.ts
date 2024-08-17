import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/api/supabase/supabase-client";
 
type ResponseData = {
  message: string
}
 
export async function GET(
  req: NextRequest,
  res: NextResponse<ResponseData>
) {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      return NextResponse.json({ status: 400, message: error.message }, { status: 400 });
    }
    return NextResponse.json({ status: 200, data: session }, { status: 200 });
  } catch (error) {
      return NextResponse.json({ status: 500, message: 'Internal Server Error'}, { status: 500 });
  }
}