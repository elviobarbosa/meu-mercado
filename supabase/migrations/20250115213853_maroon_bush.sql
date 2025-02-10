/*
  # Initial Schema for Supermarket Price Comparison

  1. New Tables
    - `profiles`
      - Extends Supabase auth.users
      - Stores additional user information
    
    - `supermarkets`
      - Stores supermarket information
      - Name and address with coordinates
    
    - `products`
      - Default product catalog
      - Name and description
    
    - `shopping_lists`
      - User's shopping lists
      - References supermarket and user
    
    - `shopping_list_items`
      - Items in shopping lists
      - Includes price tracking
      - Min/max quantities

  2. Security
    - Enable RLS on all tables
    - Policies for user data access
*/

-- Create tables
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at timestamptz DEFAULT now(),
  username text UNIQUE,
  full_name text,
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

CREATE TABLE IF NOT EXISTS supermarkets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  latitude numeric(10,8),
  longitude numeric(11,8),
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES profiles(id),
  UNIQUE(name, address)
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  is_default boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS shopping_lists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  supermarket_id uuid REFERENCES supermarkets(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(name, user_id, supermarket_id, created_at)
);

CREATE TABLE IF NOT EXISTS shopping_list_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shopping_list_id uuid REFERENCES shopping_lists(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  price decimal(10,2),
  min_quantity integer DEFAULT 1 NOT NULL CHECK (min_quantity > 0),
  max_quantity integer CHECK (max_quantity IS NULL OR max_quantity >= min_quantity),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE supermarkets ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_list_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Supermarkets are viewable by everyone" ON supermarkets
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert supermarkets" ON supermarkets
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Users can view own shopping lists" ON shopping_lists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own shopping lists" ON shopping_lists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own shopping lists" ON shopping_lists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own shopping lists" ON shopping_lists
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own shopping list items" ON shopping_list_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM shopping_lists
      WHERE id = shopping_list_items.shopping_list_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own shopping list items" ON shopping_list_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM shopping_lists
      WHERE id = shopping_list_items.shopping_list_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own shopping list items" ON shopping_list_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM shopping_lists
      WHERE id = shopping_list_items.shopping_list_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own shopping list items" ON shopping_list_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM shopping_lists
      WHERE id = shopping_list_items.shopping_list_id
      AND user_id = auth.uid()
    )
  );

-- Insert some default products
INSERT INTO products (name, description, is_default) VALUES
  ('Milk', '1 Gallon Whole Milk', true),
  ('Bread', 'White Bread Loaf', true),
  ('Eggs', 'Dozen Large Eggs', true),
  ('Cheese', 'Cheddar Cheese Block', true),
  ('Chicken', 'Whole Chicken', true),
  ('Rice', '1kg White Rice', true),
  ('Tomatoes', 'Fresh Tomatoes', true),
  ('Potatoes', 'Russet Potatoes Bag', true),
  ('Pasta', 'Spaghetti 1lb', true),
  ('Bananas', 'Bunch of Bananas', true)
ON CONFLICT (name) DO NOTHING;

-- Functions
CREATE OR REPLACE FUNCTION get_lowest_prices(product_id uuid)
RETURNS TABLE (
  supermarket_name text,
  price decimal(10,2),
  price_date timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.name as supermarket_name,
    sli.price,
    sli.updated_at as price_date
  FROM shopping_list_items sli
  JOIN shopping_lists sl ON sli.shopping_list_id = sl.id
  JOIN supermarkets s ON sl.supermarket_id = s.id
  WHERE sli.product_id = $1
    AND sli.price IS NOT NULL
  ORDER BY sli.price ASC, sli.updated_at DESC
  LIMIT 3;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;