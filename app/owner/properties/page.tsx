"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Eye, Edit, Trash2, Copy, Filter, Search } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const properties = [
  { id: 1, nom: "Villa moderne", type: "Maison", commune: "Cocody", prix: 150000000, visites: 45, statut: "Active" },
  { id: 2, nom: "Appartement F3", type: "Appartement", commune: "Plateau", prix: 45000000, visites: 32, statut: "Active" },
  { id: 3, nom: "Bureau commercial", type: "Bureau", commune: "Marcory", prix: 75000000, visites: 18, statut: "Inactive" },
  { id: 4, nom: "Maison traditionnelle", type: "Maison", commune: "Yopougon", prix: 85000000, visites: 28, statut: "Active" },
  { id: 5, nom: "Local commercial", type: "Magasin", commune: "Adjamé", prix: 25000000, visites: 15, statut: "Active" },
]

export default function OwnerPropertiesPage() {
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [filters, setFilters] = useState({
    type: "",
    commune: "",
    statut: "",
    search: ""
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA"
  }

  const handleFilter = () => {
    let filtered = [...properties]
    
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(p => p.type === filters.type)
    }
    if (filters.commune && filters.commune !== "all") {
      filtered = filtered.filter(p => p.commune === filters.commune)
    }
    if (filters.statut && filters.statut !== "all") {
      filtered = filtered.filter(p => p.statut === filters.statut)
    }
    if (filters.search) {
      filtered = filtered.filter(p => 
        p.nom.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    setFilteredProperties(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">Mes Propriétés</h1>
            <p className="text-gray-600">Gérez toutes vos propriétés en un seul endroit</p>
          </div>
          <Link href="/owner/property/create">
            <Button className="bg-[#252525] hover:bg-[#A07539] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une propriété
            </Button>
          </Link>
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
                placeholder="Rechercher par nom..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Maison">Maison</SelectItem>
                  <SelectItem value="Appartement">Appartement</SelectItem>
                  <SelectItem value="Bureau">Bureau</SelectItem>
                  <SelectItem value="Magasin">Magasin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commune</label>
              <Select value={filters.commune} onValueChange={(value) => setFilters({...filters, commune: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Toutes les communes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les communes</SelectItem>
                  <SelectItem value="Cocody">Cocody</SelectItem>
                  <SelectItem value="Abobo">Abobo</SelectItem>
                  <SelectItem value="Marcory">Marcory</SelectItem>
                  <SelectItem value="Yopougon">Yopougon</SelectItem>
                  <SelectItem value="Plateau">Plateau</SelectItem>
                  <SelectItem value="Adjamé">Adjamé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <Select value={filters.statut} onValueChange={(value) => setFilters({...filters, statut: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="En attente">En attente de validation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleFilter}
                className="w-full bg-[#252525] hover:bg-[#A07539] text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commune</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visites</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties.map((property) => (
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
                      <div className="text-sm text-gray-600">{property.visites}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.statut === "Active"
                          ? "bg-green-100 text-green-800"
                          : property.statut === "En attente"
                          ? "bg-yellow-100 text-yellow-800"
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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#A07539] hover:text-[#252525]"
                          onClick={() => console.log("Dupliquer", property.id)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            if (confirm("Êtes-vous sûr de vouloir supprimer cette propriété ?")) {
                              console.log("Supprimer", property.id)
                            }
                          }}
                        >
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

