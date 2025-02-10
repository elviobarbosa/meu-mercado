"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { Plus, ShoppingBasket } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ShoppingList {
  id: string;
  name: string;
  created_at: string;
  supermarket: {
    name: string;
    address: string;
  } | null;
}

export default function Dashboard() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLists() {
      const { data, error } = await supabase
        .from("shopping_lists")
        .select(`
          id,
          name,
          created_at,
          supermarket:supermarkets (
            name,
            address
          )
        `)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setLists(data as any);
      }
      setLoading(false);
    }

    fetchLists();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Shopping Lists</h1>
        <Button asChild>
          <Link href="/dashboard/lists/new">
            <Plus className="mr-2 h-4 w-4" />
            New List
          </Link>
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : lists.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <ShoppingBasket className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No shopping lists yet</h2>
            <p className="text-muted-foreground mb-4">
              Create your first shopping list to start tracking prices
            </p>
            <Button asChild>
              <Link href="/dashboard/lists/new">Create Shopping List</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <Link key={list.id} href={`/dashboard/lists/${list.id}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{list.name}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {list.supermarket ? (
                      <p>{list.supermarket.name}</p>
                    ) : (
                      "No supermarket selected"
                    )}
                    <p>Created {formatDistanceToNow(new Date(list.created_at))} ago</p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}