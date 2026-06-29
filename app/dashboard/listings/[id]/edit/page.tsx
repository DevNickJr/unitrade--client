"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useListing, useUpdateListing, useUpdateListingStatus } from "@/hooks/use-listings"
import { ROUTES, ListingCategory, ListingCondition, ListingStatus, CATEGORY_LABELS, CONDITION_LABELS, STATUS_LABELS } from "@/lib/constants"
import { PageLoader } from "@/components/shared/loading-spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "@/components/shared/image-upload"
import { Loader2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import type { ApiError } from "@/types/api"

export default function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { data, isLoading } = useListing(id)
  const updateListing = useUpdateListing(id)
  const updateStatus = useUpdateListingStatus(id)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState<ListingCategory>(ListingCategory.OTHER)
  const [condition, setCondition] = useState<ListingCondition>(ListingCondition.USED)
  const [images, setImages] = useState<string[]>([])

  const listing = data?.data

  useEffect(() => {
    if (listing) {
      setTitle(listing.title)
      setDescription(listing.description)
      setPrice(String(listing.price))
      setCategory(listing.category)
      setCondition(listing.condition)
      setImages(listing.images || [])
    }
  }, [listing])

  if (isLoading) return <PageLoader />
  if (!listing) return <div className="text-center py-8">Listing not found</div>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateListing.mutateAsync({
        title,
        description,
        price: Number(price),
        category,
        condition,
        images,
      })
      router.push(ROUTES.DASHBOARD_LISTINGS)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError.message || "Failed to update listing")
    }
  }

  const handleStatusChange = async (status: string) => {
    try {
      await updateStatus.mutateAsync(status)
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError.message || "Failed to update status")
    }
  }

  return (
    <div className="max-w-2xl">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>
      <h1 className="text-2xl font-bold mb-6">Edit Listing</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            {Object.values(ListingStatus).map((status) => (
              <Button
                key={status}
                variant={listing.status === status ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange(status)}
                disabled={updateStatus.isPending}
              >
                {STATUS_LABELS[status]}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Listing Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (NGN)</Label>
                <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="100" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ListingCategory)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <select
                    id="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as ListingCondition)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {Object.entries(CONDITION_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Images</Label>
                <ImageUpload images={images} onChange={setImages} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={updateListing.isPending}>
                  {updateListing.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
