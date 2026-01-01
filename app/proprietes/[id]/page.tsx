"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Bed, Home, Ruler, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight, Check, User, Clock } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data - à remplacer par des données réelles
const mockProperty = {
  id: 1,
  title: "Villa moderne avec jardin",
  type: "Maison",
  commune: "Cocody",
  locationVague: "Riviera",
  price: 150000000,
  rooms: 5,
  superficie: 250,
  status: "À vendre",
  description: "Magnifique villa moderne avec jardin spacieux, située dans un quartier calme. Parfait pour une famille. Tous les équipements modernes inclus.",
  images: [
    "/assets/images/illustrations/page-properties/items-1.jpg",
    "/assets/images/illustrations/page-properties/items-2.jpg",
    "/assets/images/illustrations/page-properties/items-3.jpg",
    "/assets/images/illustrations/page-properties/items-4.jpg"
  ],
  equipements: [
    "École à proximité",
    "Facile d'accès",
    "Marché à proximité",
    "Boulangerie à proximité",
    "Parking disponible",
    "Accès internet rapide",
    "Climatisation",
    "Jardin"
  ],
  pieces: {
    doucheVisiteurs: true,
    douchePrincipale: true,
    doucheExterne: false,
    cuisine: true,
    salon: true,
    chambre: true,
    bureau: false,
    garage: true,
    balcon: true,
    jardinet: true
  },
  avis: [
    {
      id: 1,
      auteur: "Jean Dupont",
      date: "2024-01-15",
      commentaire: "Très belle propriété, bien située."
    },
    {
      id: 2,
      auteur: "Marie Martin",
      date: "2024-01-10",
      commentaire: "Jardin magnifique et quartier calme."
    }
  ],
  messages: [
    {
      id: 1,
      auteur: "Propriétaire",
      date: "2024-01-20",
      heure: "10:30",
      message: "Bienvenue ! N'hésitez pas à poser vos questions."
    },
    {
      id: 2,
      auteur: "Visiteur",
      date: "2024-01-20",
      heure: "11:00",
      message: "Quelle est la superficie exacte du jardin ?"
    }
  ]
}

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  use(params) // Just for type compatibility
  const property = mockProperty
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [contactFormData, setContactFormData] = useState({
    nom: "",
    email: "",
    message: ""
  })
  const [isLoggedIn] = useState(false) // À remplacer par la vérification réelle de l'état de connexion

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA"
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique d'envoi du formulaire
    console.log("Contact form submitted", contactFormData)
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
            <Link href="/proprietes" className="text-gray-500 hover:text-[#252525]">Propriétés</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#252525] font-medium">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video">
              <Image
                src={property.images[currentImageIndex]}
                alt={property.title}
                fill
                className="object-cover"
              />
              
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#252525] p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#252525] p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-[#EADD8E] w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#252525] mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.commune}, {property.locationVague}</span>
                  </div>
                </div>
                <span className="bg-[#EADD8E] text-[#252525] px-4 py-2 rounded-full text-sm font-semibold">
                  {property.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 py-4 border-t border-b border-gray-200">
                <div className="flex items-center">
                  <Home className="w-5 h-5 text-[#A07539] mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-[#252525]">{property.type}</p>
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
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-[#252525]">
                    {formatPrice(property.price)}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#252525] mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
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

            {/* Avis */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Avis et Commentaires</h2>
              {property.avis.length === 0 ? (
                <p className="text-gray-500">Aucun avis pour le moment.</p>
              ) : (
                <div className="space-y-4">
                  {property.avis.map((avis) => (
                    <div key={avis.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-[#A07539] mr-2" />
                          <span className="font-semibold text-[#252525]">{avis.auteur}</span>
                        </div>
                        <span className="text-sm text-gray-500">{avis.date}</span>
                      </div>
                      <p className="text-gray-700">{avis.commentaire}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Général */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Discussion Générale</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                {property.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.auteur === "Propriétaire" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.auteur === "Propriétaire"
                        ? "bg-[#EADD8E]/20 border border-[#EADD8E]"
                        : "bg-gray-100"
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-[#252525]">{msg.auteur}</span>
                        <span className="text-xs text-gray-500">{msg.heure}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              {!isLoggedIn && (
                <p className="text-sm text-gray-500 text-center py-2">
                  Connectez-vous pour participer à la discussion
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reservation Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 sticky top-8">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Réserver une Visite</h2>
              
              {!isLoggedIn ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Connectez-vous pour réserver une visite
                    </p>
                    <Link href="/connexion">
                      <Button className="w-full bg-[#252525] hover:bg-[#A07539] text-white">
                        Se connecter
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Sélectionnez une date et une heure pour votre visite
                  </p>
                  <Button className="w-full bg-[#252525] hover:bg-[#A07539] text-white">
                    Réserver une visite
                  </Button>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Nous Contacter</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Votre nom"
                    value={contactFormData.nom}
                    onChange={(e) => setContactFormData({...contactFormData, nom: e.target.value})}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Votre email"
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Votre message"
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                    required
                    className="w-full min-h-[100px]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#EADD8E] hover:bg-[#A07539] text-[#252525] hover:text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

