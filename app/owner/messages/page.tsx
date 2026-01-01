"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Inbox } from "lucide-react"
import Navbar from "@/components/navbar"

const conversations = [
  { id: 1, contact: "Marie Martin", propriete: "Villa moderne", lastMessage: "Quelle est la superficie exacte ?", date: "2024-02-15", unread: true },
  { id: 2, contact: "Paul Kouassi", propriete: "Appartement F3", lastMessage: "Merci pour la visite !", date: "2024-02-14", unread: false },
]

export default function OwnerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-2">Mes Messages</h1>
          <p className="text-gray-600">Communiquez avec vos visiteurs</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
            {/* Conversations List */}
            <div className="border-r border-gray-200 overflow-y-auto">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-[#252525] flex items-center">
                  <Inbox className="w-5 h-5 mr-2" />
                  Conversations
                </h2>
              </div>
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation === conv.id ? "bg-[#EADD8E]/20" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[#252525]">{conv.contact}</h3>
                    {conv.unread && <span className="w-2 h-2 bg-[#A07539] rounded-full"></span>}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.propriete}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">{conv.date}</p>
                </div>
              ))}
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-[#252525]">
                  {conversations.find(c => c.id === selectedConversation)?.contact}
                </h3>
                <p className="text-sm text-gray-600">
                  {conversations.find(c => c.id === selectedConversation)?.propriete}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm text-gray-700">Bonjour, j'aimerais en savoir plus sur cette propriété.</p>
                    <p className="text-xs text-gray-500 mt-1">10:30</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-[#EADD8E] rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm text-[#252525]">Bien sûr ! Que souhaitez-vous savoir ?</p>
                    <p className="text-xs text-[#252525]/70 mt-1">10:32</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    className="flex-1 min-h-[60px]"
                  />
                  <Button className="bg-[#252525] hover:bg-[#A07539] text-white">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

