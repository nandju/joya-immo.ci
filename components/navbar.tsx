"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-[#252525] border-b border-[#A07539]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logo-sans-fond.png"
              alt="Logo Joya Immo"
              width={120}
              height={40}
              className="rounded-lg"
            />
          </Link>

                  {/* Navigation Desktop */}
                  <div className="hidden lg:flex items-center space-x-8">
                    <Link href="/properties" className="text-white hover:text-[#EADD8E] transition-all duration-300 font-medium relative group">
                      Propriétés
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EADD8E] transition-all duration-300 group-hover:w-full" />
                    </Link>
                    <Link href="/about" className="text-white hover:text-[#EADD8E] transition-all duration-300 font-medium relative group">
                      À Propos
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EADD8E] transition-all duration-300 group-hover:w-full" />
                    </Link>
                    <Link href="/user/dashboard" className="text-white hover:text-[#EADD8E] transition-all duration-300 font-medium relative group">
                      Mon Compte
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EADD8E] transition-all duration-300 group-hover:w-full" />
                    </Link>
                    <Link href="/owner/dashboard" className="text-white hover:text-[#EADD8E] transition-all duration-300 font-medium relative group">
                      Propriétaire
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EADD8E] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </div>

          {/* Bouton de connexion & Menu mobile */}
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button className="hidden sm:inline-flex bg-[#EADD8E] text-[#252525] hover:bg-[#A07539] hover:text-white transition-all duration-300 font-semibold px-6 py-2">
                Connexion
              </Button>
            </Link>

            {/* Bouton Menu Mobile */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

                {/* Menu Mobile */}
                {mobileMenuOpen && (
                  <div className="lg:hidden border-t border-[#A07539]/20">
                    <div className="px-4 py-6 space-y-4">
                      <Link href="/properties" className="block text-white hover:text-[#EADD8E] transition-colors font-medium">
                        Propriétés
                      </Link>
                      <Link href="/about" className="block text-white hover:text-[#EADD8E] transition-colors font-medium">
                        À Propos
                      </Link>
                      <Link href="/user/dashboard" className="block text-white hover:text-[#EADD8E] transition-colors font-medium">
                        Mon Compte
                      </Link>
                      <Link href="/owner/dashboard" className="block text-white hover:text-[#EADD8E] transition-colors font-medium">
                        Propriétaire
                      </Link>
                      <Link href="/login">
                        <Button className="w-full bg-[#EADD8E] text-[#252525] hover:bg-[#A07539] hover:text-white transition-all duration-300 font-semibold">
                          Connexion
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
      </div>
    </nav>
  )
}

