import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"
import AboutSection from "@/components/about/about-section"
import HowItWorksSection from "@/components/how-it-works/how-it-works-section"
import ExplorePropertiesSection from "@/components/explore-properties/explore-properties-section"
import TopPicksSection from "@/components/top-picks/top-picks-section"
import FAQSection from "@/components/faq/faq-section"
import ContactSection from "@/components/contact/contact-section"

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <ExplorePropertiesSection />
      <TopPicksSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
