"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Filter, Search, AlertTriangle, Ban, CheckCircle, XCircle, Shield, FileText } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const reports = [
  { id: 1, type: "property", objet: "Villa moderne", auteur: "Jean Dupont", signalePar: "Marie Martin", raison: "Prix suspect", date: "2024-02-15", statut: "En attente", priorite: "high" },
  { id: 2, type: "user", objet: "Paul Kouassi", auteur: "Visiteur", signalePar: "Sophie Diallo", raison: "Comportement inapproprié", date: "2024-02-14", statut: "En attente", priorite: "high" },
  { id: 3, type: "message", objet: "Message inapproprié", auteur: "Jean Bernard", signalePar: "Marie Martin", raison: "Langage offensant", date: "2024-02-13", statut: "Traité", priorite: "medium" },
  { id: 4, type: "property", objet: "Appartement F3", auteur: "Marie Martin", signalePar: "Paul Kouassi", raison: "Annonce frauduleuse", date: "2024-02-12", statut: "En attente", priorite: "high" },
]

export default function AdminModerationPage() {
  const [filteredReports, setFilteredReports] = useState(reports)
  const [filters, setFilters] = useState({
    type: "all",
    statut: "all",
    priorite: "all",
    search: ""
  })

  const handleFilter = () => {
    let filtered = [...reports]
    
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(r => r.type === filters.type)
    }
    if (filters.statut && filters.statut !== "all") {
      filtered = filtered.filter(r => r.statut === filters.statut)
    }
    if (filters.priorite && filters.priorite !== "all") {
      filtered = filtered.filter(r => r.priorite === filters.priorite)
    }
    if (filters.search) {
      filtered = filtered.filter(r => 
        r.objet.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.auteur.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    setFilteredReports(filtered)
  }

  const handleWarn = (id: number) => {
    const message = prompt("Message d'avertissement :")
    if (message) {
      console.log("Avertir utilisateur", id, message)
    }
  }

  const handleSuspend = (id: number) => {
    if (confirm("Suspendre cet utilisateur ?")) {
      console.log("Suspendre utilisateur", id)
    }
  }

  const handleResolve = (id: number) => {
    if (confirm("Marquer ce signalement comme traité ?")) {
      console.log("Traiter signalement", id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-[#A07539]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#252525]">Modération & Sécurité</h1>
          </div>
          <p className="text-gray-600">Gérer les signalements et assurer la sécurité de la plateforme</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Signalements en attente</span>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-[#252525]">
              {reports.filter(r => r.statut === "En attente").length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Signalements traités</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-[#252525]">
              {reports.filter(r => r.statut === "Traité").length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Priorité haute</span>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-[#252525]">
              {reports.filter(r => r.priorite === "high").length}
            </p>
          </div>
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
              <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="property">Annonce</SelectItem>
                  <SelectItem value="user">Utilisateur</SelectItem>
                  <SelectItem value="message">Message</SelectItem>
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
                  <SelectItem value="Traité">Traité</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filters.priorite} onValueChange={(value) => setFilters({...filters, priorite: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les priorités" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les priorités</SelectItem>
                  <SelectItem value="high">Haute</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Basse</SelectItem>
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

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Objet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auteur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Signalé par</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Raison</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priorité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.type === "property" ? "bg-blue-100 text-blue-800" :
                        report.type === "user" ? "bg-purple-100 text-purple-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {report.type === "property" ? "Annonce" : report.type === "user" ? "Utilisateur" : "Message"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#252525]">{report.objet}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.auteur}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.signalePar}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.raison}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.priorite === "high" ? "bg-red-100 text-red-800" :
                        report.priorite === "medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {report.priorite === "high" ? "Haute" : report.priorite === "medium" ? "Moyenne" : "Basse"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.statut === "Traité"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {report.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/report/${report.id}/details`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        {report.statut === "En attente" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-yellow-500 hover:text-yellow-700"
                              onClick={() => handleWarn(report.id)}
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-orange-500 hover:text-orange-700"
                              onClick={() => handleSuspend(report.id)}
                            >
                              <Ban className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-500 hover:text-green-700"
                              onClick={() => handleResolve(report.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
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

