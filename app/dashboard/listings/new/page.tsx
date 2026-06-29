"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCreateListing } from "@/hooks/use-listings"
import { ROUTES, ListingCategory, ListingCondition, CATEGORY_LABELS, CONDITION_LABELS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/shared/image-upload"
import { Loader2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import type { ApiError } from "@/types/api"

export default function NewListingPage() {
  const router = useRouter()
  const createListing = useCreateListing()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState<ListingCategory>(ListingCategory.OTHER)
  const [condition, setCondition] = useState<ListingCondition>(ListingCondition.USED)
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createListing.mutateAsync({
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
      toast.error(apiError.message || "Failed to create listing")
    }
  }

  return (
    <div className="max-w-2xl">
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>
      <h1 className="text-2xl font-bold mb-6">Create Listing</h1>
      <Card>
        <CardHeader>
          <CardTitle>Listing Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="What are you selling?" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your item..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (NGN)</Label>
              <Input id="price" type="number" placeholder="0" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="100" required />
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
              <Button type="submit" disabled={createListing.isPending}>
                {createListing.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Listing
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
