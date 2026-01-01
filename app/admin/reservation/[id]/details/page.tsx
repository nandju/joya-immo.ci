"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, User, Home, XCircle, MessageSquare } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const reservation = {
  id: 2,
  visiteur: "Paul Kouassi",
  visiteurEmail: "paul@example.com",
  propriete: "Appartement F3",
  proprieteId: 2,
  proprietaire: "Marie Martin",
  proprietaireEmail: "marie@example.com",
  date: "2024-02-20",
  heure: "10:00",
  statut: "Confirmée",
  message: "Je souhaite visiter cette propriété pour un achat potentiel.",
  dateCreation: "2024-02-15"
}

const messages = [
  { id: 1, auteur: "Paul Kouassi", date: "2024-02-15", heure: "14:30", message: "Bonjour, je souhaite visiter cette propriété." },
  { id: 2, auteur: "Marie Martin", date: "2024-02-15", heure: "15:00", message: "Bonjour, la visite est confirmée pour le 20/02 à 10h." },
]

export default function AdminReservationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [cancelReason, setCancelReason] = useState("")

  const handleCancel = () => {
    if (!cancelReason) {
      alert("Veuillez indiquer une raison pour l'annulation")
      return
    }
    if (confirm("Annuler cette réservation ?")) {
      console.log("Annuler réservation", id, cancelReason)
      alert("Réservation annulée")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/admin/reservations" className="inline-flex items-center text-[#A07539] hover:text-[#252525] mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reservation Info */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-[#252525]">Détails de la Réservation</h1>
                <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                  reservation.statut === "Confirmée" ? "bg-green-100 text-green-800" :
                  reservation.statut === "En attente" ? "bg-yellow-100 text-yellow-800" :
                  reservation.statut === "Effectuée" ? "bg-blue-100 text-blue-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {reservation.statut}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-[#A07539] mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Date & Heure</p>
                    <p className="text-lg font-semibold text-[#252525]">
                      {new Date(reservation.date).toLocaleDateString('fr-FR')} à {reservation.heure}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Home className="w-5 h-5 text-[#A07539] mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Propriété</p>
                    <Link href={`/admin/property/${reservation.proprieteId}/view`} className="text-lg font-semibold text-[#A07539] hover:underline">
                      {reservation.propriete}
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="w-5 h-5 text-[#A07539] mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Visiteur</p>
                    <p className="text-lg font-semibold text-[#252525]">{reservation.visiteur}</p>
                    <p className="text-sm text-gray-500">{reservation.visiteurEmail}</p>
                    <Link href={`/admin/user/2/details`} className="text-sm text-[#A07539] hover:underline">
                      Voir le profil
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="w-5 h-5 text-[#A07539] mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Propriétaire</p>
                    <p className="text-lg font-semibold text-[#252525]">{reservation.proprietaire}</p>
                    <p className="text-sm text-gray-500">{reservation.proprietaireEmail}</p>
                    <Link href={`/admin/user/1/details`} className="text-sm text-[#A07539] hover:underline">
                      Voir le profil
                    </Link>
                  </div>
                </div>
              </div>

              {reservation.message && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Message initial</p>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{reservation.message}</p>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Messages ({messages.length})
              </h2>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[#252525]">{msg.auteur}</span>
                      <span className="text-sm text-gray-500">{msg.date} à {msg.heure}</span>
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Actions</h2>
              
              {reservation.statut !== "Annulée" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Raison d'annulation (litige)
                    </label>
                    <Textarea
                      placeholder="Indiquez la raison de l'annulation..."
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      rows={4}
                      className="w-full"
                    />
                  </div>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="w-full border-red-500 text-red-500 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Annuler la réservation
                  </Button>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Date de création</p>
                <p className="text-[#252525] font-medium">{reservation.dateCreation}</p>
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Historique</h2>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-600">Créée le</p>
                  <p className="text-[#252525] font-medium">{reservation.dateCreation}</p>
                </div>
                {reservation.statut === "Confirmée" && (
                  <div className="text-sm">
                    <p className="text-gray-600">Confirmée le</p>
                    <p className="text-[#252525] font-medium">2024-02-16</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

