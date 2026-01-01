"use client"

import { useState, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Ban, Trash2, Edit, ArrowLeft, MapPin, Bed, Home, Ruler, Check } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const property = {
  id: 1,
  nom: "Villa moderne avec jardin",
  type: "Maison",
  commune: "Cocody",
  locationVague: "Riviera",
  prix: 150000000,
  rooms: 5,
  superficie: 250,
  statut: "En attente",
  description: "Magnifique villa moderne avec jardin spacieux, située dans un quartier calme. Parfait pour une famille. Tous les équipements modernes inclus.",
  images: [
    "/assets/images/illustrations/page-properties/items-1.jpg",
    "/assets/images/illustrations/page-properties/items-2.jpg",
    "/assets/images/illustrations/page-properties/items-3.jpg",
  ],
  equipements: [
    "École à proximité",
    "Facile d'accès",
    "Marché à proximité",
    "Parking disponible",
    "Climatisation",
    "Jardin"
  ],
  proprietaire: "Jean Dupont",
  dateCreation: "2024-02-10"
}

export default function AdminPropertyViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA"
  }

  const handleValidate = () => {
    if (confirm("Valider cette propriété ?")) {
      console.log("Valider propriété", id)
    }
  }

  const handleReject = () => {
    const motif = prompt("Motif du refus :")
    if (motif) {
      console.log("Refuser propriété", id, motif)
    }
  }

  const handleSuspend = () => {
    if (confirm("Suspendre cette propriété ?")) {
      console.log("Suspendre propriété", id)
    }
  }

  const handleDelete = () => {
    if (confirm("Supprimer définitivement cette propriété ?")) {
      console.log("Supprimer propriété", id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/admin/properties" className="inline-flex items-center text-[#A07539] hover:text-[#252525] mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>

        {/* Header Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#252525] mb-2">{property.nom}</h1>
              <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                property.statut === "Publiée" ? "bg-green-100 text-green-800" :
                property.statut === "En attente" ? "bg-yellow-100 text-yellow-800" :
                property.statut === "Refusée" ? "bg-red-100 text-red-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {property.statut}
              </span>
            </div>
            <div className="flex gap-2">
              {property.statut === "En attente" && (
                <>
                  <Button onClick={handleValidate} className="bg-green-500 hover:bg-green-600 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Valider
                  </Button>
                  <Button onClick={handleReject} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                    <XCircle className="w-4 h-4 mr-2" />
                    Refuser
                  </Button>
                </>
              )}
              {property.statut === "Publiée" && (
                <Button onClick={handleSuspend} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                  <Ban className="w-4 h-4 mr-2" />
                  Suspendre
                </Button>
              )}
              <Link href={`/admin/property/${id}/edit`}>
                <Button variant="outline" className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
              </Link>
              <Button onClick={handleDelete} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Images</h2>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video mb-4">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={property.nom}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {property.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-[#A07539]" : "border-gray-200"
                    }`}
                  >
                    <Image src={img} alt={`Image ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">Vérification : Images uniquement extérieures ✓</p>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Informations Générales</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Home className="w-5 h-5 text-[#A07539] mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-[#252525]">{property.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-[#A07539] mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Localisation</p>
                    <p className="font-semibold text-[#252525]">{property.commune}, {property.locationVague}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bed className="w-5 h-5 text-[#A07539] mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Pièces</p>
                    <p className="font-semibold text-[#252525]">{property.rooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Ruler className="w-5 h-5 text-[#A07539] mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Superficie</p>
                    <p className="font-semibold text-[#252525]">{property.superficie} m²</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Prix</p>
                <p className="text-2xl font-bold text-[#252525]">{formatPrice(property.prix)}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-700">{property.description}</p>
              </div>
            </div>

            {/* Equipements */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Équipements et Avantages</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.equipements.map((equipement, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-[#A07539] mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{equipement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Propriétaire</h2>
              <p className="text-[#252525] font-medium mb-2">{property.proprietaire}</p>
              <Link href={`/admin/user/1/details`}>
                <Button variant="outline" className="w-full border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                  Voir le profil
                </Button>
              </Link>
            </div>

            {/* Property Metadata */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Métadonnées</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Date de création</p>
                  <p className="text-[#252525] font-medium">{property.dateCreation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ID Propriété</p>
                  <p className="text-[#252525] font-medium">{property.id}</p>
                </div>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Vérification</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Images uniquement extérieures</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Informations cohérentes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-700">Champs structurés respectés</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

