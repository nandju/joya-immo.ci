"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Home, Calendar, TrendingUp, BarChart3, FileText, AlertTriangle, Shield, Settings, MessageSquare } from "lucide-react"
import Navbar from "@/components/navbar"

// Mock data
const stats = {
  totalUsers: 245,
  totalProperties: 158,
  publishedProperties: 142,
  pendingProperties: 12,
  rejectedProperties: 4,
  totalReservations: 89,
  pendingReservations: 15,
  confirmedReservations: 60,
  cancelledReservations: 14,
  totalFeedbacks: 234,
  reports: 8,
  monthlyRevenue: 12500000
}

const alerts = [
  { id: 1, type: "property", message: "12 propriétés en attente de validation", priority: "high", link: "/admin/properties?status=pending" },
  { id: 2, type: "report", message: "8 signalements nécessitent votre attention", priority: "high", link: "/admin/moderation" },
  { id: 3, type: "reservation", message: "3 réservations en conflit", priority: "medium", link: "/admin/reservations?status=conflict" },
]

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-gray-600">Vue d'ensemble de la plateforme Joya Immobilier</p>
        </div>

        {/* Alertes Prioritaires */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-yellow-800">Alertes Prioritaires</h3>
              </div>
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <Link key={alert.id} href={alert.link} className="block text-yellow-700 hover:text-yellow-900 hover:underline">
                    • {alert.message}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/utilisateurs">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#A07539]" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.totalUsers}</h3>
              <p className="text-sm text-gray-600">Utilisateurs totaux</p>
            </div>
          </Link>

          <Link href="/admin/properties">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-[#A07539]" />
                </div>
                {stats.pendingProperties > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {stats.pendingProperties}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.totalProperties}</h3>
              <p className="text-sm text-gray-600">Propriétés ({stats.pendingProperties} en attente)</p>
            </div>
          </Link>

          <Link href="/admin/reservations">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#A07539]" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.totalReservations}</h3>
              <p className="text-sm text-gray-600">Réservations (ce mois)</p>
            </div>
          </Link>

          <Link href="/admin/moderation">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#EADD8E]/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#A07539]" />
                </div>
                {stats.reports > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {stats.reports}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#252525] mb-1">{stats.reports}</h3>
              <p className="text-sm text-gray-600">Signalements</p>
            </div>
          </Link>
        </div>

        {/* Stats détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Propriétés par statut */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-[#252525] mb-4">Propriétés par Statut</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Publiées</span>
                <span className="font-semibold text-green-600">{stats.publishedProperties}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">En attente</span>
                <span className="font-semibold text-yellow-600">{stats.pendingProperties}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Refusées</span>
                <span className="font-semibold text-red-600">{stats.rejectedProperties}</span>
              </div>
            </div>
            <Link href="/admin/properties">
              <Button variant="outline" className="w-full mt-4 border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                Voir toutes les propriétés
              </Button>
            </Link>
          </div>

          {/* Réservations par statut */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-[#252525] mb-4">Réservations par Statut</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">En attente</span>
                <span className="font-semibold text-yellow-600">{stats.pendingReservations}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Confirmées</span>
                <span className="font-semibold text-green-600">{stats.confirmedReservations}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Annulées</span>
                <span className="font-semibold text-red-600">{stats.cancelledReservations}</span>
              </div>
            </div>
            <Link href="/admin/reservations">
              <Button variant="outline" className="w-full mt-4 border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                Voir toutes les réservations
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/utilisateurs">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <Users className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Gestion des Utilisateurs</h3>
              <p className="text-gray-600">Gérer les utilisateurs et leurs permissions</p>
            </div>
          </Link>

          <Link href="/admin/properties">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <Home className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Gestion des Propriétés</h3>
              <p className="text-gray-600">Valider et gérer les propriétés</p>
            </div>
          </Link>

          <Link href="/admin/reservations">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <Calendar className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Gestion des Réservations</h3>
              <p className="text-gray-600">Suivre toutes les réservations</p>
            </div>
          </Link>

          <Link href="/admin/feedback">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <FileText className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Gestion des Avis</h3>
              <p className="text-gray-600">Modérer les avis et commentaires</p>
            </div>
          </Link>

          <Link href="/admin/moderation">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <Shield className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Modération & Sécurité</h3>
              <p className="text-gray-600">Gérer les signalements</p>
            </div>
          </Link>

          <Link href="/admin/settings">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <Settings className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Paramètres Système</h3>
              <p className="text-gray-600">Configurer la plateforme</p>
            </div>
          </Link>

          <Link href="/admin/logs">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <BarChart3 className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Logs & Audit</h3>
              <p className="text-gray-600">Historique des actions</p>
            </div>
          </Link>

          <Link href="/admin/communication">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <MessageSquare className="w-8 h-8 text-[#A07539] mb-4" />
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Communication</h3>
              <p className="text-gray-600">Messages et notifications</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
