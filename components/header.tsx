"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Menu, X, Star, MapPin, Building, Palette, DollarSign, MoveUpRight } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"


export default function Header() {
  const [activeTab, setActiveTab] = useState("location")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Image d'arrière-plan principale */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/backgrounds/background.jpg')",
          filter: "brightness(0.3)"
        }}
      />
      
      {/* Overlay avec dégradé pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#252525]/80 via-[#252525]/60 to-[#A07539]/40" />
      
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 opacity-20">
          <div 
            className="w-full h-full bg-cover bg-center rounded-full"
            style={{
              backgroundImage: "url('/assets/images/illustrations/page-accueil/mini-house.png')",
              filter: "sepia(100%) saturate(200%) hue-rotate(25deg)"
            }}
          />
        </div>
        
        {/* Formes géométriques décoratives */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-[#EADD8E]/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#A07539]/10 rounded-lg rotate-45 blur-2xl" />
      </div>

      {/* Barre de navigation */}
      <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logo-sans-fond.png" // Remplace ce chemin par le tien si différent
              alt="Logo Joya Immo"
              width={120} // Ajuste la taille si besoin
              height={40}
              className="rounded-lg"
            />
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="/proprietes" className="text-white hover:text-[#EADD8E] transition-all duration-300 font-medium relative group">
              Propriétés
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EADD8E] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="/a-propos" className="text-white hover:text-[#EADD8E] transition-all duration-300 font-medium relative group">
              À Propos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EADD8E] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="/proprietaire/dashboard" className="text-white hover:text-[#EADD8E] transition-all duration-300 font-medium relative group">
              Propriétaire
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EADD8E] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Bouton de connexion & Menu mobile */}
          <div className="flex items-center space-x-4">
            <a href="/connexion">
              <Button className="hidden sm:inline-flex bg-[#EADD8E] text-[#252525] hover:bg-[#A07539] hover:text-white transition-all duration-300 font-semibold px-6 py-2">
                Connexion
              </Button>
            </a>

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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#252525]/95 backdrop-blur-md border-t border-[#EADD8E]/20">
            <div className="px-4 py-6 space-y-4">
              <a href="/proprietes" className="block text-white hover:text-[#EADD8E] transition-colors font-medium">
                Propriétés
              </a>
              <a href="/a-propos" className="block text-white hover:text-[#EADD8E] transition-colors font-medium">
                À Propos
              </a>
              <a href="/proprietaire/dashboard" className="block text-white hover:text-[#EADD8E] transition-colors font-medium">
                Propriétaire
              </a>
              <a href="/connexion">
                <Button className="w-full bg-[#EADD8E] text-[#252525] hover:bg-[#A07539] hover:text-white transition-all duration-300 font-semibold">
                  Connexion
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Contenu principal */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Titre principal */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-white leading-tight">
                Nous Apportons une Nouvelle
              </h1>
            </div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#EADD8E]">
                Expérience de Votre
              </span>
            <div className="hidden md:block bg-[#EADD8E]/20 backdrop-blur-sm p-3 rounded-2xl border border-[#EADD8E]/30">
              <Image
                src="/assets/images/illustrations/page-accueil/mini-house.png" // remplace par le chemin réel de ton image
                alt="Logo Joya Immo"
                width={64} // ou ajuste à ta convenance
                height={64}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-contain"
              />
            </div>

            </div>
            <div className="mb-8">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-white">
                Bien Immobilier de Rêve
              </span>
            </div>

            <p className="text-xl sm:text-2xl text-[#EADD8E]/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Nous vous aidons à trouver la maison de vos rêves, une propriété à la fois. Votre satisfaction est notre priorité absolue.
            </p>

            {/* Indicateurs interactifs */}
            <div className="flex items-center justify-center space-x-12 mb-10">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-4 h-4 bg-[#EADD8E] rounded-full group-hover:scale-125 transition-transform" />
                <span className="text-white text-lg font-medium group-hover:text-[#EADD8E] transition-colors">Acheter une Propriété</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-4 h-4 bg-white/50 rounded-full group-hover:bg-[#A07539] group-hover:scale-125 transition-all" />
                <span className="text-white/70 text-lg font-medium group-hover:text-[#A07539] transition-colors">Louer une Propriété</span>
              </div>
            </div>
          </div>

          {/* Formulaire de recherche */}
          <div className="max-w-7xl mx-auto my-8">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
              {/* Onglets */}
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-2">
                <div className="flex space-x-3 mb-8">
                <button
                  onClick={() => setActiveTab("location")}
                  className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
                    activeTab === "location" 
                      ? "bg-[#252525] text-white shadow-lg transform scale-105" 
                      : "bg-gray-100 text-gray-600 hover:bg-[#EADD8E]/20 hover:text-[#252525]"
                  }`}
                >
                  Location
                </button>
                <button
                  onClick={() => setActiveTab("achat")}
                  className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 ${
                    activeTab === "achat" 
                      ? "bg-[#252525] text-white shadow-lg transform scale-105" 
                      : "bg-gray-100 text-gray-600 hover:bg-[#EADD8E]/20 hover:text-[#252525]"
                  }`}
                >
                  Achat
                </button>
              </div>
              <div className="flex flex-col items-start md:items-end space-x-4 mb-2">
                    <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#EADD8E] to-[#A07539] border-3 border-white shadow-lg" />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#A07539] to-[#252525] border-3 border-white shadow-lg" />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#252525] to-[#EADD8E] border-3 border-white shadow-lg" />
                  </div>
                  <div className="flex items-center">
                  <div className="flex items-center space-x-2 bg-[#EADD8E]/20 px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 text-[#EADD8E] fill-current" />
                    <span className="text-base font-bold text-[#252525]">4.8</span>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">3k+ avis clients</span>
                  </div>
                </div>
              </div>
              

            {/* Champs du formulaire */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 place-items-end gap-6 mb-8">
              <div className="flex flex-col items-start w-full gap-2">
                <label className="text-sm font-semibold text-gray-700 w-32 shrink-0">
                  Localisation
                </label>
                <Input 
                  placeholder="Choisir une localisation" 
                  className="w-full h-auto px-4 border-2 border-gray-200 focus:border-[#EADD8E] rounded-xl transition-colors"
                />
              </div>

              <div className="flex flex-col items-start w-full gap-2">
                <label className="text-sm font-semibold text-gray-700 w-32 shrink-0">
                  Type de Bien
                </label>
                <Select>
                  <SelectTrigger className="w-full h-auto px-4 border-2 border-gray-200 focus:border-[#EADD8E] rounded-xl">
                    <SelectValue placeholder="Maison Villa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="villa">Maison Villa</SelectItem>
                    <SelectItem value="appartement">Appartement</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="maison-ville">Maison de Ville</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-start w-full gap-2">
                <label className="text-sm font-semibold text-gray-700 w-32 shrink-0">
                  Style Archi.
                </label>
                <Select>
                  <SelectTrigger className="w-full h-auto px-4 border-2 border-gray-200 focus:border-[#EADD8E] rounded-xl">
                    <SelectValue placeholder="Industriel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="industriel">Industriel</SelectItem>
                    <SelectItem value="moderne">Moderne</SelectItem>
                    <SelectItem value="traditionnel">Traditionnel</SelectItem>
                    <SelectItem value="contemporain">Contemporain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-start w-full gap-2">
                <label className="text-sm font-semibold text-gray-700 w-32 shrink-0">
                  Gamme de Prix
                </label>
                <Input 
                  placeholder="100 000F - 450 000F" 
                  className="w-full h-auto px-4 border-2 border-gray-200 focus:border-[#EADD8E] rounded-xl transition-colors"
                />
              </div>

              <Button className="w-full h-auto bg-[#252525] hover:bg-[#A07539] text-white px-10 rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105">
                Rechercher
              </Button>
            </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}