"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, AlertTriangle, User, TrendingUp, Home, MessageSquare, FileText } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock stats
const stats = {
  favorites: 5,
  reservations: 8,
  pendingReservations: 2,
  completedVisits: 6,
  reports: 1,
  activeProperties: 142
}

const recentReservations = [
  { id: 1, propriete: "Villa moderne", date: "2024-02-25", statut: "Confirmée" },
  { id: 2, propriete: "Appartement F3", date: "2024-02-20", statut: "Effectuée" },
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-[#252525]">{reservation.propriete}</p>
                    <p className="text-sm text-gray-600">{new Date(reservation.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    reservation.statut === "Confirmée" ? "bg-blue-100 text-blue-800" :
                    reservation.statut === "Effectuée" ? "bg-green-100 text-green-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {reservation.statut}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-[#252525] mb-4">Actions Rapides</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/properties">
                <Button variant="outline" className="w-full h-20 flex-col border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                  <Home className="w-6 h-6 mb-2" />
                  Explorer
                </Button>
              </Link>
              <Link href="/user/favorites">
                <Button variant="outline" className="w-full h-20 flex-col border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                  <Heart className="w-6 h-6 mb-2" />
                  Favoris
                </Button>
              </Link>
              <Link href="/user/history">
                <Button variant="outline" className="w-full h-20 flex-col border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                  <Calendar className="w-6 h-6 mb-2" />
                  Historique
                </Button>
              </Link>
              <Link href="/user/report">
                <Button variant="outline" className="w-full h-20 flex-col border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                  <AlertTriangle className="w-6 h-6 mb-2" />
                  Signaler
                </Button>
              </Link>
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

