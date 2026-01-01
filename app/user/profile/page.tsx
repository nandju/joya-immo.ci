"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Phone, Lock, CheckCircle, XCircle, Bell, Trash2, Save } from "lucide-react"
import Navbar from "@/components/navbar"

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "account">("profile")
  const [profileData, setProfileData] = useState({
    nom: "Dupont",
    prenom: "Jean",
    email: "jean@example.com",
    telephone: "+225 07 12 34 56 78",
    emailVerified: true,
    phoneVerified: true
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    inApp: true
  })

  const handleSaveProfile = () => {
    console.log("Sauvegarder profil", profileData)
    alert("Profil mis à jour avec succès")
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }
    console.log("Changer mot de passe")
    alert("Mot de passe modifié avec succès")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleVerifyEmail = () => {
    console.log("Renvoyer code de vérification email")
    alert("Code de vérification envoyé à votre email")
  }

  const handleVerifyPhone = () => {
    console.log("Renvoyer code de vérification SMS")
    alert("Code de vérification envoyé par SMS")
  }

  const handleDeactivateAccount = () => {
    if (confirm("Êtes-vous sûr de vouloir désactiver votre compte ?")) {
      console.log("Désactiver compte")
    }
  }

  const handleDeleteAccount = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible.")) {
      console.log("Supprimer compte")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#252525] mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles et vos préférences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === "profile"
                      ? "bg-[#EADD8E] text-[#252525] font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === "security"
                      ? "bg-[#EADD8E] text-[#252525] font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Lock className="w-4 h-4 inline mr-2" />
                  Sécurité
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === "notifications"
                      ? "bg-[#EADD8E] text-[#252525] font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Bell className="w-4 h-4 inline mr-2" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === "account"
                      ? "bg-[#EADD8E] text-[#252525] font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Trash2 className="w-4 h-4 inline mr-2" />
                  Compte
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-[#252525] mb-6">Informations Personnelles</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      <Input
                        value={profileData.nom}
                        onChange={(e) => setProfileData({...profileData, nom: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                      <Input
                        value={profileData.prenom}
                        onChange={(e) => setProfileData({...profileData, prenom: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value, emailVerified: false})}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        {profileData.emailVerified ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">Email vérifié</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600">Email non vérifié</span>
                          </>
                        )}
                      </div>
                      {!profileData.emailVerified && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleVerifyEmail}
                          className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
                        >
                          Vérifier
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de téléphone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="tel"
                        value={profileData.telephone}
                        onChange={(e) => setProfileData({...profileData, telephone: e.target.value, phoneVerified: false})}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        {profileData.phoneVerified ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">Téléphone vérifié</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600">Téléphone non vérifié</span>
                          </>
                        )}
                      </div>
                      {!profileData.phoneVerified && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleVerifyPhone}
                          className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]"
                        >
                          Vérifier
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-[#252525] hover:bg-[#A07539] text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer les modifications
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-[#252525] mb-6">Sécurité</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="pl-10"
                        placeholder="Minimum 8 caractères"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <Button
                      onClick={handleChangePassword}
                      className="bg-[#252525] hover:bg-[#A07539] text-white"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Changer le mot de passe
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-[#252525] mb-6">Préférences de Notification</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-[#252525]">Notifications par Email</p>
                      <p className="text-sm text-gray-600">Recevoir des notifications par email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                      className="w-5 h-5 text-[#252525] border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-[#252525]">Notifications par SMS</p>
                      <p className="text-sm text-gray-600">Recevoir des notifications par SMS</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                      className="w-5 h-5 text-[#252525] border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-[#252525]">Notifications In-App</p>
                      <p className="text-sm text-gray-600">Recevoir des notifications dans l'application</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.inApp}
                      onChange={(e) => setNotifications({...notifications, inApp: e.target.checked})}
                      className="w-5 h-5 text-[#252525] border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => {
                        console.log("Sauvegarder préférences", notifications)
                        alert("Préférences sauvegardées")
                      }}
                      className="bg-[#252525] hover:bg-[#A07539] text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-2xl font-semibold text-[#252525] mb-6">Gestion du Compte</h2>
                
                <div className="space-y-6">
                  <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">Désactiver le compte</h3>
                    <p className="text-sm text-yellow-700 mb-4">
                      Votre compte sera désactivé et vous ne pourrez plus accéder à vos données. Vous pourrez le réactiver plus tard.
                    </p>
                    <Button
                      onClick={handleDeactivateAccount}
                      variant="outline"
                      className="border-yellow-500 text-yellow-700 hover:bg-yellow-100"
                    >
                      Désactiver mon compte
                    </Button>
                  </div>

                  <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Supprimer le compte</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                    </p>
                    <Button
                      onClick={handleDeleteAccount}
                      variant="outline"
                      className="border-red-500 text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer définitivement mon compte
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

