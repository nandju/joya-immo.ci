"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, FileText, Eye } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const logs = [
  { id: 1, action: "Validation propriété", user: "Admin", target: "Villa moderne", date: "2024-02-15 10:30", type: "property", ip: "192.168.1.1" },
  { id: 2, action: "Suspension utilisateur", user: "Admin", target: "Jean Dupont", date: "2024-02-15 09:15", type: "user", ip: "192.168.1.1" },
  { id: 3, action: "Modification propriété", user: "Admin", target: "Appartement F3", date: "2024-02-14 16:45", type: "property", ip: "192.168.1.1" },
  { id: 4, action: "Suppression feedback", user: "Admin", target: "Avis #123", date: "2024-02-14 14:20", type: "feedback", ip: "192.168.1.1" },
  { id: 5, action: "Réinitialisation mot de passe", user: "Admin", target: "marie@example.com", date: "2024-02-14 11:00", type: "user", ip: "192.168.1.1" },
  { id: 6, action: "Refus propriété", user: "Admin", target: "Maison traditionnelle", date: "2024-02-13 15:30", type: "property", ip: "192.168.1.1" },
]

export default function AdminLogsPage() {
  const [filteredLogs, setFilteredLogs] = useState(logs)
  const [filters, setFilters] = useState({
    type: "all",
    user: "all",
    search: ""
  })

  const handleFilter = () => {
    let filtered = [...logs]
    
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(l => l.type === filters.type)
    }
    if (filters.user && filters.user !== "all") {
      filtered = filtered.filter(l => l.user === filters.user)
    }
    if (filters.search) {
      filtered = filtered.filter(l => 
        l.action.toLowerCase().includes(filters.search.toLowerCase()) ||
        l.target.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    setFilteredLogs(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-[#A07539]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#252525]">Logs & Audit</h1>
          </div>
          <p className="text-gray-600">Historique de toutes les actions administratives</p>
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
              <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="property">Propriété</SelectItem>
                  <SelectItem value="user">Utilisateur</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="reservation">Réservation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filters.user} onValueChange={(value) => setFilters({...filters, user: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les utilisateurs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les utilisateurs</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
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

        {/* Logs Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Heure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cible</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#252525]">{log.action}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.target}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        log.type === "property" ? "bg-blue-100 text-blue-800" :
                        log.type === "user" ? "bg-purple-100 text-purple-800" :
                        log.type === "feedback" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {log.type === "property" ? "Propriété" : log.type === "user" ? "Utilisateur" : log.type === "feedback" ? "Feedback" : "Réservation"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                        <Eye className="w-4 h-4" />
                      </Button>
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

