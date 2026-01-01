"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Plus, Trash2, Save } from "lucide-react"
import Navbar from "@/components/navbar"

export default function AdminSettingsPage() {
  const [propertyTypes, setPropertyTypes] = useState(["Maison", "Appartement", "Bureau", "Magasin"])
  const [communes, setCommunes] = useState(["Cocody", "Abobo", "Marcory", "Yopougon", "Plateau", "Adjamé"])
  const [amenities, setAmenities] = useState([
    "École à proximité",
    "Facile d'accès",
    "Marché à proximité",
    "Parking disponible",
    "Climatisation"
  ])
  const [newPropertyType, setNewPropertyType] = useState("")
  const [newCommune, setNewCommune] = useState("")
  const [newAmenity, setNewAmenity] = useState("")

  const handleAddPropertyType = () => {
    if (newPropertyType && !propertyTypes.includes(newPropertyType)) {
      setPropertyTypes([...propertyTypes, newPropertyType])
      setNewPropertyType("")
    }
  }

  const handleRemovePropertyType = (type: string) => {
    setPropertyTypes(propertyTypes.filter(t => t !== type))
  }

  const handleAddCommune = () => {
    if (newCommune && !communes.includes(newCommune)) {
      setCommunes([...communes, newCommune])
      setNewCommune("")
    }
  }

  const handleRemoveCommune = (commune: string) => {
    setCommunes(communes.filter(c => c !== commune))
  }

  const handleAddAmenity = () => {
    if (newAmenity && !amenities.includes(newAmenity)) {
      setAmenities([...amenities, newAmenity])
      setNewAmenity("")
    }
  }

  const handleRemoveAmenity = (amenity: string) => {
    setAmenities(amenities.filter(a => a !== amenity))
  }

  const handleSave = () => {
    console.log("Sauvegarder les paramètres", { propertyTypes, communes, amenities })
    alert("Paramètres sauvegardés avec succès")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-[#A07539]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#252525]">Paramètres Système</h1>
          </div>
          <p className="text-gray-600">Gérer les configurations et listes de la plateforme</p>
        </div>

        {/* Property Types */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-[#252525] mb-4">Types de Propriétés</h2>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Nouveau type de propriété"
              value={newPropertyType}
              onChange={(e) => setNewPropertyType(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddPropertyType()}
              className="flex-1"
            />
            <Button onClick={handleAddPropertyType} className="bg-[#252525] hover:bg-[#A07539] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <div key={type} className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2">
                <span className="text-[#252525]">{type}</span>
                <button
                  onClick={() => handleRemovePropertyType(type)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Communes */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-[#252525] mb-4">Communes / Zones</h2>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Nouvelle commune"
              value={newCommune}
              onChange={(e) => setNewCommune(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCommune()}
              className="flex-1"
            />
            <Button onClick={handleAddCommune} className="bg-[#252525] hover:bg-[#A07539] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {communes.map((commune) => (
              <div key={commune} className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2">
                <span className="text-[#252525]">{commune}</span>
                <button
                  onClick={() => handleRemoveCommune(commune)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-[#252525] mb-4">Avantages Prédéfinis</h2>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Nouvel avantage"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddAmenity()}
              className="flex-1"
            />
            <Button onClick={handleAddAmenity} className="bg-[#252525] hover:bg-[#A07539] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => (
              <div key={amenity} className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2">
                <span className="text-[#252525]">{amenity}</span>
                <button
                  onClick={() => handleRemoveAmenity(amenity)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Rules */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-[#252525] mb-4">Règles de Validation</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Validation automatique des propriétés</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Exiger vérification d'identité pour propriétaires</label>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Limite d'images par propriété</label>
              <Input type="number" defaultValue={15} className="w-24" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Taille max des images (MB)</label>
              <Input type="number" defaultValue={5} className="w-24" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-[#252525] mb-4">Paramètres de Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Notifications Email</label>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Notifications SMS</label>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Modèle de message de bienvenue</label>
              <Textarea
                defaultValue="Bienvenue sur Joya Immobilier !"
                className="w-full"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-[#252525] hover:bg-[#A07539] text-white px-8"
          >
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder les paramètres
          </Button>
        </div>
      </div>
    </div>
  )
}

