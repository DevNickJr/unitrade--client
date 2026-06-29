"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/lib/constants"
import { LayoutDashboard, Package, MessageSquare, User, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  { href: ROUTES.DASHBOARD, label: "Overview", icon: LayoutDashboard },
  { href: ROUTES.DASHBOARD_LISTINGS, label: "My Listings", icon: Package },
  { href: ROUTES.DASHBOARD_MESSAGES, label: "Messages", icon: MessageSquare },
  { href: ROUTES.DASHBOARD_PROFILE, label: "Profile", icon: User },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-muted/30 p-4 gap-1">
      <Button className="mb-4" render={<Link href={ROUTES.DASHBOARD_NEW_LISTING} />}>
        <Plus className="h-4 w-4 mr-2" />
        New Listing
      </Button>
      {sidebarLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === link.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </Link>
      ))}
    </aside>
  )
}

export function DashboardMobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden flex border-b overflow-x-auto">
      {sidebarLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors",
            pathname === link.href
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
