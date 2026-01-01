"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
          <h1 className="text-2xl font-bold text-[#252525] mb-4">Éditer la Propriété #{id}</h1>
          <p className="text-gray-600 mb-6">Cette page utilisera le même formulaire multi-étapes que la création, pré-rempli avec les données existantes.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/owner/property/create">
              <Button className="bg-[#252525] hover:bg-[#A07539] text-white">
                Voir le formulaire de création
              </Button>
            </Link>
            <Link href={`/owner/property/${id}/view`}>
              <Button variant="outline" className="border-[#252525] text-[#252525] hover:bg-[#EADD8E]">
                Retour à la vue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

