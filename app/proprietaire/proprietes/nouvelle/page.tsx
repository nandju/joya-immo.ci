"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Check, Upload, X } from "lucide-react"
import Header from "@/components/header"

const steps = [
  "Informations Générales",
  "Détails des Pièces",
  "Équipements",
  "Galerie d'Images",
  "Planning de Visite"
]

export default function NewPropertyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  
  const [formData, setFormData] = useState({
    // Étape 1
    type: "",
    commune: "",
    locationVague: "",
    prix: "",
    superficie: "",
    statut: "",
    description: "",
    
    // Étape 2
    nombrePieces: "",
    pieces: {
      doucheVisiteurs: false,
      douchePrincipale: false,
      doucheExterne: false,
      cuisine: false,
      salon: false,
      chambre: false,
      bureau: false,
      garage: false,
      balcon: false,
      jardinet: false
    },
    
    // Étape 3
    equipements: {
      ecoleProximite: false,
      facileAcces: false,
      marcheProximite: false,
      boulangerieProximite: false,
      parcProximite: false,
      parking: false,
      internetRapide: false,
      chauffageCentral: false,
      climatisation: false,
      piscine: false,
      jardin: false,
      securite: false
    },
    
    // Étape 4
    images: [] as string[],
    
    // Étape 5
    dureeVisite: "30",
    heuresOuverture: { debut: "09:00", fin: "18:00" },
    joursFermes: [] as string[]
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted", formData)
    // Envoyer les données au serveur
    router.push("/proprietaire/dashboard")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Gérer l'upload d'images
    console.log("Images uploaded", e.target.files)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      index + 1 <= currentStep
                        ? "bg-[#252525] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index + 1 < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <span
                    className={`mt-2 text-xs text-center ${
                      index + 1 <= currentStep ? "text-[#252525] font-medium" : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      index + 1 < currentStep ? "bg-[#252525]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-200">
          {/* Step 1: Informations Générales */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#252525] mb-6">Informations Générales</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de propriété *
                  </label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maison">Maison</SelectItem>
                      <SelectItem value="Appartement">Appartement</SelectItem>
                      <SelectItem value="Bureau">Bureau</SelectItem>
                      <SelectItem value="Magasin">Magasin</SelectItem>
                      <SelectItem value="Local commercial">Local commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commune *
                  </label>
                  <Select value={formData.commune} onValueChange={(value) => setFormData({...formData, commune: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une commune" />
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation vague *
                  </label>
                  <Input
                    value={formData.locationVague}
                    onChange={(e) => setFormData({...formData, locationVague: e.target.value})}
                    placeholder="Région ou arrondissement"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix (FCFA) *
                  </label>
                  <Input
                    type="number"
                    value={formData.prix}
                    onChange={(e) => setFormData({...formData, prix: e.target.value})}
                    placeholder="150000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Superficie (m²)
                  </label>
                  <Input
                    type="number"
                    value={formData.superficie}
                    onChange={(e) => setFormData({...formData, superficie: e.target.value})}
                    placeholder="250"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut *
                  </label>
                  <Select value={formData.statut} onValueChange={(value) => setFormData({...formData, statut: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="À vendre">À vendre</SelectItem>
                      <SelectItem value="À louer">À louer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description courte (max 500 caractères) *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Description de la propriété..."
                  maxLength={500}
                  className="min-h-[120px]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/500 caractères
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Détails des Pièces */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#252525] mb-6">Détails des Pièces</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre total de pièces *
                </label>
                <Input
                  type="number"
                  value={formData.nombrePieces}
                  onChange={(e) => setFormData({...formData, nombrePieces: e.target.value})}
                  placeholder="5"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#252525] mb-4">Types de pièces disponibles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData.pieces).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setFormData({
                          ...formData,
                          pieces: {...formData.pieces, [key]: e.target.checked}
                        })}
                        className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                      />
                      <span className="text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Équipements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#252525] mb-6">Équipements et Avantages</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.ecoleProximite}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, ecoleProximite: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">École à proximité</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.facileAcces}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, facileAcces: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Facile d'accès</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.marcheProximite}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, marcheProximite: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Marché à proximité</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.boulangerieProximite}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, boulangerieProximite: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Boulangerie à proximité</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.parcProximite}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, parcProximite: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Parc à proximité</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.parking}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, parking: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Parking disponible</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.internetRapide}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, internetRapide: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Accès internet rapide</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.chauffageCentral}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, chauffageCentral: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Chauffage central</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.climatisation}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, climatisation: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Climatisation</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.piscine}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, piscine: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Piscine</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.jardin}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, jardin: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Jardin</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipements.securite}
                    onChange={(e) => setFormData({
                      ...formData,
                      equipements: {...formData.equipements, securite: e.target.checked}
                    })}
                    className="w-5 h-5 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                  />
                  <span className="text-gray-700">Sécurité (gardien/alarme)</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Galerie d'Images */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#252525] mb-6">Galerie d'Images (Extérieur uniquement)</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Glissez-déposez vos images ici ou cliquez pour sélectionner</p>
                <p className="text-sm text-gray-500 mb-4">Minimum 3 images, Maximum 15 images (JPG, PNG - max 5MB)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    Sélectionner des images
                  </Button>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-video bg-gray-200 rounded-lg"></div>
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => {
                          const newImages = [...formData.images]
                          newImages.splice(index, 1)
                          setFormData({...formData, images: newImages})
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Planning de Visite */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#252525] mb-6">Planning de Visite</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée standard d'une visite (minutes) *
                </label>
                <Input
                  type="number"
                  value={formData.dureeVisite}
                  onChange={(e) => setFormData({...formData, dureeVisite: e.target.value})}
                  placeholder="30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure d'ouverture *
                  </label>
                  <Input
                    type="time"
                    value={formData.heuresOuverture.debut}
                    onChange={(e) => setFormData({
                      ...formData,
                      heuresOuverture: {...formData.heuresOuverture, debut: e.target.value}
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure de fermeture *
                  </label>
                  <Input
                    type="time"
                    value={formData.heuresOuverture.fin}
                    onChange={(e) => setFormData({
                      ...formData,
                      heuresOuverture: {...formData.heuresOuverture, fin: e.target.value}
                    })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jours fermés (dates non disponibles)
                </label>
                <Input
                  type="date"
                  onChange={(e) => {
                    if (e.target.value && !formData.joursFermes.includes(e.target.value)) {
                      setFormData({
                        ...formData,
                        joursFermes: [...formData.joursFermes, e.target.value]
                      })
                    }
                  }}
                />
                {formData.joursFermes.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.joursFermes.map((date, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                      >
                        {date}
                        <button
                          type="button"
                          onClick={() => {
                            const newDays = formData.joursFermes.filter((_, i) => i !== index)
                            setFormData({...formData, joursFermes: newDays})
                          }}
                          className="ml-2 text-gray-500 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>

            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  console.log("Saved as draft")
                  router.push("/proprietaire/dashboard")
                }}
                className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
              >
                Brouillon
              </Button>

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#252525] hover:bg-[#A07539] text-white"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#252525] hover:bg-[#A07539] text-white"
                >
                  Terminer et publier
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

