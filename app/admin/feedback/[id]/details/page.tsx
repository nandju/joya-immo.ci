"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, User, Home, CheckCircle, XCircle, Ban, Trash2 } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const feedback = {
  id: 3,
  visiteur: "Paul Kouassi",
  visiteurEmail: "paul@example.com",
  propriete: "Bureau commercial",
  proprieteId: 3,
  proprietaire: "Marie Martin",
  date: "2024-02-08",
  note: 1,
  commentaire: "Langage inapproprié et comportement suspect du propriétaire. Je ne recommande pas cette propriété.",
  statut: "Signalé",
  dateCreation: "2024-02-08"
}

export default function AdminFeedbackDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const handleApprove = () => {
    if (confirm("Approuver cet avis ?")) {
      console.log("Approuver avis", id)
    }
  }

  const handleReject = () => {
    if (confirm("Rejeter cet avis ?")) {
      console.log("Rejeter avis", id)
    }
  }

  const handleBlock = () => {
    if (confirm("Bloquer cet utilisateur ?")) {
      console.log("Bloquer utilisateur", id)
    }
  }

  const handleDelete = () => {
    if (confirm("Supprimer définitivement cet avis ?")) {
      console.log("Supprimer avis", id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/admin/feedback" className="inline-flex items-center text-[#A07539] hover:text-[#252525] mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Feedback Info */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-[#252525]">Détails de l'Avis</h1>
                <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
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
              </div>

              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Note :</span>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < feedback.note
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-[#252525]">{feedback.note}/5</span>
                </div>

                {/* Comment */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Commentaire</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{feedback.commentaire}</p>
                  </div>
                </div>

                {/* Property Info */}
                <div className="flex items-start">
                  <Home className="w-5 h-5 text-[#A07539] mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Propriété</p>
                    <Link href={`/admin/property/${feedback.proprieteId}/view`} className="text-lg font-semibold text-[#A07539] hover:underline">
                      {feedback.propriete}
                    </Link>
                    <p className="text-sm text-gray-500">Propriétaire : {feedback.proprietaire}</p>
                  </div>
                </div>

                {/* Visitor Info */}
                <div className="flex items-start">
                  <User className="w-5 h-5 text-[#A07539] mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Visiteur</p>
                    <p className="text-lg font-semibold text-[#252525]">{feedback.visiteur}</p>
                    <p className="text-sm text-gray-500">{feedback.visiteurEmail}</p>
                    <Link href={`/admin/user/2/details`} className="text-sm text-[#A07539] hover:underline">
                      Voir le profil
                    </Link>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <p className="text-sm text-gray-600">Date de publication</p>
                  <p className="text-[#252525] font-medium">{feedback.date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Actions</h2>
              
              <div className="space-y-3">
                {feedback.statut === "En attente" && (
                  <>
                    <Button
                      onClick={handleApprove}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approuver
                    </Button>
                    <Button
                      onClick={handleReject}
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeter
                    </Button>
                  </>
                )}
                
                {feedback.statut === "Signalé" && (
                  <Button
                    onClick={handleBlock}
                    variant="outline"
                    className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Bloquer l'utilisateur
                  </Button>
                )}

                <Button
                  onClick={handleDelete}
                  variant="outline"
                  className="w-full border-red-500 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#252525] mb-4">Informations</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">ID Avis</p>
                  <p className="text-[#252525] font-medium">{feedback.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date de création</p>
                  <p className="text-[#252525] font-medium">{feedback.dateCreation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

