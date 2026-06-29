"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
  const [url, setUrl] = useState("")

  const addImage = () => {
    if (!url.trim() || images.length >= maxImages) return
    onChange([...images, url.trim()])
    setUrl("")
  }

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square rounded-lg border bg-muted overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {images.length === 0 && (
          <div className="aspect-square rounded-lg border border-dashed flex flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="h-8 w-8 mb-1" />
            <span className="text-xs">No images</span>
          </div>
        )}
      </div>
      {images.length < maxImages && (
        <div className="flex gap-2">
          <Input
            placeholder="Paste image URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
          />
          <Button type="button" variant="outline" size="icon" onClick={addImage}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        {images.length}/{maxImages} images
      </p>
    </div>
  )
}
