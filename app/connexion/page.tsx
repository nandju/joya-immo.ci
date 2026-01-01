"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      console.log("Login form submitted", formData)
      setIsSubmitting(false)
      // Rediriger vers le tableau de bord approprié
      // router.push('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-3">
              Connexion
            </h1>
            <p className="text-gray-600">
              Connectez-vous à votre compte Joya Immobilier
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={errors.email ? "border-red-500" : ""}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={errors.password ? "border-red-500" : ""}
                placeholder="Votre mot de passe"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                  className="w-4 h-4 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                />
                <span className="text-sm text-gray-700">Se souvenir de moi</span>
              </label>

              <Link
                href="/mot-de-passe-oublie"
                className="text-sm text-[#A07539] hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#252525] hover:bg-[#A07539] text-white py-6 text-lg font-semibold"
            >
              {isSubmitting ? "Connexion en cours..." : "Se connecter"}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Pas encore de compte ?{" "}
                <Link href="/inscription" className="text-[#A07539] hover:underline font-medium">
                  Créer un compte
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

