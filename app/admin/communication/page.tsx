"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Send, Mail, Bell, FileText } from "lucide-react"
import Navbar from "@/components/navbar"

export default function AdminCommunicationPage() {
  const [messageType, setMessageType] = useState("global")
  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSend = () => {
    console.log("Envoyer message", { messageType, recipient, subject, message })
    alert("Message envoyé avec succès")
    setSubject("")
    setMessage("")
    setRecipient("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-8 h-8 text-[#A07539]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#252525]">Communication & Notifications</h1>
          </div>
          <p className="text-gray-600">Envoyer des messages et gérer les notifications</p>
        </div>

        {/* Message Form */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-[#252525] mb-4">Envoyer un Message</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type de message</label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Message global (tous les utilisateurs)</SelectItem>
                  <SelectItem value="owners">Propriétaires uniquement</SelectItem>
                  <SelectItem value="visitors">Visiteurs uniquement</SelectItem>
                  <SelectItem value="individual">Message individuel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {messageType === "individual" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destinataire (Email)</label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
              <Input
                placeholder="Sujet du message"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <Textarea
                placeholder="Contenu du message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleSend}
              className="bg-[#252525] hover:bg-[#A07539] text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Envoyer
            </Button>
          </div>
        </div>

        {/* Notification Templates */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-[#252525] mb-4">Modèles de Messages</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-[#252525]">Message de bienvenue</h3>
                <Button variant="outline" size="sm">Modifier</Button>
              </div>
              <p className="text-sm text-gray-600">Bienvenue sur Joya Immobilier !</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-[#252525]">Propriété validée</h3>
                <Button variant="outline" size="sm">Modifier</Button>
              </div>
              <p className="text-sm text-gray-600">Votre propriété a été validée et publiée.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-[#252525]">Maintenance programmée</h3>
                <Button variant="outline" size="sm">Modifier</Button>
              </div>
              <p className="text-sm text-gray-600">Une maintenance est programmée le...</p>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-[#252525] mb-4">Alertes Système</h2>
          
          <div className="space-y-3">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex items-center mb-2">
                <Bell className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-800">12 propriétés en attente de validation</span>
              </div>
              <p className="text-sm text-yellow-700">Date: 2024-02-15</p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex items-center mb-2">
                <Bell className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-semibold text-red-800">8 signalements nécessitent votre attention</span>
              </div>
              <p className="text-sm text-red-700">Date: 2024-02-15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

