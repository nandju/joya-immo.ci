"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Calendar, MessageSquare, Plus, Eye, Edit, TrendingUp, Users, BarChart3 } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const stats = {
  totalProperties: 12,
  pendingReservations: 3,
  confirmedVisits: 8,
  unreadMessages: 5
}

const recentProperties = [
  { id: 1, nom: "Villa moderne", type: "Maison", commune: "Cocody", prix: 150000000, statut: "Active" },
  { id: 2, nom: "Appartement F3", type: "Appartement", commune: "Plateau", prix: 45000000, statut: "Active" },
  { id: 3, nom: "Bureau commercial", type: "Bureau", commune: "Marcory", prix: 75000000, statut: "Inactive" },
  { id: 4, nom: "Maison traditionnelle", type: "Maison", commune: "Yopougon", prix: 85000000, statut: "Active" },
  { id: 5, nom: "Local commercial", type: "Magasin", commune: "Adjamé", prix: 25000000, statut: "Active" }
]

export default function OwnerDashboardPage() {
  const [user] = useState({ prenom: "Jean", nom: "Dupont" })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">
            Bienvenue {user.prenom} {user.nom}
          </h1>
          <p className="text-gray-600">Gérez vos propriétés et réservations en un seul endroit</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/owner/properties">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-[#A07539]" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.totalProperties}</h3>
              <p className="text-sm text-gray-600">Mes Propriétés</p>
            </div>
          </Link>

          <Link href="/owner/reservations">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#A07539]" />
                </div>
                {stats.pendingReservations > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {stats.pendingReservations}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.pendingReservations}</h3>
              <p className="text-sm text-gray-600">Réservations en attente</p>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#A07539]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.confirmedVisits}</h3>
            <p className="text-sm text-gray-600">Visites confirmées (ce mois)</p>
          </div>

          <Link href="/owner/messages">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#A07539]" />
                </div>
                {stats.unreadMessages > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {stats.unreadMessages}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.unreadMessages}</h3>
              <p className="text-sm text-gray-600">Messages non lus</p>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-[#252525] mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/owner/property/create">
              <Button className="w-full bg-[#252525] hover:bg-[#A07539] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une propriété
              </Button>
            </Link>
            <Link href="/owner/properties">
              <Button variant="outline" className="w-full border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                <Eye className="w-4 h-4 mr-2" />
                Voir mes propriétés
              </Button>
            </Link>
            <Link href="/owner/reservations">
              <Button variant="outline" className="w-full border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                <Calendar className="w-4 h-4 mr-2" />
                Voir mes réservations
              </Button>
            </Link>
            <Link href="/owner/messages">
              <Button variant="outline" className="w-full border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                <MessageSquare className="w-4 h-4 mr-2" />
                Voir mes messages
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Properties */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#252525]">Propriétés Récentes</h2>
              <Link href="/owner/properties">
                <Button variant="ghost" className="text-[#A07539] hover:text-[#252525]">
                  Voir tout
                </Button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commune</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#252525]">{property.nom}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{property.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{property.commune}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-[#252525]">{formatPrice(property.prix)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.statut === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {property.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link href={`/owner/property/${property.id}/view`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/owner/property/${property.id}/edit`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            <Edit className="w-4 h-4" />
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

