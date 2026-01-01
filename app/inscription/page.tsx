"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    typePiece: "",
    numeroPiece: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptConditions: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis"
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis"
    if (!formData.typePiece) newErrors.typePiece = "Le type de pièce d'identité est requis"
    if (!formData.numeroPiece.trim()) newErrors.numeroPiece = "Le numéro de pièce d'identité est requis"
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères"
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une majuscule"
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins un chiffre"
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }
    
    if (!formData.acceptConditions) {
      newErrors.acceptConditions = "Vous devez accepter les conditions d'utilisation"
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
      console.log("Form submitted", formData)
      setIsSubmitting(false)
      // Rediriger vers le tableau de bord
      // router.push('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-3">
              Créer un compte
            </h1>
            <p className="text-gray-600">
              Rejoignez Joya Immobilier et commencez votre parcours immobilier
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom et Prénom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className={errors.nom ? "border-red-500" : ""}
                  placeholder="Votre nom"
                />
                {errors.nom && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.nom}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                  className={errors.prenom ? "border-red-500" : ""}
                  placeholder="Votre prénom"
                />
                {errors.prenom && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.prenom}
                  </p>
                )}
              </div>
            </div>

            {/* Pièce d'identité */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de pièce d'identité <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.typePiece}
                  onValueChange={(value) => setFormData({...formData, typePiece: value})}
                >
                  <SelectTrigger className={errors.typePiece ? "border-red-500" : ""}>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CNI">CNI</SelectItem>
                    <SelectItem value="Passeport">Passeport</SelectItem>
                    <SelectItem value="Permis de conduire">Permis de conduire</SelectItem>
                  </SelectContent>
                </Select>
                {errors.typePiece && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.typePiece}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de pièce d'identité <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.numeroPiece}
                  onChange={(e) => setFormData({...formData, numeroPiece: e.target.value})}
                  className={errors.numeroPiece ? "border-red-500" : ""}
                  placeholder="Numéro de la pièce"
                />
                {errors.numeroPiece && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.numeroPiece}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
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

            {/* Mot de passe */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={errors.password ? "border-red-500" : ""}
                  placeholder="Minimum 8 caractères"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Au moins 8 caractères, 1 majuscule, 1 chiffre
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  placeholder="Confirmez votre mot de passe"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Conditions d'utilisation */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptConditions}
                  onChange={(e) => setFormData({...formData, acceptConditions: e.target.checked})}
                  className="mt-1 w-4 h-4 text-[#252525] border-gray-300 rounded focus:ring-[#EADD8E]"
                />
                <span className="text-sm text-gray-700">
                  J'accepte les{" "}
                  <Link href="/conditions" className="text-[#A07539] hover:underline">
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/confidentialite" className="text-[#A07539] hover:underline">
                    politique de confidentialité
                  </Link>
                  <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.acceptConditions && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.acceptConditions}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#252525] hover:bg-[#A07539] text-white py-6 text-lg font-semibold"
            >
              {isSubmitting ? "Création en cours..." : "Créer un compte"}
            </Button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Déjà un compte ?{" "}
                <Link href="/connexion" className="text-[#A07539] hover:underline font-medium">
                  Se connecter
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

