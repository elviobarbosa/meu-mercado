import ListDetail from "./ListDetail";
import { supabase } from "@/lib/supabase/client";

export async function generateStaticParams() {
  const { data } = await supabase.from("shopping_lists").select("id");

  if (!data) return [];

  return data.map((list) => ({
    id: list.id,
  }));
}
// export async function generateStaticParams() {
//     return []
//   }

  //export const dynamic = 'force-static'

// export async function generateStaticParams({
//     params: { id },
//   }: {
//     params: { id: string }
//   }) {
//     const { data } = await supabase.from("shopping_lists").select("id");

//     // const products = await fetch(
//     //   `https://.../products?category=${category}`
//     // ).then((res) => res.json())
   
//     return data?.map((list) => ({
//       id: list.id,
//     }))
//   }

export default function Page({ params }: { params: { id: string } }) {
  return <ListDetail params={params} />;
}