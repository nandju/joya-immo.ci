"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Eye, MessageSquare, Calendar } from "lucide-react"
import Header from "@/components/header"

const reservations = [
  { id: 1, visiteur: "Marie Martin", propriete: "Villa moderne", date: "2024-02-15", heure: "14:00", statut: "En attente" },
  { id: 2, visiteur: "Paul Kouassi", propriete: "Appartement F3", date: "2024-02-20", heure: "10:00", statut: "Confirmée" },
  { id: 3, visiteur: "Sophie Diallo", propriete: "Bureau commercial", date: "2024-02-18", heure: "16:00", statut: "Effectuée" },
]

export default function OwnerReservationsPage() {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR')
  }

  const handleConfirm = (id: number) => {
    console.log("Confirmer réservation", id)
  }

  const handleRefuse = (id: number) => {
    console.log("Refuser réservation", id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">Mes Réservations</h1>
          <p className="text-gray-600">Gérez les demandes de visite de vos propriétés</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visiteur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propriété</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#252525]">{reservation.visiteur}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.propriete}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(reservation.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.heure}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reservation.statut === "Confirmée" ? "bg-green-100 text-green-800" :
                        reservation.statut === "En attente" ? "bg-yellow-100 text-yellow-800" :
                        reservation.statut === "Effectuée" ? "bg-blue-100 text-blue-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {reservation.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {reservation.statut === "En attente" && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-700" onClick={() => handleConfirm(reservation.id)}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleRefuse(reservation.id)}>
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

