"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, AlertTriangle, User, TrendingUp, Home, MessageSquare, FileText, Eye, Clock, Star, CheckCircle, XCircle } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock stats
const stats = {
  favorites: 5,
  reservations: 8,
  pendingReservations: 2,
  completedVisits: 6,
  reports: 1,
  activeProperties: 142,
  messagesNonLus: 3,
  consultationsRecentes: 12
}

const recentReservations = [
  { id: 1, propriete: "Villa moderne", date: "2024-02-25", heure: "14:00", statut: "Confirmée", proprieteId: 1 },
  { id: 2, propriete: "Appartement F3", date: "2024-02-20", heure: "10:00", statut: "Effectuée", proprieteId: 2 },
  { id: 3, propriete: "Bureau commercial", date: "2024-02-28", heure: "16:00", statut: "En attente", proprieteId: 3 },
]

const recentConsultations = [
  { id: 1, propriete: "Villa moderne", date: "2024-02-26", image: "/assets/images/illustrations/page-properties/items-1.jpg", proprieteId: 1 },
  { id: 2, propriete: "Appartement F3", date: "2024-02-25", image: "/assets/images/illustrations/page-properties/items-2.jpg", proprieteId: 2 },
  { id: 3, propriete: "Bureau commercial", date: "2024-02-24", image: "/assets/images/illustrations/page-properties/items-3.jpg", proprieteId: 3 },
]

const recentMessages = [
  { id: 1, propriete: "Villa moderne", proprietaire: "Jean D.", message: "Merci pour votre intérêt...", date: "2024-02-26", nonLu: true, proprieteId: 1 },
  { id: 2, propriete: "Appartement F3", proprietaire: "Marie M.", message: "La visite est confirmée", date: "2024-02-25", nonLu: false, proprieteId: 2 },
]

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">
            Mon Tableau de Bord
          </h1>
          <p className="text-gray-600">Bienvenue, consultez vos activités et gérez votre compte</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/user/favorites">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#A07539]" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.favorites}</h3>
              <p className="text-sm text-gray-600">Propriétés favorites</p>
            </div>
          </Link>

          <Link href="/user/history">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#A07539]" />
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                  {stats.pendingReservations}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.reservations}</h3>
              <p className="text-sm text-gray-600">Réservations totales</p>
            </div>
          </Link>

          <Link href="/user/history">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#A07539]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.consultationsRecentes}</h3>
              <p className="text-sm text-gray-600">Consultations récentes</p>
            </div>
          </Link>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-[#A07539]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.completedVisits}</h3>
            <p className="text-sm text-gray-600">Visites effectuées</p>
          </div>

          <Link href="/user/report">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[#A07539]" />
                </div>
                {stats.reports > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                    {stats.reports}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.reports}</h3>
              <p className="text-sm text-gray-600">Signalements envoyés</p>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Reservations */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#252525]">Réservations Récentes</h2>
              <Link href="/user/history">
                <Button variant="outline" size="sm" className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                  Voir tout
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentReservations.map((reservation) => (
                <Link key={reservation.id} href={`/properties/${reservation.proprieteId}`}>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <p className="font-medium text-[#252525]">{reservation.propriete}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(reservation.date).toLocaleDateString('fr-FR')}</span>
                        {reservation.heure && (
                          <>
                            <span>•</span>
                            <Clock className="w-3 h-3" />
                            <span>{reservation.heure}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      reservation.statut === "Confirmée" ? "bg-blue-100 text-blue-800" :
                      reservation.statut === "Effectuée" ? "bg-green-100 text-green-800" :
                      reservation.statut === "En attente" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {reservation.statut}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#252525] flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Messages Récents
              </h2>
              {stats.messagesNonLus > 0 && (
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                  {stats.messagesNonLus} nouveau(x)
                </span>
              )}
            </div>
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <Link key={msg.id} href={`/properties/${msg.proprieteId}`}>
                  <div className={`p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                    msg.nonLu ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                  }`}>
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <p className="font-medium text-[#252525] text-sm">{msg.propriete}</p>
                        <p className="text-xs text-gray-600">{msg.proprietaire}</p>
                      </div>
                      {msg.nonLu && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 mt-1">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(msg.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Consultations */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#252525] flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Consultations Récentes
              </h2>
            </div>
            <div className="space-y-3">
              {recentConsultations.map((consultation) => (
                <Link key={consultation.id} href={`/properties/${consultation.proprieteId}`}>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={consultation.image}
                        alt={consultation.propriete}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#252525] text-sm truncate">{consultation.propriete}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(consultation.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/user/profile">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <User className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Mon Profil</h3>
              <p className="text-gray-600 text-sm">Gérer vos informations personnelles</p>
            </div>
          </Link>

          <Link href="/user/favorites">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <Heart className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Mes Favoris</h3>
              <p className="text-gray-600 text-sm">Vos propriétés favorites ({stats.favorites})</p>
            </div>
          </Link>

          <Link href="/user/history">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <Calendar className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Historique</h3>
              <p className="text-gray-600 text-sm">Vos réservations et visites</p>
            </div>
          </Link>

          <Link href="/user/report">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <AlertTriangle className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Signaler</h3>
              <p className="text-gray-600 text-sm">Signaler un problème</p>
            </div>
          </Link>
        </div>

        {/* Activity Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-[#252525] mb-4">Résumé d'Activité</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-[#252525] mb-1">{stats.completedVisits}</p>
              <p className="text-sm text-gray-600">Visites complétées</p>
              <p className="text-xs text-gray-500 mt-2">Taux de conversion: {Math.round((stats.completedVisits / stats.reservations) * 100)}%</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-[#252525] mb-1">{stats.pendingReservations}</p>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-xs text-gray-500 mt-2">En cours de traitement</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-[#252525] mb-1">{stats.activeProperties}</p>
              <p className="text-sm text-gray-600">Propriétés disponibles</p>
              <p className="text-xs text-gray-500 mt-2">Sur la plateforme</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

