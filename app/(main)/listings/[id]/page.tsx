"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useListing } from "@/hooks/use-listings"
import { useCreateConversation } from "@/hooks/use-conversations"
import { useAuth } from "@/hooks/use-auth"
import { ROUTES, CATEGORY_LABELS, CONDITION_LABELS, STATUS_LABELS } from "@/lib/constants"
import { formatPrice, formatDate, getInitials } from "@/lib/utils"
import { PageLoader } from "@/components/shared/loading-spinner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, ArrowLeft, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import type { ApiError } from "@/types/api"

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { data, isLoading } = useListing(id)
  const { user, isAuthenticated } = useAuth()
  const createConversation = useCreateConversation()

  const listing = data?.data

  const handleMessageSeller = async () => {
    if (!isAuthenticated) {
      router.push(`${ROUTES.LOGIN}?path=${ROUTES.LISTING_DETAIL(id)}`)
      return
    }
    if (!listing) return

    try {
      const response = await createConversation.mutateAsync({
        participantId: listing.userId,
        listingId: listing.id,
      })
      router.push(ROUTES.DASHBOARD_CONVERSATION(response.data.id))
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError.message || "Failed to start conversation")
    }
  }

  if (isLoading) return <PageLoader />
  if (!listing) return <div className="container mx-auto px-4 py-8 text-center">Listing not found</div>

  const isOwner = user?.id === listing.userId

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-[16/10] rounded-lg bg-muted overflow-hidden">
            {listing.images?.[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>
          {listing.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {listing.images.slice(1).map((img, i) => (
                <div key={i} className="aspect-square rounded-lg bg-muted overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${listing.title} ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">{listing.title}</h1>
              <p className="text-3xl font-bold text-primary mt-1">{formatPrice(listing.price)}</p>
            </div>
            <div className="flex gap-2">
              <Badge>{CATEGORY_LABELS[listing.category]}</Badge>
              <Badge variant="outline">{CONDITION_LABELS[listing.condition]}</Badge>
              <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                {STATUS_LABELS[listing.status]}
              </Badge>
            </div>
            <Separator />
            <div>
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
            </div>
            <p className="text-sm text-muted-foreground">Listed {formatDate(listing.createdAt)}</p>
          </div>
        </div>

        {/* Seller card */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Seller</h3>
              <Link href={ROUTES.SELLER_PROFILE(listing.userId)} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={listing.user.avatar || undefined} />
                  <AvatarFallback>{getInitials(listing.user.firstName, listing.user.lastName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{listing.user.firstName} {listing.user.lastName}</p>
                  {listing.user.school && (
                    <p className="text-sm text-muted-foreground">{listing.user.school.name}</p>
                  )}
                </div>
              </Link>
              {!isOwner && (
                <Button className="w-full" onClick={handleMessageSeller} disabled={createConversation.isPending}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Seller
                </Button>
              )}
              {isOwner && (
                <Button variant="outline" className="w-full" render={<Link href={ROUTES.DASHBOARD_EDIT_LISTING(listing.id)} />}>
                  Edit Listing
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
