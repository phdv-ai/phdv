"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Database,
  Home,
  Search,
  Vote,
  Coins,
  Shield,
  CheckCircle,
  Layers,
  Code,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ConnectWallet } from "@/components/ConnectWallet"

const mainNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: Database },
  { href: "/researcher", label: "Research", icon: Search },
  { href: "/dao", label: "DAO", icon: Vote },
]

const toolsItems = [
  { href: "/validator", label: "Validator", icon: CheckCircle },
  { href: "/staking", label: "Staking", icon: Layers },
  { href: "/developer", label: "Developer", icon: Code },
]

const infoItems = [
  { href: "/tokenomics", label: "Tokenomics", icon: Coins },
  { href: "/compliance", label: "Compliance", icon: Shield },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isGroupActive = (items: typeof toolsItems) => items.some((item) => pathname === item.href)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-400/20 backdrop-blur-md"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/image/phdv-logo.svg"
              alt="PHDV-AI Logo"
              width={128}
              height={32}
              className="h-auto w-auto max-h-8"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-cyan-400 text-white"
                      : "text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400",
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              )
            })}

            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors border",
                    isGroupActive(toolsItems)
                      ? "bg-cyan-400 text-white border-cyan-400"
                      : "text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 border-cyan-400",
                  )}
                >
                  <Layers className="h-4 w-4" />
                  <span className="hidden lg:inline">Tools</span>
                  <ChevronDown className="h-3 w-3 hidden lg:inline" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {toolsItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors cursor-pointer text-white",
                          isActive ? "bg-cyan-400/20 text-cyan-400" : "hover:bg-cyan-400/10 hover:text-cyan-400"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Info Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isGroupActive(infoItems)
                      ? "bg-cyan-400 text-white"
                      : "text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400",
                  )}
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden lg:inline">Info</span>
                  <ChevronDown className="h-3 w-3 hidden lg:inline" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {infoItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors cursor-pointer text-white",
                          isActive ? "bg-cyan-400/20 text-cyan-400" : "hover:bg-cyan-400/10 hover:text-cyan-400"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="ml-2 relative z-50">
              <ConnectWallet />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cyan-400/20 py-4">
            <div className="flex flex-col gap-2">
              {[...mainNavItems, ...toolsItems, ...infoItems].map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-cyan-400 text-white"
                        : "text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <div className="px-4 pt-2">
                <ConnectWallet />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
