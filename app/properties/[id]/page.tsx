"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  MapPin, Bed, Home, ChevronLeft, ChevronRight, Check, User, Clock, 
  MessageCircle, Heart, Calendar, Star, Shield, Zap, 
  Droplets, Navigation, Car, School, ShoppingCart, Bus, Hospital, Store, 
  UtensilsCrossed, AlertTriangle, X
} from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data - à remplacer par des données réelles
const mockProperty = {
  id: 1,
  title: "Villa moderne avec jardin",
  type: "Maison",
  commune: "Cocody",
  locationVague: "Riviera",
  price: 150000000,
  priceType: "Vente", // "Location" ou "Vente"
  priceFrequency: "", // "Mensuel" ou "Annuel" si location
  rooms: 5,
  status: "Disponible", // "Disponible", "Occupé", "En attente de validation"
  description: "Magnifique villa moderne avec jardin spacieux, située dans un quartier calme. Parfait pour une famille. Tous les équipements modernes inclus.",
  images: [
    "/assets/images/illustrations/page-properties/items-1.jpg",
    "/assets/images/illustrations/page-properties/items-2.jpg",
    "/assets/images/illustrations/page-properties/items-3.jpg",
    "/assets/images/illustrations/page-properties/items-4.jpg"
  ],
  // Caractéristiques techniques (cases à cocher)
  caracteristiques: {
    nombrePieces: 5,
    douches: {
      principale: true,
      visiteurs: true,
      externe: false
    },
    cuisine: {
      interne: true,
      externe: false
    },
    electricite: {
      compteurPersonnel: true,
      compteurPartage: false
    },
    eau: {
      sodeci: true,
      forage: false
    },
    acces: {
      routeGoudronnee: true,
      accesFacile: true
    },
    stationnement: {
      parking: true,
      garage: true
    }
  },
  // Avantages & proximité (checkbox uniquement)
  avantages: [
    "École à proximité",
    "Marché proche",
    "Transport facile",
    "Centre de santé",
    "Route principale proche",
    "Commerces",
    "Boulangerie"
  ],
  // Propriétaire (partiellement anonyme)
  proprietaire: {
    nom: "Jean D.",
    pseudonyme: "Proprio_Verified",
    statutVerifie: true,
    nombreProprietes: 3,
    noteMoyenne: 4.5
  },
  // Messages de discussion
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
  ],
  // Feedbacks
  feedbacks: [
    {
      id: 1,
      auteur: "Jean Dupont",
      date: "2024-01-15",
      note: 5,
      commentaire: "Très belle propriété, bien située.",
      valide: true
    },
    {
      id: 2,
      auteur: "Marie Martin",
      date: "2024-01-10",
      note: 4,
      commentaire: "Jardin magnifique et quartier calme.",
      valide: true
    }
  ],
  // Planning de disponibilité (exemple)
  planning: {
    ouvert: true,
    joursDisponibles: ["Lundi", "Mercredi", "Vendredi", "Samedi"],
    creneaux: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
  },
  // Propriétés similaires
  proprietesSimilaires: [
    { id: 2, title: "Appartement spacieux", type: "Appartement", price: 45000000, image: "/assets/images/illustrations/page-properties/items-2.jpg" },
    { id: 4, title: "Maison traditionnelle", type: "Maison", price: 85000000, image: "/assets/images/illustrations/page-properties/items-4.jpg" }
  ]
}

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const property = mockProperty
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [isLoggedIn] = useState(false) // À remplacer par la vérification réelle
  const [isFavorite, setIsFavorite] = useState(false)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [reservationData, setReservationData] = useState({
    date: "",
    creneau: "",
    message: ""
  })
  const [feedbackData, setFeedbackData] = useState({
    note: 0,
    commentaire: ""
  })
  const [newMessage, setNewMessage] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA"
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoggedIn) {
      alert("Veuillez vous connecter pour réserver une visite")
      return
    }
    if (!property.planning.ouvert) {
      alert("Le planning est actuellement fermé")
      return
    }
    console.log("Réservation:", reservationData)
    alert("Réservation envoyée ! Vous recevrez une confirmation par email.")
    setShowReservationModal(false)
  }

  const handleSendMessage = () => {
    if (!isLoggedIn) {
      alert("Veuillez vous connecter pour envoyer un message")
      return
    }
    if (!newMessage.trim()) return
    
    // Filtrer les numéros et liens
    const filteredMessage = newMessage
      .replace(/\d{8,}/g, "[numéro masqué]")
      .replace(/https?:\/\/[^\s]+/g, "[lien masqué]")
    
    console.log("Message envoyé:", filteredMessage)
    setNewMessage("")
  }

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoggedIn) {
      alert("Veuillez vous connecter pour laisser un feedback")
      return
    }
    console.log("Feedback:", feedbackData)
    alert("Merci pour votre feedback ! Il sera modéré avant publication.")
    setShowFeedbackModal(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible":
        return "bg-green-100 text-green-800"
      case "Occupé":
        return "bg-red-100 text-red-800"
      case "En attente de validation":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
            <Link href="/properties" className="text-gray-500 hover:text-[#252525]">Properties</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#252525] font-medium">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1️⃣ En-tête de la propriété */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#EADD8E] text-[#252525] px-3 py-1 rounded-full text-sm font-semibold">
                      {property.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(property.status)}`}>
                      {property.status}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-[#252525] mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.commune}, {property.locationVague}</span>
                  </div>
                </div>
                {isLoggedIn && (
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite ? "text-red-500" : "text-gray-400"
                    } hover:text-red-500`}
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Prix</p>
                  <p className="text-2xl font-bold text-[#252525]">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {property.priceType}
                    {property.priceFrequency && ` - ${property.priceFrequency}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nombre de pièces</p>
                  <p className="text-xl font-semibold text-[#252525]">{property.rooms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Localisation</p>
                  <p className="text-sm font-semibold text-[#252525]">{property.commune}</p>
                  <p className="text-xs text-gray-500">{property.locationVague}</p>
                </div>
              </div>
            </div>

            {/* 2️⃣ Galerie d'images (extérieur uniquement) */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-video group">
                <Image
                  src={property.images[currentImageIndex] || "/assets/images/illustrations/page-properties/items-1.jpg"}
                  alt={property.title}
                  fill
                  className="object-cover cursor-zoom-in"
                  onClick={() => setIsImageZoomed(true)}
                />
                
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#252525] p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#252525] p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/50 px-3 py-2 rounded-full">
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
                    
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                  </>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                ⚠️ Seules les images extérieures sont affichées pour votre sécurité
              </p>
            </div>

            {/* 3️⃣ Caractéristiques techniques */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Caractéristiques techniques</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Nombre de pièces</p>
                  <p className="text-lg font-semibold text-[#252525]">{property.caracteristiques.nombrePieces}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Douches</p>
                  <div className="flex flex-wrap gap-3">
                    {property.caracteristiques.douches.principale && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Douche principale</span>
                      </div>
                    )}
                    {property.caracteristiques.douches.visiteurs && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Douche visiteurs</span>
                      </div>
                    )}
                    {property.caracteristiques.douches.externe && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Douche externe</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Cuisine</p>
                  <div className="flex flex-wrap gap-3">
                    {property.caracteristiques.cuisine.interne && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Cuisine interne</span>
                      </div>
                    )}
                    {property.caracteristiques.cuisine.externe && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Cuisine externe</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Électricité</p>
                  <div className="flex flex-wrap gap-3">
                    {property.caracteristiques.electricite.compteurPersonnel && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Compteur personnel</span>
                      </div>
                    )}
                    {property.caracteristiques.electricite.compteurPartage && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Compteur partagé</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Eau</p>
                  <div className="flex flex-wrap gap-3">
                    {property.caracteristiques.eau.sodeci && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Droplets className="w-4 h-4 text-green-600" />
                        <span className="text-sm">SODECI</span>
                      </div>
                    )}
                    {property.caracteristiques.eau.forage && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Droplets className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Forage</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Accès</p>
                  <div className="flex flex-wrap gap-3">
                    {property.caracteristiques.acces.routeGoudronnee && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Navigation className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Route goudronnée</span>
                      </div>
                    )}
                    {property.caracteristiques.acces.accesFacile && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Navigation className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Accès facile</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Stationnement</p>
                  <div className="flex flex-wrap gap-3">
                    {property.caracteristiques.stationnement.parking && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Car className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Parking</span>
                      </div>
                    )}
                    {property.caracteristiques.stationnement.garage && (
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Car className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Garage</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 4️⃣ Avantages & proximité */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Avantages & Proximité</h2>
              <div className="flex flex-wrap gap-3">
                {property.avantages.map((avantage, index) => {
                  const icons: { [key: string]: any } = {
                    "École à proximité": School,
                    "Marché proche": ShoppingCart,
                    "Transport facile": Bus,
                    "Centre de santé": Hospital,
                    "Route principale proche": Navigation,
                    "Commerces": Store,
                    "Boulangerie": UtensilsCrossed
                  }
                  const Icon = icons[avantage] || Check
                  
                  return (
                    <div key={index} className="flex items-center gap-2 bg-[#EADD8E]/20 border border-[#EADD8E] px-4 py-2 rounded-full">
                      <Icon className="w-4 h-4 text-[#A07539]" />
                      <span className="text-sm font-medium text-[#252525]">{avantage}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 5️⃣ Description générale */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
              <p className="text-xs text-gray-500 mt-3">
                ⚠️ Cette description a été modérée et validée par l'administrateur
              </p>
            </div>

            {/* 6️⃣ Bloc Propriétaire */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Propriétaire</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#EADD8E]/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-[#A07539]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#252525]">{property.proprietaire.pseudonyme || property.proprietaire.nom}</span>
                    {property.proprietaire.statutVerifie && (
                      <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        <Shield className="w-3 h-3" />
                        Vérifié
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{property.proprietaire.nombreProprietes} propriétés publiées</span>
                    {property.proprietaire.noteMoyenne > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{property.proprietaire.noteMoyenne}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 7️⃣ Interaction & communication */}
            {isLoggedIn && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-[#252525] mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Discussion
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto mb-4 border border-gray-200 rounded-lg p-4">
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
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Écrivez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#252525] hover:bg-[#A07539] text-white"
                  >
                    Envoyer
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ⚠️ Les numéros et liens sont automatiquement filtrés
                </p>
              </div>
            )}

            {/* 9️⃣ Favoris & historique */}
            {isLoggedIn && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-[#252525] mb-4">Propriétés similaires</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.proprietesSimilaires.map((prop) => (
                    <Link
                      key={prop.id}
                      href={`/properties/${prop.id}`}
                      className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-32">
                        <Image
                          src={prop.image}
                          alt={prop.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm text-[#252525] group-hover:text-[#A07539]">
                          {prop.title}
                        </p>
                        <p className="text-xs text-gray-600">{prop.type}</p>
                        <p className="text-sm font-bold text-[#252525] mt-1">
                          {formatPrice(prop.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 🔟 Feedback & commentaires */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#252525]">Feedbacks & Commentaires</h2>
                {isLoggedIn && (
                  <Button
                    onClick={() => setShowFeedbackModal(true)}
                    variant="outline"
                    className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
                  >
                    Laisser un avis
                  </Button>
                )}
              </div>
              {property.feedbacks.filter(f => f.valide).length === 0 ? (
                <p className="text-gray-500">Aucun feedback pour le moment.</p>
              ) : (
                <div className="space-y-4">
                  {property.feedbacks.filter(f => f.valide).map((feedback) => (
                    <div key={feedback.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-[#A07539]" />
                          <span className="font-semibold text-[#252525]">{feedback.auteur}</span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < feedback.note
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{feedback.date}</span>
                      </div>
                      <p className="text-gray-700">{feedback.commentaire}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 8️⃣ Réservation de visite */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 sticky top-8">
              <h2 className="text-xl font-semibold text-[#252525] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Réserver une Visite
              </h2>
              
              {!isLoggedIn ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Connectez-vous pour réserver une visite
                    </p>
                    <Link href="/login">
                      <Button className="w-full bg-[#252525] hover:bg-[#A07539] text-white">
                        Se connecter
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : !property.planning.ouvert ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Le planning est actuellement fermé. Veuillez réessayer plus tard.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Jours disponibles:</p>
                    <div className="flex flex-wrap gap-2">
                      {property.planning.joursDisponibles.map((jour, index) => (
                        <span key={index} className="bg-[#EADD8E]/20 text-[#252525] px-3 py-1 rounded-full text-xs">
                          {jour}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowReservationModal(true)}
                    className="w-full bg-[#252525] hover:bg-[#A07539] text-white"
                  >
                    Réserver une visite
                  </Button>
                </div>
              )}
            </div>

            {/* Actions rapides */}
            {isLoggedIn && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-[#252525] mb-4">Actions rapides</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                    {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Laisser un avis
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Signaler un abus
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de réservation */}
      {showReservationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#252525]">Réserver une visite</h3>
              <button
                onClick={() => setShowReservationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReservation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <Input
                  type="date"
                  value={reservationData.date}
                  onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Créneau horaire</label>
                <Select
                  value={reservationData.creneau}
                  onValueChange={(value) => setReservationData({...reservationData, creneau: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un créneau" />
                  </SelectTrigger>
                  <SelectContent>
                    {property.planning.creneaux.map((creneau) => (
                      <SelectItem key={creneau} value={creneau}>
                        {creneau}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (optionnel)</label>
                <Textarea
                  value={reservationData.message}
                  onChange={(e) => setReservationData({...reservationData, message: e.target.value})}
                  placeholder="Ajoutez un message..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReservationModal(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#252525] hover:bg-[#A07539] text-white"
                >
                  Réserver
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de feedback */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#252525]">Laisser un avis</h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleFeedback} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFeedbackData({...feedbackData, note: i + 1})}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          i < feedbackData.note
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire</label>
                <Textarea
                  value={feedbackData.commentaire}
                  onChange={(e) => setFeedbackData({...feedbackData, commentaire: e.target.value})}
                  placeholder="Partagez votre expérience..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                ⚠️ Votre feedback sera modéré avant publication
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#252525] hover:bg-[#A07539] text-white"
                >
                  Envoyer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal zoom image */}
      {isImageZoomed && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full max-h-[90vh]">
              <Image
                src={property.images[currentImageIndex] || "/assets/images/illustrations/page-properties/items-1.jpg"}
                alt={property.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsImageZoomed(false)
              }}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#252525] p-2 rounded-full z-10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
