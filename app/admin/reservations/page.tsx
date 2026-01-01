"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Filter, Search, Calendar, XCircle, FileText } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const reservations = [
  { id: 1, visiteur: "Marie Martin", propriete: "Villa moderne", proprietaire: "Jean Dupont", date: "2024-02-15", heure: "14:00", statut: "En attente" },
  { id: 2, visiteur: "Paul Kouassi", propriete: "Appartement F3", proprietaire: "Marie Martin", date: "2024-02-20", heure: "10:00", statut: "Confirmée" },
  { id: 3, visiteur: "Sophie Diallo", propriete: "Bureau commercial", proprietaire: "Paul Kouassi", date: "2024-02-18", heure: "16:00", statut: "Effectuée" },
  { id: 4, visiteur: "Jean Bernard", propriete: "Maison traditionnelle", proprietaire: "Sophie Diallo", date: "2024-02-22", heure: "11:00", statut: "Annulée" },
]

export default function AdminReservationsPage() {
  const [filteredReservations, setFilteredReservations] = useState(reservations)
  const [filters, setFilters] = useState({
    statut: "all",
    propriete: "all",
    proprietaire: "all",
    search: ""
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR')
  }

  const handleFilter = () => {
    let filtered = [...reservations]
    
    if (filters.statut && filters.statut !== "all") {
      filtered = filtered.filter(r => r.statut === filters.statut)
    }
    if (filters.propriete && filters.propriete !== "all") {
      filtered = filtered.filter(r => r.propriete === filters.propriete)
    }
    if (filters.proprietaire && filters.proprietaire !== "all") {
      filtered = filtered.filter(r => r.proprietaire === filters.proprietaire)
    }
    if (filters.search) {
      filtered = filtered.filter(r => 
        r.visiteur.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.propriete.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    setFilteredReservations(filtered)
  }

  const handleCancel = (id: number) => {
    const raison = prompt("Raison de l'annulation (litige) :")
    if (raison) {
      console.log("Annuler réservation", id, raison)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">Gestion des Réservations</h1>
          <p className="text-gray-600">Vue globale de toutes les réservations de la plateforme</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#252525]" />
            <h2 className="text-lg font-semibold text-[#252525]">Filtres</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Input
                placeholder="Rechercher..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <div>
              <Select value={filters.statut} onValueChange={(value) => setFilters({...filters, statut: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Confirmée">Confirmée</SelectItem>
                  <SelectItem value="Effectuée">Effectuée</SelectItem>
                  <SelectItem value="Annulée">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
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
              <Select value={filters.proprietaire} onValueChange={(value) => setFilters({...filters, proprietaire: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les propriétaires" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les propriétaires</SelectItem>
                  <SelectItem value="Jean Dupont">Jean Dupont</SelectItem>
                  <SelectItem value="Marie Martin">Marie Martin</SelectItem>
                  <SelectItem value="Paul Kouassi">Paul Kouassi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleFilter}
              className="w-full bg-[#252525] hover:bg-[#A07539] text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visiteur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propriété</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propriétaire</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#252525]">{reservation.visiteur}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.propriete}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.proprietaire}</td>
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
                        <Link href={`/admin/reservation/${reservation.id}/details`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleCancel(reservation.id)}
                        >
                          <XCircle className="w-4 h-4" />
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

