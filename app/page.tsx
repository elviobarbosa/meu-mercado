import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ShoppingBasket, TrendingUp, Store } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Track & Compare Supermarket Prices
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Save money by comparing prices across different supermarkets and keeping track of your shopping lists.
          </p>
          <div className="mt-8 space-x-4">
            <Button asChild size="lg">
              <Link href="/auth/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBasket className="h-5 w-5" />
                Create Shopping Lists
              </CardTitle>
              <CardDescription>
                Organize your shopping with custom lists and track prices over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Create multiple shopping lists</li>
                <li>Copy and modify existing lists</li>
                <li>Set minimum and maximum quantities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Compare Prices
              </CardTitle>
              <CardDescription>
                Find the best deals by comparing prices across different stores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Track price changes over time</li>
                <li>See the lowest prices for products</li>
                <li>Make informed shopping decisions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Manage Supermarkets
              </CardTitle>
              <CardDescription>
                Keep track of different supermarkets and their locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Add new supermarkets</li>
                <li>Save store locations</li>
                <li>Quick access to favorite stores</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}