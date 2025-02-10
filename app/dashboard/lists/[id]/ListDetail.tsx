"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface ListItem {
  id: string;
  product: {
    id: string;
    name: string;
  };
  price: number | null;
  min_quantity: number;
  max_quantity: number | null;
}

interface ShoppingList {
  id: string;
  name: string;
  created_at: string;
  supermarket: {
    name: string;
    address: string;
  } | null;
  items: ListItem[];
}

export default function ListDetail({ params }: { params: { id: string } }) {
  const [list, setList] = useState<ShoppingList | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchList() {
      const { data, error } = await supabase
        .from("shopping_lists")
        .select(`
          id,
          name,
          created_at,
          supermarket:supermarkets (
            name,
            address
          ),
          items:shopping_list_items (
            id,
            price,
            min_quantity,
            max_quantity,
            product:products (
              id,
              name
            )
          )
        `)
        .eq("id", params.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load shopping list",
          variant: "destructive",
        });
        router.push("/dashboard");
        return;
      }
      setList(data as any);
      setLoading(false);
    }

    fetchList();
  }, [params.id, router, toast]);

  const handleUpdateItem = async (itemId: string, updates: Partial<ListItem>) => {
    const { error } = await supabase
      .from("shopping_list_items")
      .update(updates)
      .eq("id", itemId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
      return;
    }

    setList((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        ),
      };
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!list) return <div>List not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{list.name}</h1>
        <p className="text-muted-foreground">
          Created {formatDistanceToNow(new Date(list.created_at))} ago
          {list.supermarket && (
            <> at {list.supermarket.name} - {list.supermarket.address}</>
          )}
        </p>
      </div>

      <div className="grid gap-4">
        {list.items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.price || ""}
                    onChange={(e) =>
                      handleUpdateItem(item.id, {
                        price: parseFloat(e.target.value) || null,
                      })
                    }
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <Label>Minimum Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={item.min_quantity}
                    onChange={(e) =>
                      handleUpdateItem(item.id, {
                        min_quantity: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Maximum Quantity</Label>
                  <Input
                    type="number"
                    min={item.min_quantity}
                    value={item.max_quantity || ""}
                    onChange={(e) =>
                      handleUpdateItem(item.id, {
                        max_quantity: parseInt(e.target.value) || null,
                      })
                    }
                    placeholder="Optional"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}