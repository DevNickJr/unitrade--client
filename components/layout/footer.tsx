import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { ROUTES } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="font-semibold">Unitrade</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href={ROUTES.LISTINGS} className="hover:text-foreground transition-colors">Browse</Link>
            <Link href={ROUTES.LOGIN} className="hover:text-foreground transition-colors">Sign In</Link>
            <Link href={ROUTES.REGISTER} className="hover:text-foreground transition-colors">Get Started</Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Unitrade
          </p>
        </div>
      </div>
    </footer>
  )
}
