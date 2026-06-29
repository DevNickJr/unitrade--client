"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useMyListings } from "@/hooks/use-listings"
import { useConversations } from "@/hooks/use-conversations"
import { ROUTES } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, MessageSquare, Plus, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const { data: listings } = useMyListings()
  const { data: conversations } = useConversations()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.firstName}!</h1>
        <p className="text-muted-foreground">Here&apos;s an overview of your activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{listings?.total ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{conversations?.data?.length ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button render={<Link href={ROUTES.DASHBOARD_NEW_LISTING} />}>
          <Plus className="h-4 w-4 mr-2" />
          New Listing
        </Button>
        <Button variant="outline" render={<Link href={ROUTES.DASHBOARD_LISTINGS} />}>
          View My Listings
        </Button>
      </div>
    </div>
  )
}
