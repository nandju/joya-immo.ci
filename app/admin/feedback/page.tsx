"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Filter, Search, Trash2, Ban, CheckCircle, XCircle, FileText, Star } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const feedbacks = [
  { id: 1, visiteur: "Jean Dupont", propriete: "Villa moderne", date: "2024-02-15", commentaire: "Très belle propriété, bien située.", note: 5, statut: "Approuvé" },
  { id: 2, visiteur: "Marie Martin", propriete: "Appartement F3", date: "2024-02-10", commentaire: "Belle propriété mais...", note: 4, statut: "Approuvé" },
  { id: 3, visiteur: "Paul Kouassi", propriete: "Bureau commercial", date: "2024-02-08", commentaire: "Langage inapproprié...", note: 1, statut: "Signalé" },
  { id: 4, visiteur: "Sophie Diallo", propriete: "Maison traditionnelle", date: "2024-02-05", commentaire: "Excellent service !", note: 5, statut: "En attente" },
]

export default function AdminFeedbackPage() {
  const [filteredFeedbacks, setFilteredFeedbacks] = useState(feedbacks)
  const [filters, setFilters] = useState({
    statut: "all",
    propriete: "all",
    search: ""
  })

  const handleFilter = () => {
    let filtered = [...feedbacks]
    
    if (filters.statut && filters.statut !== "all") {
      filtered = filtered.filter(f => f.statut === filters.statut)
    }
    if (filters.propriete && filters.propriete !== "all") {
      filtered = filtered.filter(f => f.propriete === filters.propriete)
    }
    if (filters.search) {
      filtered = filtered.filter(f => 
        f.visiteur.toLowerCase().includes(filters.search.toLowerCase()) ||
        f.commentaire.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    setFilteredFeedbacks(filtered)
  }

  const handleApprove = (id: number) => {
    console.log("Approuver avis", id)
  }

  const handleReject = (id: number) => {
    if (confirm("Rejeter cet avis ?")) {
      console.log("Rejeter avis", id)
    }
  }

  const handleDelete = (id: number) => {
    if (confirm("Supprimer définitivement cet avis ?")) {
      console.log("Supprimer avis", id)
    }
  }

  const handleBlock = (id: number) => {
    if (confirm("Bloquer cet utilisateur ?")) {
      console.log("Bloquer utilisateur", id)
    }
  }

  const averageRating = feedbacks.reduce((acc, f) => acc + f.note, 0) / feedbacks.length

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">Gestion des Feedbacks</h1>
          <p className="text-gray-600">Modérer et gérer tous les avis et commentaires</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avis total</span>
              <FileText className="w-5 h-5 text-[#A07539]" />
            </div>
            <p className="text-3xl font-bold text-[#252525]">{feedbacks.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Note moyenne</span>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-[#252525]">{averageRating.toFixed(1)}/5</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">En attente</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                {feedbacks.filter(f => f.statut === "En attente").length}
              </span>
            </div>
            <p className="text-3xl font-bold text-[#252525]">{feedbacks.filter(f => f.statut === "En attente").length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Signalés</span>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                {feedbacks.filter(f => f.statut === "Signalé").length}
              </span>
            </div>
            <p className="text-3xl font-bold text-[#252525]">{feedbacks.filter(f => f.statut === "Signalé").length}</p>
          </div>
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
                  <SelectItem value="Approuvé">Approuvé</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Signalé">Signalé</SelectItem>
                  <SelectItem value="Suspendu">Suspendu</SelectItem>
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

            <Button
              onClick={handleFilter}
              className="w-full bg-[#252525] hover:bg-[#A07539] text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </div>

        {/* Feedbacks Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visiteur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propriété</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commentaire</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{feedback.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#252525]">{feedback.visiteur}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{feedback.propriete}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-semibold text-[#252525]">{feedback.note}/5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{feedback.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{feedback.commentaire}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        feedback.statut === "Approuvé"
                          ? "bg-green-100 text-green-800"
                          : feedback.statut === "En attente"
                          ? "bg-yellow-100 text-yellow-800"
                          : feedback.statut === "Signalé"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {feedback.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/feedback/${feedback.id}/details`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        {feedback.statut === "En attente" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-500 hover:text-green-700"
                              onClick={() => handleApprove(feedback.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleReject(feedback.id)}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {feedback.statut === "Signalé" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-orange-500 hover:text-orange-700"
                            onClick={() => handleBlock(feedback.id)}
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(feedback.id)}
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

