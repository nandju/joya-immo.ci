"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Home, Download, Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const reservations = [
  { id: 1, propriete: "Villa moderne avec jardin", date: "2024-02-15", heure: "14:00", statut: "Effectuée" },
  { id: 2, propriete: "Appartement F3", date: "2024-02-20", heure: "10:00", statut: "Confirmée" },
  { id: 3, propriete: "Bureau commercial", date: "2024-02-25", heure: "16:00", statut: "En attente" },
]

export default function HistoryPage() {
  const [filter, setFilter] = useState("all")

  const filteredReservations = filter === "all" 
    ? reservations 
    : reservations.filter(r => r.statut === filter)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const handleDownloadPDF = (id: number) => {
    console.log("Télécharger PDF pour réservation", id)
    alert("Téléchargement du récapitulatif PDF")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#252525] mb-2 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#A07539]" />
            Mon Historique
          </h1>
          <p className="text-gray-600">Consultez l'historique de vos réservations et visites</p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filtrer par statut :</span>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Confirmée">Confirmée</SelectItem>
                <SelectItem value="Effectuée">Effectuée</SelectItem>
                <SelectItem value="Annulée">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredReservations.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-[#252525] mb-2">Aucune réservation</h2>
              <p className="text-gray-600 mb-6">Vous n'avez pas encore de réservations</p>
              <Link href="/properties">
                <Button className="bg-[#252525] hover:bg-[#A07539] text-white">
                  Explorer les propriétés
                </Button>
              </Link>
            </div>
          ) : (
            filteredReservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Home className="w-5 h-5 text-[#A07539]" />
                      <h3 className="text-xl font-semibold text-[#252525]">{reservation.propriete}</h3>
                    </div>
                    
                    <div className="flex items-center gap-6 text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(reservation.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{reservation.heure}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {reservation.statut === "Effectuée" && (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-green-600 font-medium">Visite effectuée</span>
                        </>
                      )}
                      {reservation.statut === "Confirmée" && (
                        <>
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                          <span className="text-blue-600 font-medium">Confirmée</span>
                        </>
                      )}
                      {reservation.statut === "En attente" && (
                        <>
                          <Clock className="w-5 h-5 text-yellow-500" />
                          <span className="text-yellow-600 font-medium">En attente de confirmation</span>
                        </>
                      )}
                      {reservation.statut === "Annulée" && (
                        <>
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-red-600 font-medium">Annulée</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link href={`/properties/${reservation.id}`}>
                      <Button variant="outline" size="sm" className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir la propriété
                      </Button>
                    </Link>
                    {reservation.statut === "Effectuée" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPDF(reservation.id)}
                        className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger PDF
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

