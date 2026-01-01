"use client"

import Image from "next/image"
import Link from "next/link"
import { Building, Heart, Shield, Users, Target, Award } from "lucide-react"
import Navbar from "@/components/navbar"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Nous sommes passionnés par l'immobilier et dédiés à vous offrir la meilleure expérience."
    },
    {
      icon: Shield,
      title: "Confiance",
      description: "La transparence et l'intégrité sont au cœur de tout ce que nous faisons."
    },
    {
      icon: Users,
      title: "Service Client",
      description: "Votre satisfaction est notre priorité. Nous sommes là pour vous accompagner à chaque étape."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque transaction et chaque interaction."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#252525]">Accueil</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#252525] font-medium">À Propos</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#252525] to-[#A07539] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              À Propos de Joya Immobilier
            </h1>
            <p className="text-xl text-[#EADD8E] max-w-3xl mx-auto">
              Votre partenaire de confiance pour tous vos projets immobiliers en Côte d'Ivoire
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-6">
              Qui sommes-nous ?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Joya Immobilier est une plateforme immobilière moderne et innovante conçue pour faciliter 
                la recherche, l'achat, la location et la vente de propriétés en Côte d'Ivoire.
              </p>
              <p>
                Fondée sur les principes de transparence, de confiance et d'excellence, nous nous engageons 
                à offrir à nos clients une expérience immobilière exceptionnelle.
              </p>
              <p>
                Notre mission est de rendre l'immobilier accessible à tous, en simplifiant les processus 
                complexes et en offrant des outils modernes pour connecter propriétaires et acheteurs/locataires.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/assets/images/illustrations/page-accueil/place-about.jpg"
              alt="À propos de Joya Immobilier"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre engagement envers vous
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-[#EADD8E] rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[#252525]" />
                </div>
                <h3 className="text-xl font-semibold text-[#252525] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-[#EADD8E]/20 to-[#A07539]/20 rounded-2xl p-8 sm:p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="w-16 h-16 text-[#A07539] mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-6">
              Notre Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Révolutionner l'expérience immobilière en Côte d'Ivoire en offrant une plateforme 
              moderne, intuitive et sécurisée qui connecte propriétaires et chercheurs de biens. 
              Nous nous engageons à simplifier chaque étape du processus, de la recherche à la 
              transaction finale, tout en maintenant les plus hauts standards de qualité et de service client.
            </p>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252525] mb-4">
              Contactez-nous
            </h2>
            <p className="text-xl text-gray-600">
              Nous sommes là pour vous aider
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EADD8E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-[#252525]" />
              </div>
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Adresse</h3>
              <p className="text-gray-600">
                Abidjan, Côte d'Ivoire
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EADD8E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#252525]" />
              </div>
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Email</h3>
              <p className="text-gray-600">
                contact@joya-immo.ci
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EADD8E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#252525]" />
              </div>
              <h3 className="text-xl font-semibold text-[#252525] mb-2">Support</h3>
              <p className="text-gray-600">
                Disponible 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

