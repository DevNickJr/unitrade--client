"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/lib/constants"
import { getInitials } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingBag, Menu, LogOut, User, LayoutDashboard, MessageSquare, Plus } from "lucide-react"

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Unitrade</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href={ROUTES.LISTINGS} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Browse
            </Link>
            {isAuthenticated && (
              <Link href={ROUTES.DASHBOARD_NEW_LISTING} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sell
              </Link>
            )}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button variant="outline" size="sm" render={<Link href={ROUTES.DASHBOARD_NEW_LISTING} />}>
                <Plus className="h-4 w-4 mr-1" />
                New Listing
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-9 w-9 rounded-full" />}>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar || undefined} />
                    <AvatarFallback>{getInitials(user?.firstName, user?.lastName)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem render={<Link href={ROUTES.DASHBOARD} />}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href={ROUTES.DASHBOARD_MESSAGES} />}>
                    <MessageSquare className="mr-2 h-4 w-4" />Messages
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href={ROUTES.DASHBOARD_PROFILE} />}>
                    <User className="mr-2 h-4 w-4" />Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" render={<Link href={ROUTES.LOGIN} />}>
                Sign In
              </Button>
              <Button size="sm" render={<Link href={ROUTES.REGISTER} />}>
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href={ROUTES.LISTINGS} className="text-lg font-medium">Browse</Link>
              {isAuthenticated ? (
                <>
                  <Link href={ROUTES.DASHBOARD_NEW_LISTING} className="text-lg font-medium">Sell</Link>
                  <Link href={ROUTES.DASHBOARD} className="text-lg font-medium">Dashboard</Link>
                  <Link href={ROUTES.DASHBOARD_MESSAGES} className="text-lg font-medium">Messages</Link>
                  <Link href={ROUTES.DASHBOARD_PROFILE} className="text-lg font-medium">Profile</Link>
                  <Button variant="outline" onClick={logout} className="mt-4">Sign out</Button>
                </>
              ) : (
                <>
                  <Link href={ROUTES.LOGIN} className="text-lg font-medium">Sign In</Link>
                  <Button className="mt-2" render={<Link href={ROUTES.REGISTER} />}>
                    Get Started
                  </Button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
