"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Bed, Home, Filter, Search, Star } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data - à remplacer par des données réelles
const mockProperties = [
  {
    id: 1,
    title: "Villa moderne avec jardin",
    type: "Maison",
    commune: "Cocody",
    locationVague: "Riviera",
    price: 150000000,
    rooms: 5,
    image: "/assets/images/illustrations/page-properties/items-1.jpg",
    isNew: true,
    isPopular: false
  },
  {
    id: 2,
    title: "Appartement spacieux",
    type: "Appartement",
    commune: "Abobo",
    locationVague: "Zone 1",
    price: 45000000,
    rooms: 3,
    image: "/assets/images/illustrations/page-properties/items-2.jpg",
    isNew: false,
    isPopular: true
  },
  {
    id: 3,
    title: "Bureau commercial",
    type: "Bureau",
    commune: "Marcory",
    locationVague: "Zone 4",
    price: 75000000,
    rooms: 2,
    image: "/assets/images/illustrations/page-properties/items-3.jpg",
    isNew: true,
    isPopular: false
  },
  {
    id: 4,
    title: "Maison traditionnelle",
    type: "Maison",
    commune: "Yopougon",
    locationVague: "Siporex",
    price: 85000000,
    rooms: 4,
    image: "/assets/images/illustrations/page-properties/items-4.jpg",
    isNew: false,
    isPopular: true
  },
  {
    id: 5,
    title: "Appartement F2",
    type: "Appartement",
    commune: "Plateau",
    locationVague: "Centre-ville",
    price: 35000000,
    rooms: 2,
    image: "/assets/images/illustrations/page-properties/items-5.jpg",
    isNew: true,
    isPopular: false
  },
  {
    id: 6,
    title: "Local commercial",
    type: "Magasin",
    commune: "Adjamé",
    locationVague: "Gare routière",
    price: 25000000,
    rooms: 1,
    image: "/assets/images/illustrations/page-properties/items-6.jpg",
    isNew: false,
    isPopular: false
  }
]

export default function PropertiesPage() {
  const [properties] = useState(mockProperties)
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const [filters, setFilters] = useState({
    type: "",
    commune: "",
    priceMin: "",
    priceMax: ""
  })

  const handleFilter = () => {
    let filtered = [...properties]
    
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(p => p.type === filters.type)
    }
    if (filters.commune && filters.commune !== "all") {
      filtered = filtered.filter(p => p.commune === filters.commune)
    }
    
    setFilteredProperties(filtered)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA"
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#252525]">Accueil</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#252525] font-medium">Properties</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#252525] to-[#A07539] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Toutes les Propriétés
          </h1>
          <p className="text-xl text-[#EADD8E]">
            Découvrez notre sélection de propriétés disponibles
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-[#252525]" />
            <h2 className="text-xl font-semibold text-[#252525]">Filtres de recherche</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Maison">Maison</SelectItem>
                  <SelectItem value="Appartement">Appartement</SelectItem>
                  <SelectItem value="Bureau">Bureau</SelectItem>
                  <SelectItem value="Magasin">Magasin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commune</label>
              <Select value={filters.commune} onValueChange={(value) => setFilters({...filters, commune: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Toutes les communes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les communes</SelectItem>
                  <SelectItem value="Cocody">Cocody</SelectItem>
                  <SelectItem value="Abobo">Abobo</SelectItem>
                  <SelectItem value="Marcory">Marcory</SelectItem>
                  <SelectItem value="Yopougon">Yopougon</SelectItem>
                  <SelectItem value="Plateau">Plateau</SelectItem>
                  <SelectItem value="Adjamé">Adjamé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix min</label>
              <Input
                type="number"
                placeholder="Prix minimum"
                value={filters.priceMin}
                onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                className="w-full"
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleFilter}
                className="w-full bg-[#252525] hover:bg-[#A07539] text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {paginatedProperties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">Aucune propriété trouvée</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/proprietes/${property.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {property.isNew && (
                        <span className="bg-[#EADD8E] text-[#252525] px-3 py-1 rounded-full text-xs font-semibold">
                          Nouvelle annonce
                        </span>
                      )}
                      {property.isPopular && (
                        <span className="bg-[#A07539] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Populaire
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-[#252525] group-hover:text-[#A07539] transition-colors">
                        {property.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.commune}, {property.locationVague}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <Home className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.type}</span>
                      <span className="mx-2">•</span>
                      <Bed className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.rooms} pièces</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#252525]">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
                >
                  Précédent
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-[#252525] text-white hover:bg-[#A07539]"
                        : "border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
                    }
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
                >
                  Suivant
                </Button>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  )
}

