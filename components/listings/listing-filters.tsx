"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ListingCategory, ListingCondition, CATEGORY_LABELS, CONDITION_LABELS } from "@/lib/constants"
import { Search, X } from "lucide-react"
import type { ListingFilters as Filters } from "@/types/listing"

interface ListingFiltersProps {
  filters: Filters
  onUpdate: (filters: Partial<Filters>) => void
  onReset: () => void
}

export function ListingFilters({ filters, onUpdate, onReset }: ListingFiltersProps) {
  const hasActiveFilters = filters.search || filters.category || filters.condition || filters.minPrice || filters.maxPrice

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            value={filters.search || ""}
            onChange={(e) => onUpdate({ search: e.target.value })}
            className="pl-10"
          />
        </div>
        <select
          value={filters.category || ""}
          onChange={(e) => onUpdate({ category: (e.target.value || undefined) as ListingCategory | undefined })}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select
          value={filters.condition || ""}
          onChange={(e) => onUpdate({ condition: (e.target.value || undefined) as ListingCondition | undefined })}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Any Condition</option>
          {Object.entries(CONDITION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min price"
            value={filters.minPrice ?? ""}
            onChange={(e) => onUpdate({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-32"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max price"
            value={filters.maxPrice ?? ""}
            onChange={(e) => onUpdate({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-32"
          />
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}
