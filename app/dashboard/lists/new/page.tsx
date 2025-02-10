"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Supermarket {
  id: string;
  name: string;
  address: string;
}

export default function NewList() {
  const [name, setName] = useState("");
  const [showNewSupermarket, setShowNewSupermarket] = useState(false);
  const [supermarkets, setSupermarkets] = useState<Supermarket[]>([]);
  const [selectedSupermarket, setSelectedSupermarket] = useState<Supermarket | null>(null);
  const [newSupermarketName, setNewSupermarketName] = useState("");
  const [newSupermarketAddress, setNewSupermarketAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUserId(user.id);
    };

    getUser();
  }, [router]);

  const handleSearch = async (value: string) => {
    if (!value) {
      setSupermarkets([]);
      return;
    }

    const { data, error } = await supabase
      .from("supermarkets")
      .select("*")
      .or(`name.ilike.%${value}%,address.ilike.%${value}%`)
      .limit(5);

    if (error || !Array.isArray(data)) {
      setSupermarkets([]);
    } else {
      setSupermarkets(data);
    }
  };

  const handleCreateSupermarket = async () => {
    if (!newSupermarketName || !newSupermarketAddress || !userId) return;

    setLoading(true);
    try {
      const { data: newSupermarket, error } = await supabase
        .from("supermarkets")
        .insert({
          name: newSupermarketName,
          address: newSupermarketAddress,
          created_by: userId
        })
        .select()
        .single();

      if (error) throw error;

      setSelectedSupermarket(newSupermarket);
      setShowNewSupermarket(false);
      setNewSupermarketName("");
      setNewSupermarketAddress("");
      toast({
        title: "Success",
        description: "Supermarket created successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to create a list",
        variant: "destructive",
      });
      return;
    }

    if (!selectedSupermarket) {  
        toast({  
            title: "Error",  
            description: "Please select a valid supermarket.",  
            variant: "destructive",  
        });  
        return;  
    }  

    setLoading(true);

    try {
      console.log('user', userId);
      const { data: existingSupermarket } = await supabase  
            .from("supermarkets")  
            .select("*")  
            .eq("id", selectedSupermarket.id)  
            .single();  

      if (!existingSupermarket) {  
            toast({  
                title: "Error",  
                description: "The selected supermarket does not exist.",  
                variant: "destructive",  
            });  
            return;  
        }  

      
      let supermarketId = selectedSupermarket?.id;
      console.log('supermarketId', supermarketId);

      const { data: defaultProducts } = await supabase
        .from("products")
        .select("*")
        .eq("is_default", true);

      const { data: newList, error: listError } = await supabase
        .from("shopping_lists")
        .insert({
          name,
          user_id: userId,
          supermarket_id: supermarketId,
        })
        .select()
        .single();

      if (listError) {  
        if (listError.code === '23503') {  
            toast({  
                title: "Error",  
                description: "You are not allowed to create a shopping list for this user.",  
                variant: "destructive",  
            });  
        } else {  
            throw listError;  
        }  
      } 

      if (!newList) {  
        toast({  
            title: "Error",  
            description: "Failed to create the shopping list.",  
            variant: "destructive",  
        });  
        return;  
    }  
      
      //if (listError) throw listError;

      if (Array.isArray(defaultProducts) && defaultProducts.length > 0) {
        const listItems = defaultProducts.map((product) => ({
          shopping_list_id: newList.id,
          product_id: product.id,
          min_quantity: 1,
        }));

        const { error: itemsError } = await supabase
          .from("shopping_list_items")
          .insert(listItems);

        if (itemsError) throw itemsError;
      }
      console.log('ok')
      router.push(`/dashboard/lists/${newList.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Shopping List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateList} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">List Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Supermarket</Label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search supermarkets..."
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setShowNewSupermarket(true)}
                />
                {showNewSupermarket && (
                  <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                    {supermarkets.length > 0 ? (
                      <div className="p-2">
                        {supermarkets.map((supermarket) => (
                          <div
                            key={supermarket.id}
                            className="flex items-center p-2 hover:bg-accent rounded-md cursor-pointer"
                            onClick={() => {
                              setSelectedSupermarket(supermarket);
                              setShowNewSupermarket(false);
                            }}
                          >
                            {supermarket.name} - {supermarket.address}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 space-y-4">
                        <p>No supermarket found. Add a new one:</p>
                        <div className="space-y-2">
                          <Input
                            placeholder="Supermarket name"
                            value={newSupermarketName}
                            onChange={(e) => setNewSupermarketName(e.target.value)}
                          />
                          <Input
                            placeholder="Address"
                            value={newSupermarketAddress}
                            onChange={(e) => setNewSupermarketAddress(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            disabled={!newSupermarketName || !newSupermarketAddress || loading}
                            onClick={handleCreateSupermarket}
                          >
                            {loading ? "Creating..." : "Create Supermarket"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {selectedSupermarket && (
                <div className="flex items-center justify-between p-2 mt-2 bg-accent rounded-md">
                  <span>
                    {selectedSupermarket.name} - {selectedSupermarket.address}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSupermarket(null)}
                  >
                    Change
                  </Button>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create List"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}