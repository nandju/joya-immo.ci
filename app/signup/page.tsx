"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Lock, User, CheckCircle, AlertCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Image from "next/image"

export default function SignupPage() {
  const [step, setStep] = useState(1) // 1: Info, 2: Vérification email, 3: Vérification téléphone
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  })
  const [emailCode, setEmailCode] = useState("")
  const [phoneCode, setPhoneCode] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis"
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis"
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le numéro de téléphone est requis"
    } else if (!/^(\+225|0)[0-9]{9}$/.test(formData.telephone.replace(/\s/g, ""))) {
      newErrors.telephone = "Format invalide (ex: +225 07 12 34 56 78 ou 07 12 34 56 78)"
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Vous devez accepter les conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep1()) {
      // Simuler l'envoi des codes de vérification
      console.log("Envoi codes de vérification", formData)
      setStep(2)
    }
  }

  const handleEmailVerification = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailCode.length === 6) {
      console.log("Vérification email", emailCode)
      setStep(3)
    }
  }

  const handlePhoneVerification = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneCode.length === 6) {
      console.log("Vérification téléphone", phoneCode)
      // Inscription complète
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.")
      window.location.href = "/login"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="md:grid md:grid-cols-2">
            {/* Left side - Image */}
            <div className="hidden md:block bg-gradient-to-br from-[#252525] to-[#A07539] p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Rejoignez Joya Immobilier</h2>
                <p className="text-[#EADD8E] mb-8">Trouvez votre propriété idéale en quelques clics</p>
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" />
                    <span>Accès à toutes les propriétés</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" />
                    <span>Réservation de visites</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" />
                    <span>Notifications en temps réel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#252525] mb-2">Créer un compte</h1>
                <p className="text-gray-600">Tous les champs sont obligatoires</p>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${step >= 1 ? "text-[#A07539]" : "text-gray-400"}`}>
                    Informations
                  </span>
                  <span className={`text-sm font-medium ${step >= 2 ? "text-[#A07539]" : "text-gray-400"}`}>
                    Email
                  </span>
                  <span className={`text-sm font-medium ${step >= 3 ? "text-[#A07539]" : "text-gray-400"}`}>
                    Téléphone
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className={`flex-1 h-2 rounded ${step >= 1 ? "bg-[#A07539]" : "bg-gray-200"}`} />
                  <div className={`flex-1 h-2 rounded ${step >= 2 ? "bg-[#A07539]" : "bg-gray-200"}`} />
                  <div className={`flex-1 h-2 rounded ${step >= 3 ? "bg-[#A07539]" : "bg-gray-200"}`} />
                </div>
              </div>

              {/* Step 1: Informations */}
              {step === 1 && (
                <form onSubmit={handleStep1} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        value={formData.nom}
                        onChange={(e) => setFormData({...formData, nom: e.target.value})}
                        className={`pl-10 ${errors.nom ? "border-red-500" : ""}`}
                        placeholder="Votre nom"
                      />
                    </div>
                    {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        value={formData.prenom}
                        onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                        className={`pl-10 ${errors.prenom ? "border-red-500" : ""}`}
                        placeholder="Votre prénom"
                      />
                    </div>
                    {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                        placeholder="votre@email.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de téléphone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                        className={`pl-10 ${errors.telephone ? "border-red-500" : ""}`}
                        placeholder="+225 07 12 34 56 78"
                      />
                    </div>
                    {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                        placeholder="Minimum 8 caractères"
                      />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmer le mot de passe <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                        placeholder="Répétez le mot de passe"
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                      className={`mt-1 w-4 h-4 text-[#252525] border-gray-300 rounded ${errors.acceptTerms ? "border-red-500" : ""}`}
                    />
                    <label className="text-sm text-gray-700">
                      J'accepte les{" "}
                      <Link href="/terms" className="text-[#A07539] hover:underline">
                        conditions d'utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link href="/privacy" className="text-[#A07539] hover:underline">
                        politique de confidentialité
                      </Link>
                      <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-[#252525] hover:bg-[#A07539] text-white py-6 text-lg"
                  >
                    Continuer
                  </Button>
                </form>
              )}

              {/* Step 2: Vérification Email */}
              {step === 2 && (
                <form onSubmit={handleEmailVerification} className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#EADD8E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-[#A07539]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#252525] mb-2">Vérifiez votre email</h2>
                    <p className="text-gray-600">
                      Nous avons envoyé un code à <strong>{formData.email}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code de vérification</label>
                    <Input
                      type="text"
                      value={emailCode}
                      onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="text-center text-2xl tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#252525] hover:bg-[#A07539] text-white"
                      disabled={emailCode.length !== 6}
                    >
                      Vérifier
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-500">
                    Vous n'avez pas reçu le code ?{" "}
                    <button type="button" className="text-[#A07539] hover:underline">
                      Renvoyer
                    </button>
                  </p>
                </form>
              )}

              {/* Step 3: Vérification Téléphone */}
              {step === 3 && (
                <form onSubmit={handlePhoneVerification} className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#EADD8E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-[#A07539]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#252525] mb-2">Vérifiez votre téléphone</h2>
                    <p className="text-gray-600">
                      Nous avons envoyé un code SMS à <strong>{formData.telephone}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code de vérification</label>
                    <Input
                      type="text"
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="text-center text-2xl tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#252525] hover:bg-[#A07539] text-white"
                      disabled={phoneCode.length !== 6}
                    >
                      Vérifier
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-500">
                    Vous n'avez pas reçu le code ?{" "}
                    <button type="button" className="text-[#A07539] hover:underline">
                      Renvoyer
                    </button>
                  </p>
                </form>
              )}

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Vous avez déjà un compte ?{" "}
                  <Link href="/login" className="text-[#A07539] hover:underline font-medium">
                    Se connecter
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
