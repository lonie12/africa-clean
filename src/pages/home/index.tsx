import WhatsAppFloatingButton from "@/components/common/WhatsAppButton";
import HeroSection from "./HeroSection";
import ProductsServicesOverview from "./ProductsServicesSection";
import ConceptsSection from "./ConceptsSection";
import InterventionModes from "./InterventionModesSection";
import TrustSection from "./TrustSection";
import WhyChooseUs from "./WhyChooseUsSection";
import ContactCTA from "./ContactCTASection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <HeroSection />

      {/* Products + Services Overview */}
      <ProductsServicesOverview />

      {/* Our Concepts with Image Animations */}
      <ConceptsSection />

      {/* Intervention Modes */}
      <InterventionModes />

      {/* They Trust Us - Scrolling Logos */}
      <TrustSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Contact CTA */}
      <ContactCTA />

      {/* Floating WhatsApp Button */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default HomePage;
