"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Edit, Trash2, Filter, Ban, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const users = [
  { id: 1, nom: "Dupont", prenom: "Jean", type: "Propriétaire", email: "jean@example.com", dateInscription: "2024-01-15", statut: "Actif" },
  { id: 2, nom: "Martin", prenom: "Marie", type: "Visiteur", email: "marie@example.com", dateInscription: "2024-01-20", statut: "Actif" },
  { id: 3, nom: "Kouassi", prenom: "Paul", type: "Propriétaire", email: "paul@example.com", dateInscription: "2024-01-10", statut: "Inactif" },
]

export default function AdminUsersPage() {
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [filters, setFilters] = useState({
    type: "all",
    statut: "all",
    search: ""
  })

  const handleFilter = () => {
    let filtered = [...users]
    
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(u => u.type === filters.type)
    }
    if (filters.statut && filters.statut !== "all") {
      filtered = filtered.filter(u => u.statut === filters.statut)
    }
    if (filters.search) {
      filtered = filtered.filter(u => 
        u.nom.toLowerCase().includes(filters.search.toLowerCase()) ||
        u.prenom.toLowerCase().includes(filters.search.toLowerCase()) ||
        u.email.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    setFilteredUsers(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Gérez tous les utilisateurs de la plateforme</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#252525]" />
            <h2 className="text-lg font-semibold text-[#252525]">Filtres</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Rechercher par nom, prénom, email..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>

            <div>
              <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Propriétaire">Propriétaire</SelectItem>
                  <SelectItem value="Visiteur">Visiteur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filters.statut} onValueChange={(value) => setFilters({...filters, statut: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
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

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'inscription</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#252525]">{user.nom}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.prenom}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.type === "Propriétaire"
                          ? "bg-[#EADD8E] text-[#252525]"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {user.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.dateInscription}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.statut === "Actif"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/user/${user.id}/details`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {user.statut === "Actif" ? (
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-700">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
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

