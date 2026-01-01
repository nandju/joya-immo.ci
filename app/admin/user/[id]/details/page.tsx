"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Ban, CheckCircle, Trash2, Key, FileText, Calendar, MessageSquare, Home, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const userDetails = {
  id: 1,
  nom: "Dupont",
  prenom: "Jean",
  email: "jean@example.com",
  type: "Propriétaire",
  statut: "Actif",
  dateInscription: "2024-01-15",
  telephone: "+225 07 12 34 56 78",
  adresse: "Cocody, Riviera",
  siret: "12345678901234",
  idType: "CNI",
  idNumber: "1234567890123",
  idVerified: true
}

const reservations = [
  { id: 1, propriete: "Villa moderne", date: "2024-02-15", statut: "Confirmée" },
  { id: 2, propriete: "Appartement F3", date: "2024-02-20", statut: "En attente" },
]

const properties = [
  { id: 1, nom: "Villa moderne", statut: "Publiée", dateCreation: "2024-02-10" },
  { id: 2, nom: "Appartement F3", statut: "En attente", dateCreation: "2024-02-15" },
]

export default function AdminUserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")

  const handleResetPassword = () => {
    if (newPassword) {
      console.log("Réinitialiser mot de passe", id, newPassword)
      alert("Mot de passe réinitialisé avec succès")
      setShowResetPassword(false)
      setNewPassword("")
    }
  }

  const handleSuspend = () => {
    if (confirm("Suspendre cet utilisateur ?")) {
      console.log("Suspendre utilisateur", id)
    }
  }

  const handleActivate = () => {
    if (confirm("Réactiver cet utilisateur ?")) {
      console.log("Réactiver utilisateur", id)
    }
  }

  const handleDelete = () => {
    if (confirm("Supprimer définitivement cet utilisateur ? Cette action est irréversible.")) {
      console.log("Supprimer utilisateur", id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/admin/utilisateurs" className="inline-flex items-center text-[#A07539] hover:text-[#252525] mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>

        {/* User Info */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#252525] mb-2">
                {userDetails.prenom} {userDetails.nom}
              </h1>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                  userDetails.type === "Propriétaire"
                    ? "bg-[#EADD8E] text-[#252525]"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {userDetails.type}
                </span>
                <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                  userDetails.statut === "Actif"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {userDetails.statut}
                </span>
                {userDetails.idVerified && (
                  <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                    Identité vérifiée
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {userDetails.statut === "Actif" ? (
                <Button variant="outline" onClick={handleSuspend} className="border-orange-500 text-orange-500 hover:bg-orange-50">
                  <Ban className="w-4 h-4 mr-2" />
                  Suspendre
                </Button>
              ) : (
                <Button variant="outline" onClick={handleActivate} className="border-green-500 text-green-500 hover:bg-green-50">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Réactiver
                </Button>
              )}
              <Button variant="outline" onClick={handleDelete} className="border-red-500 text-red-500 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#252525] mb-4">Informations Personnelles</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-[#252525] font-medium">{userDetails.email}</p>
                </div>
                {userDetails.telephone && (
                  <div>
                    <label className="text-sm text-gray-600">Téléphone</label>
                    <p className="text-[#252525] font-medium">{userDetails.telephone}</p>
                  </div>
                )}
                {userDetails.adresse && (
                  <div>
                    <label className="text-sm text-gray-600">Adresse</label>
                    <p className="text-[#252525] font-medium">{userDetails.adresse}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-gray-600">Date d'inscription</label>
                  <p className="text-[#252525] font-medium">{userDetails.dateInscription}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#252525] mb-4">Vérification d'Identité</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Type de pièce</label>
                  <p className="text-[#252525] font-medium">{userDetails.idType}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Numéro de pièce</label>
                  <p className="text-[#252525] font-medium">{userDetails.idNumber}</p>
                </div>
                {userDetails.siret && (
                  <div>
                    <label className="text-sm text-gray-600">SIRET/SIREN</label>
                    <p className="text-[#252525] font-medium">{userDetails.siret}</p>
                  </div>
                )}
                <div className="pt-4">
                  <Button variant="outline" className="w-full border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                    <FileText className="w-4 h-4 mr-2" />
                    Voir les pièces d'identité
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Password Reset */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            {!showResetPassword ? (
              <Button
                variant="outline"
                onClick={() => setShowResetPassword(true)}
                className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
              >
                <Key className="w-4 h-4 mr-2" />
                Réinitialiser le mot de passe
              </Button>
            ) : (
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleResetPassword}
                  className="bg-[#252525] hover:bg-[#A07539] text-white"
                >
                  Confirmer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowResetPassword(false)
                    setNewPassword("")
                  }}
                >
                  Annuler
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Properties */}
        {userDetails.type === "Propriétaire" && (
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#252525] flex items-center gap-2">
                <Home className="w-5 h-5" />
                Propriétés ({properties.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date création</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property.id}>
                      <td className="px-4 py-3 text-sm font-medium text-[#252525]">{property.nom}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                          property.statut === "Publiée" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {property.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{property.dateCreation}</td>
                      <td className="px-4 py-3 text-sm">
                        <Link href={`/admin/property/${property.id}/view`}>
                          <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                            Voir
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reservations */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#252525] flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Réservations ({reservations.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Propriété</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-4 py-3 text-sm font-medium text-[#252525]">{reservation.propriete}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{reservation.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                        reservation.statut === "Confirmée" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {reservation.statut}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link href={`/admin/reservation/${reservation.id}/details`}>
                        <Button variant="ghost" size="sm" className="text-[#A07539] hover:text-[#252525]">
                          Voir
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Messages (Read-only) */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#252525] flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Messages (Lecture seule)
            </h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Historique des messages (lecture seule)</p>
            <p className="text-sm mt-2">Les messages peuvent être consultés mais non modifiés</p>
          </div>
        </div>
      </div>
    </div>
  )
}

