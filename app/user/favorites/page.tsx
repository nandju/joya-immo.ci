"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Home, Bed, Trash2 } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const favorites = [
  { id: 1, title: "Villa moderne avec jardin", type: "Maison", commune: "Cocody", price: 150000000, rooms: 5, image: "/assets/images/illustrations/page-properties/items-1.jpg" },
  { id: 2, title: "Appartement F3", type: "Appartement", commune: "Plateau", price: 45000000, rooms: 3, image: "/assets/images/illustrations/page-properties/items-2.jpg" },
]

export default function FavoritesPage() {
  const [favoriteList, setFavoriteList] = useState(favorites)

  const handleRemoveFavorite = (id: number) => {
    setFavoriteList(favoriteList.filter(f => f.id !== id))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#252525] mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 text-[#A07539] fill-current" />
            Mes Favoris
          </h1>
          <p className="text-gray-600">{favoriteList.length} propriété{favoriteList.length > 1 ? "s" : ""} en favoris</p>
        </div>

        {favoriteList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#252525] mb-2">Aucun favori</h2>
            <p className="text-gray-600 mb-6">Vous n'avez pas encore ajouté de propriétés à vos favoris</p>
            <Link href="/properties">
              <Button className="bg-[#252525] hover:bg-[#A07539] text-white">
                Explorer les propriétés
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteList.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200">
                <Link href={`/properties/${property.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Link href={`/properties/${property.id}`}>
                      <h3 className="text-lg font-semibold text-[#252525] hover:text-[#A07539] transition-colors">
                        {property.title}
                      </h3>
                    </Link>
                    <button
                      onClick={() => handleRemoveFavorite(property.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-2 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.commune}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3 text-sm">
                    <Home className="w-4 h-4 mr-1" />
                    <span>{property.type}</span>
                    <span className="mx-2">•</span>
                    <Bed className="w-4 h-4 mr-1" />
                    <span>{property.rooms} pièces</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-xl font-bold text-[#252525]">
                      {formatPrice(property.price)}
                    </span>
                    <Link href={`/properties/${property.id}`}>
                      <Button variant="outline" size="sm" className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                        Voir
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

