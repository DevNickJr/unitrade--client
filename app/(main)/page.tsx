"use client"

import Link from "next/link"
import { ROUTES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ListingGrid } from "@/components/listings/listing-grid"
import { PageLoader } from "@/components/shared/loading-spinner"
import { useListings } from "@/hooks/use-listings"
import { ShoppingBag, Search, MessageSquare, MapPin } from "lucide-react"

export default function HomePage() {
  const { data, isLoading } = useListings({ limit: 8 })

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Buy & Sell With People Near You
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find great deals from students and locals in your area. Electronics, books, clothing, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" render={<Link href={ROUTES.LISTINGS} />}>
              <Search className="mr-2 h-5 w-5" />
              Browse Listings
            </Button>
            <Button size="lg" variant="outline" render={<Link href={ROUTES.REGISTER} />}>
              Start Selling
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="rounded-full bg-primary/10 p-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">List your items</h3>
              <p className="text-sm text-muted-foreground">Post what you want to sell with photos, price, and details.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="rounded-full bg-primary/10 p-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Find nearby</h3>
              <p className="text-sm text-muted-foreground">Discover items from people at your school or in your area.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="rounded-full bg-primary/10 p-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Chat & trade</h3>
              <p className="text-sm text-muted-foreground">Message sellers directly and arrange a meetup to trade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recent Listings</h2>
            <Button variant="outline" render={<Link href={ROUTES.LISTINGS} />}>View all</Button>
          </div>
          {isLoading ? (
            <PageLoader />
          ) : (
            <ListingGrid listings={data?.data || []} />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to start trading?</h2>
          <p className="text-lg opacity-90 mb-6">Join Unitrade and connect with buyers and sellers near you.</p>
          <Button size="lg" variant="secondary" render={<Link href={ROUTES.REGISTER} />}>
            Get Started
          </Button>
        </div>
      </section>
    </div>
  )
}
