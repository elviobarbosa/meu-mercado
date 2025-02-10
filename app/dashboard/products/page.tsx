"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface Product {
  id: string;
  name: string;
  lowest_prices: {
    supermarket_name: string;
    price: number;
    price_date: string;
  }[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (productsError) return;

      const productsWithPrices = await Promise.all(
        productsData.map(async (product) => {
          const { data: pricesData } = await supabase
            .rpc("get_lowest_prices", { product_id: product.id });

          return {
            ...product,
            lowest_prices: pricesData || [],
          };
        })
      );

      setProducts(productsWithPrices);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Price Comparison</h1>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {product.lowest_prices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.lowest_prices.map((price, index) => (
                    <div key={index} className="text-center p-4 bg-muted rounded-lg">
                      <p className="font-semibold">{price.supermarket_name}</p>
                      <p className="text-2xl font-bold">${price.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(price.price_date))} ago
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No prices recorded yet
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}