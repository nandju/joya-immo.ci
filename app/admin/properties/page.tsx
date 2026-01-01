"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit, Trash2, Filter, Search, CheckCircle, XCircle, AlertTriangle, Ban, FileText } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const properties = [
  { id: 1, nom: "Villa moderne", type: "Maison", commune: "Cocody", proprietaire: "Jean Dupont", prix: 150000000, statut: "En attente", dateCreation: "2024-02-10" },
  { id: 2, nom: "Appartement F3", type: "Appartement", commune: "Plateau", proprietaire: "Marie Martin", prix: 45000000, statut: "Publiée", dateCreation: "2024-02-05" },
  { id: 3, nom: "Bureau commercial", type: "Bureau", commune: "Marcory", proprietaire: "Paul Kouassi", prix: 75000000, statut: "Publiée", dateCreation: "2024-02-08" },
  { id: 4, nom: "Maison traditionnelle", type: "Maison", commune: "Yopougon", proprietaire: "Sophie Diallo", prix: 85000000, statut: "Refusée", dateCreation: "2024-02-03" },
  { id: 5, nom: "Local commercial", type: "Magasin", commune: "Adjamé", proprietaire: "Jean Dupont", prix: 25000000, statut: "Suspendue", dateCreation: "2024-02-01" },
]

export default function AdminPropertiesPage() {
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [filters, setFilters] = useState({
    type: "all",
    commune: "all",
    statut: "all",
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
        p.nom.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.proprietaire.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    setFilteredProperties(filtered)
  }

  const handleValidate = (id: number) => {
    if (confirm("Valider cette propriété ?")) {
      console.log("Valider propriété", id)
      // Mettre à jour le statut
    }
  }

  const handleReject = (id: number) => {
    const motif = prompt("Motif du refus :")
    if (motif) {
      console.log("Refuser propriété", id, motif)
      // Mettre à jour le statut avec motif
    }
  }

  const handleSuspend = (id: number) => {
    if (confirm("Suspendre cette propriété ?")) {
      console.log("Suspendre propriété", id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">Gestion & Validation des Propriétés</h1>
          <p className="text-gray-600">Valider, modifier et gérer toutes les propriétés de la plateforme</p>
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
                placeholder="Rechercher par nom, propriétaire..."
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
                  <SelectItem value="Maison">Maison</SelectItem>
                  <SelectItem value="Appartement">Appartement</SelectItem>
                  <SelectItem value="Bureau">Bureau</SelectItem>
                  <SelectItem value="Magasin">Magasin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filters.commune} onValueChange={(value) => setFilters({...filters, commune: value})}>
                <SelectTrigger>
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
              <Select value={filters.statut} onValueChange={(value) => setFilters({...filters, statut: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Publiée">Publiée</SelectItem>
                  <SelectItem value="Refusée">Refusée</SelectItem>
                  <SelectItem value="Suspendue">Suspendue</SelectItem>
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

        {/* Properties Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propriétaire</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commune</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{property.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#252525]">{property.nom}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{property.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{property.proprietaire}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{property.commune}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-[#252525]">{formatPrice(property.prix)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.statut === "Publiée"
                          ? "bg-green-100 text-green-800"
                          : property.statut === "En attente"
                          ? "bg-yellow-100 text-yellow-800"
                          : property.statut === "Refusée"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {property.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/property/${property.id}/view`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/property/${property.id}/edit`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        {property.statut === "En attente" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-500 hover:text-green-700"
                              onClick={() => handleValidate(property.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleReject(property.id)}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {property.statut === "Publiée" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-orange-500 hover:text-orange-700"
                            onClick={() => handleSuspend(property.id)}
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            if (confirm("Êtes-vous sûr de vouloir supprimer cette propriété ?")) {
                              console.log("Supprimer propriété", property.id)
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

