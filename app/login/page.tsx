"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Lock, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!identifier.trim()) {
      newErrors.identifier = loginMethod === "email" ? "L'email est requis" : "Le numéro de téléphone est requis"
    } else if (loginMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      newErrors.identifier = "Email invalide"
    } else if (loginMethod === "phone" && !/^(\+225|0)[0-9]{9}$/.test(identifier.replace(/\s/g, ""))) {
      newErrors.identifier = "Format de téléphone invalide"
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Connexion", { loginMethod, identifier, password })
      // Redirection après connexion
      window.location.href = "/"
    }
  }

  const handleForgotPassword = (method: "email" | "phone") => {
    console.log("Réinitialisation par", method)
    alert(`Un lien de réinitialisation sera envoyé par ${method === "email" ? "email" : "SMS"}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#252525] mb-2">Connexion</h1>
            <p className="text-gray-600">Connectez-vous à votre compte</p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                loginMethod === "email"
                  ? "bg-[#252525] text-white shadow-md"
                  : "text-gray-600 hover:text-[#252525]"
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                loginMethod === "phone"
                  ? "bg-[#252525] text-white shadow-md"
                  : "text-gray-600 hover:text-[#252525]"
              }`}
            >
              <Phone className="w-4 h-4 inline mr-2" />
              Téléphone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {loginMethod === "email" ? "Email" : "Numéro de téléphone"}
              </label>
              <div className="relative">
                {loginMethod === "email" ? (
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                ) : (
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                )}
                <Input
                  type={loginMethod === "email" ? "email" : "tel"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={`pl-10 ${errors.identifier ? "border-red-500" : ""}`}
                  placeholder={loginMethod === "email" ? "votre@email.com" : "+225 07 12 34 56 78"}
                />
              </div>
              {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                  placeholder="Votre mot de passe"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="w-4 h-4 text-[#252525] border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Se souvenir de moi
                </label>
              </div>
              <button
                type="button"
                onClick={() => handleForgotPassword(loginMethod)}
                className="text-sm text-[#A07539] hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#252525] hover:bg-[#A07539] text-white py-6 text-lg"
            >
              Se connecter
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 mb-4">
              Vous n'avez pas de compte ?
            </p>
            <Link href="/signup">
              <Button variant="outline" className="w-full border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                Créer un compte
              </Button>
            </Link>
          </div>

          {/* Reset Password Options */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-3">Réinitialiser le mot de passe :</p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleForgotPassword("email")}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                size="sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                Par email
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleForgotPassword("phone")}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                size="sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Par SMS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
