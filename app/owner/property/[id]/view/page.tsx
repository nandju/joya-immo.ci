"use client"

import { useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Home, Ruler, Eye, Edit, Calendar, MessageSquare, BarChart3, Copy, Trash2, Share2 } from "lucide-react"
import Navbar from "@/components/navbar"

export default function PropertyViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: propertyId } = use(params)
  // Mock data
  const property = {
    id: propertyId,
    nom: "Villa moderne avec jardin",
    type: "Maison",
    commune: "Cocody",
    locationVague: "Riviera",
    prix: 150000000,
    superficie: 250,
    statut: "À vendre",
    description: "Magnifique villa moderne avec jardin spacieux, située dans un quartier calme.",
    images: [
      "/assets/images/illustrations/page-properties/items-1.jpg",
      "/assets/images/illustrations/page-properties/items-2.jpg",
      "/assets/images/illustrations/page-properties/items-3.jpg",
    ],
    stats: {
      vues: 234,
      clics: 89,
      reservations: 5,
      avis: 4
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/owner/dashboard" className="text-gray-500 hover:text-[#252525]">Dashboard</Link>
            <span className="text-gray-400">/</span>
            <Link href="/owner/properties" className="text-gray-500 hover:text-[#252525]">Mes Propriétés</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#252525] font-medium">{property.nom}</span>
          </nav>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">{property.nom}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{property.commune}, {property.locationVague}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Link href={`/owner/property/${propertyId}/edit`}>
              <Button variant="outline" className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                <Edit className="w-4 h-4 mr-2" />
                Éditer
              </Button>
            </Link>
            <Button variant="outline" className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.nom}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-1">Vues</p>
            <p className="text-2xl font-bold text-[#252525]">{property.stats.vues}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-1">Clics</p>
            <p className="text-2xl font-bold text-[#252525]">{property.stats.clics}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-1">Réservations</p>
            <p className="text-2xl font-bold text-[#252525]">{property.stats.reservations}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-1">Avis</p>
            <p className="text-2xl font-bold text-[#252525]">{property.stats.avis}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Informations Principales</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-[#252525]">{property.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Superficie</p>
                  <p className="font-semibold text-[#252525]">{property.superficie} m²</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Prix</p>
                  <p className="font-semibold text-[#252525]">{formatPrice(property.prix)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <p className="font-semibold text-[#252525]">{property.statut}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Description</h2>
              <p className="text-gray-700">{property.description}</p>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="font-semibold text-[#252525] mb-4">Actions</h3>
              <div className="space-y-2">
                <Link href={`/owner/property/${propertyId}/reservations`} className="block w-full">
                  <Button variant="outline" className="w-full border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                    <Calendar className="w-4 h-4 mr-2" />
                    Voir les réservations
                  </Button>
                </Link>
                <Link href={`/owner/property/${propertyId}/feedback`} className="block w-full">
                  <Button variant="outline" className="w-full border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Voir les avis
                  </Button>
                </Link>
                <Link href={`/owner/property/${propertyId}/statistics`} className="block w-full">
                  <Button variant="outline" className="w-full border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Statistiques
                  </Button>
                </Link>
                <Link href={`/owner/property/${propertyId}/schedule`} className="block w-full">
                  <Button variant="outline" className="w-full border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                    <Calendar className="w-4 h-4 mr-2" />
                    Gérer le planning
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

