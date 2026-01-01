"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const property = {
  id: 1,
  nom: "Villa moderne avec jardin",
  type: "Maison",
  commune: "Cocody",
  locationVague: "Riviera",
  prix: 150000000,
  rooms: 5,
  superficie: 250,
  description: "Magnifique villa moderne avec jardin spacieux, située dans un quartier calme. Parfait pour une famille. Tous les équipements modernes inclus.",
}

export default function AdminPropertyEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [formData, setFormData] = useState(property)

  const handleSave = () => {
    console.log("Sauvegarder modifications", formData)
    alert("Propriété modifiée avec succès")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href={`/admin/property/${id}/view`} className="inline-flex items-center text-[#A07539] hover:text-[#252525] mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Link>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-[#252525] mb-6">Modifier la Propriété</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la propriété</label>
              <Input
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maison">Maison</SelectItem>
                    <SelectItem value="Appartement">Appartement</SelectItem>
                    <SelectItem value="Bureau">Bureau</SelectItem>
                    <SelectItem value="Magasin">Magasin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commune</label>
                <Select value={formData.commune} onValueChange={(value) => setFormData({...formData, commune: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cocody">Cocody</SelectItem>
                    <SelectItem value="Abobo">Abobo</SelectItem>
                    <SelectItem value="Marcory">Marcory</SelectItem>
                    <SelectItem value="Yopougon">Yopougon</SelectItem>
                    <SelectItem value="Plateau">Plateau</SelectItem>
                    <SelectItem value="Adjamé">Adjamé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Localisation vague</label>
              <Input
                value={formData.locationVague}
                onChange={(e) => setFormData({...formData, locationVague: e.target.value})}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix (FCFA)</label>
                <Input
                  type="number"
                  value={formData.prix}
                  onChange={(e) => setFormData({...formData, prix: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de pièces</label>
                <Input
                  type="number"
                  value={formData.rooms}
                  onChange={(e) => setFormData({...formData, rooms: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Superficie (m²)</label>
                <Input
                  type="number"
                  value={formData.superficie}
                  onChange={(e) => setFormData({...formData, superficie: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full"
                rows={6}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <Link href={`/admin/property/${id}/view`}>
                <Button variant="outline" className="border-gray-300">
                  Annuler
                </Button>
              </Link>
              <Button
                onClick={handleSave}
                className="bg-[#252525] hover:bg-[#A07539] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

