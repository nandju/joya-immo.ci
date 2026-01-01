"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Eye, MessageSquare, Calendar, Filter } from "lucide-react"
import Navbar from "@/components/navbar"

const reservations = [
  { id: 1, visiteur: "Marie Martin", propriete: "Villa moderne", date: "2024-02-15", heure: "14:00", statut: "En attente", messages: 1 },
  { id: 2, visiteur: "Paul Kouassi", propriete: "Appartement F3", date: "2024-02-20", heure: "10:00", statut: "Confirmée", messages: 0 },
  { id: 3, visiteur: "Sophie Diallo", propriete: "Bureau commercial", date: "2024-02-18", heure: "16:00", statut: "Effectuée", messages: 2 },
]

export default function OwnerReservationsPage() {
  const [filters, setFilters] = useState({
    statut: "",
    propriete: "",
    periode: ""
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR')
  }

  const handleConfirm = (id: number) => {
    console.log("Confirmer réservation", id)
  }

  const handleRefuse = (id: number) => {
    const raison = prompt("Raison du refus (optionnel) :")
    console.log("Refuser réservation", id, raison)
  }

  const filteredReservations = reservations.filter(r => {
    if (filters.statut && filters.statut !== "all" && r.statut !== filters.statut) return false
    if (filters.propriete && filters.propriete !== "all" && r.propriete !== filters.propriete) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">Mes Réservations</h1>
          <p className="text-gray-600">Gérez les demandes de visite de vos propriétés</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#252525]" />
            <h2 className="text-lg font-semibold text-[#252525]">Filtres</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <Select value={filters.statut} onValueChange={(value) => setFilters({...filters, statut: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Confirmée">Confirmée</SelectItem>
                  <SelectItem value="Refusée">Refusée</SelectItem>
                  <SelectItem value="Effectuée">Effectuée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Propriété</label>
              <Select value={filters.propriete} onValueChange={(value) => setFilters({...filters, propriete: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les propriétés" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les propriétés</SelectItem>
                  <SelectItem value="Villa moderne">Villa moderne</SelectItem>
                  <SelectItem value="Appartement F3">Appartement F3</SelectItem>
                  <SelectItem value="Bureau commercial">Bureau commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
              <Select value={filters.periode} onValueChange={(value) => setFilters({...filters, periode: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les périodes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Messages</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/owner/reservation/${reservation.id}/details`}>
                        <span className="text-sm text-[#A07539] hover:underline cursor-pointer">
                          {reservation.messages} {reservation.messages > 0 ? "messages" : "message"}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link href={`/owner/reservation/${reservation.id}/details`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
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
                        <Link href={`/owner/messages?reservation=${reservation.id}`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </Link>
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

