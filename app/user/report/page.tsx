"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, ArrowLeft, Send } from "lucide-react"
import Navbar from "@/components/navbar"

export default function ReportPage() {
  const [reportData, setReportData] = useState({
    type: "",
    propertyId: "",
    reason: "",
    comment: ""
  })

  const reasons = [
    "Prix suspect",
    "Annonce frauduleuse",
    "Information incorrecte",
    "Image inappropriée",
    "Contact suspect",
    "Autre"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signalement", reportData)
    alert("Signalement envoyé. Merci pour votre contribution.")
    // Reset form
    setReportData({ type: "", propertyId: "", reason: "", comment: "" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/properties" className="inline-flex items-center text-[#A07539] hover:text-[#252525] mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Link>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#252525]">Signaler un problème</h1>
              <p className="text-gray-600">Aidez-nous à maintenir la qualité de la plateforme</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de signalement <span className="text-red-500">*</span>
              </label>
              <Select value={reportData.type} onValueChange={(value) => setReportData({...reportData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="property">Annonce suspecte</SelectItem>
                  <SelectItem value="user">Utilisateur suspect</SelectItem>
                  <SelectItem value="message">Message inapproprié</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {reportData.type === "property" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID de la propriété <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={reportData.propertyId}
                  onChange={(e) => setReportData({...reportData, propertyId: e.target.value})}
                  placeholder="ID de la propriété"
                  required={reportData.type === "property"}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motif <span className="text-red-500">*</span>
              </label>
              <Select value={reportData.reason} onValueChange={(value) => setReportData({...reportData, reason: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un motif" />
                </SelectTrigger>
                <SelectContent>
                  {reasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commentaire <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={reportData.comment}
                onChange={(e) => setReportData({...reportData, comment: e.target.value})}
                placeholder="Décrivez le problème en détail..."
                rows={6}
                required
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-500">
                Plus vous fournissez de détails, plus nous pourrons traiter rapidement votre signalement.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note :</strong> Votre signalement sera traité par notre équipe de modération. 
                Vous recevrez une notification une fois le traitement terminé.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="/properties" className="flex-1">
                <Button type="button" variant="outline" className="w-full border-gray-300">
                  Annuler
                </Button>
              </Link>
              <Button
                type="submit"
                className="flex-1 bg-[#252525] hover:bg-[#A07539] text-white"
                disabled={!reportData.type || !reportData.reason || !reportData.comment}
              >
                <Send className="w-4 h-4 mr-2" />
                Envoyer le signalement
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

