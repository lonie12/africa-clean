/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Calculator,
  FileText,
  CheckCircle,
  Info,
  Phone,
  //   Send,
  //   Download,
  Star,
  Clock,
  Users,
  //   Award,
  //   ArrowRight,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Input } from "../../components/forms/Input";
import { Textarea } from "../../components/forms/Textarea";
import { CustomSelect } from "../../components/forms/custom-select";
// import Button from "../../components/Button";
import { useToast } from "../../context/toast-context";
import { Award, Send } from "iconsax-react";
import Button from "@/components/actions/button";

interface PricingZone {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  color: string;
}

interface Product {
  id: string;
  name: string;
  unit: string;
  priceRange: string;
  category: string;
}

interface Service {
  id: string;
  name: string;
  priceRange: string;
  category: string;
}

interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  area?: string;
  frequency: string;
  description: string;
  budget: string;
  urgency: string;
}

const QuotePage: React.FC = () => {
  const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState<"calculator" | "form">(
    "calculator"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<string>("");
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    area: "",
    frequency: "",
    description: "",
    budget: "",
    urgency: "",
  });

  // Get concept from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const concept = urlParams.get("concept");
    if (concept) {
      setSelectedConcept(concept);
      setFormData((prev) => ({ ...prev, serviceType: concept }));
    }
  }, []);

  const pricingZones: PricingZone[] = [
    {
      id: "zone0",
      title: "Zone 0 - Balayage de cours et des espaces publics",
      description: "Nettoyage de base des espaces extérieurs",
      priceRange: "50 à 100",
      color: "#22C55E",
    },
    {
      id: "zone1",
      title:
        "Zone 1 - Nettoyage de bureaux, d'immeubles vides, de commerces de maison habitées",
      description: "Nettoyage standard des espaces intérieurs",
      priceRange: "200 à 300",
      color: "#3B82F6",
    },
    {
      id: "zone2",
      title: "Zone 2 - Fin chantier, sol, hôtels",
      description: "Nettoyage post-construction et hôtellerie",
      priceRange: "250 à 400",
      color: "#8B5CF6",
    },
    {
      id: "zone3",
      title: "Zone 3 - Vitrine en hauteur",
      description: "Nettoyage spécialisé en hauteur",
      priceRange: "400 à 600",
      color: "#F59E0B",
    },
    {
      id: "zone4",
      title:
        "Zone 4 - Hospitalier : désinfection, désinsectisation, lieux contaminés",
      description: "Nettoyage médical spécialisé",
      priceRange: "500 à 650",
      color: "#EF4444",
    },
  ];

  const specialServices: Service[] = [
    {
      id: "furniture",
      name: "Nettoyage de sofa, divan ou fauteuils",
      priceRange: "1500 à 3000",
      category: "Mobilier",
    },
    {
      id: "lighting",
      name: "Nettoyage des luminaires",
      priceRange: "100 à 500 /ampoule",
      category: "Éclairage",
    },
    {
      id: "carpets",
      name: "Nettoyage des moquettes",
      priceRange: "2000 à 5000",
      category: "Revêtements",
    },
  ];

  const products: Product[] = [
    {
      id: "bins",
      name: "Poubelles écologique et brandées",
      unit: "unité",
      priceRange: "15 000 à 150 000",
      category: "Équipements",
    },
    {
      id: "detergent",
      name: "Détergent-Détartrant-Nettoyant vitre",
      unit: "L",
      priceRange: "1000 à 1500",
      category: "Produits",
    },
  ];

  const gardenServices: Service[] = [
    {
      id: "creation-follow",
      name: "Création avec suivi de 3 mois",
      priceRange: "6000",
      category: "Création",
    },
    {
      id: "creation-only",
      name: "Création sans suivi",
      priceRange: "5000",
      category: "Création",
    },
    {
      id: "maintenance",
      name: "Nettoyage d'espaces verts",
      priceRange: "1000",
      category: "Entretien",
    },
  ];

  const serviceOptions = [
    { value: "nettoie-pro", label: "Nettoie-Pro - Nettoyage professionnel" },
    { value: "sante-pro", label: "Santé-Pro - Hygiène centres de santé" },
    { value: "eco-jardin", label: "Eco-Jardin - Espaces verts" },
    { value: "natura-potager", label: "Natura-Potager - Jardins bio" },
    { value: "eco-event", label: "Éco-Event - Gestion déchets événementiels" },
    { value: "nettoie-event", label: "Nettoie-Event - Nettoyage événementiel" },
    { value: "formation", label: "Formation - Technicien de surfaces" },
    { value: "autre", label: "Autre service" },
  ];

  const frequencyOptions = [
    { value: "ponctuel", label: "Intervention ponctuelle" },
    { value: "hebdomadaire", label: "Hebdomadaire" },
    { value: "mensuel", label: "Mensuel" },
    { value: "trimestriel", label: "Trimestriel" },
    { value: "semestriel", label: "Semestriel" },
    { value: "annuel", label: "Annuel" },
  ];

  const budgetOptions = [
    { value: "moins-50k", label: "Moins de 50 000 FCFA" },
    { value: "50k-100k", label: "50 000 - 100 000 FCFA" },
    { value: "100k-500k", label: "100 000 - 500 000 FCFA" },
    { value: "500k-1m", label: "500 000 - 1 000 000 FCFA" },
    { value: "plus-1m", label: "Plus de 1 000 000 FCFA" },
    { value: "a-discuter", label: "À discuter" },
  ];

  const urgencyOptions = [
    { value: "normal", label: "Normal (sous 48h)" },
    { value: "urgent", label: "Urgent (sous 24h)" },
    { value: "tres-urgent", label: "Très urgent (même jour)" },
  ];

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      success(
        "Demande de devis envoyée !",
        "Nous étudions votre demande et vous recontacterons rapidement.",
        {
          action: {
            label: "Voir nos services",
            onClick: () => (window.location.href = "/services"),
          },
        }
      );

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        serviceType: selectedConcept,
        area: "",
        frequency: "",
        description: "",
        budget: "",
        urgency: "",
      });
    } catch (err) {
      error(
        "Erreur lors de l'envoi",
        "Veuillez réessayer ou nous contacter directement."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.serviceType &&
    formData.description;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#14A800] to-[#128700] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Demander un Devis Gratuit
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Consultez nos tarifs ou obtenez un devis personnalisé pour vos
            besoins spécifiques
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === "calculator"
                  ? "bg-white text-[#14A800]"
                  : "border-2 border-white text-white hover:bg-white hover:text-[#14A800]"
              }`}
            >
              Grille tarifaire
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === "form"
                  ? "bg-white text-[#14A800]"
                  : "border-2 border-white text-white hover:bg-white hover:text-[#14A800]"
              }`}
            >
              Devis personnalisé
            </button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <Calculator size={40} />
        </div>
        <div
          className="absolute bottom-20 right-10 opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <FileText size={35} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {activeTab === "calculator" && (
            <div>
              {/* Pricing Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
                  Grille Tarifaire d'Africa Clean
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Prestations Ponctuelles - Tarifs au m² en FCFA
                </p>
              </div>

              {/* Nettoyage Pricing Table */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
                <div className="bg-gradient-to-r from-[#14A800] to-[#128700] text-white p-6">
                  <h3 className="text-2xl font-bold text-center">
                    NETTOYAGE (50 - 650)
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">
                          Désignation
                        </th>
                        <th className="px-6 py-4 text-center font-semibold text-gray-900">
                          Tarifs / m² (en FCFA)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pricingZones.map((zone) => (
                        <tr
                          key={zone.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div
                                className="w-4 h-4 rounded-full mr-3"
                                style={{ backgroundColor: zone.color }}
                              ></div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {zone.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {zone.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                              style={{ backgroundColor: zone.color }}
                            >
                              {zone.priceRange}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {specialServices.map((service) => (
                        <tr
                          key={service.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {service.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {service.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {service.priceRange}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Products Section */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                  <h3 className="text-2xl font-bold text-center">PRODUITS</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">
                          Produit
                        </th>
                        <th className="px-6 py-4 text-center font-semibold text-gray-900">
                          Prix (FCFA)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Par {product.unit}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {product.priceRange}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Garden Services Section */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
                  <h3 className="text-2xl font-bold text-center">
                    JARDINAGE - CRÉATION D'ESPACE VERT (GAZON)
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">
                          Service
                        </th>
                        <th className="px-6 py-4 text-center font-semibold text-gray-900">
                          Prix par m² (FCFA)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {gardenServices.map((service) => (
                        <tr
                          key={service.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {service.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {service.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {service.priceRange}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8 border-l-4 border-yellow-400">
                <div className="flex items-start">
                  <Info
                    size={24}
                    className="text-yellow-600 mr-4 mt-1 flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Informations importantes
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle
                          size={16}
                          className="text-green-600 mr-2 mt-1 flex-shrink-0"
                        />
                        <span>
                          Tarifs indicatifs pour prestations ponctuelles
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle
                          size={16}
                          className="text-green-600 mr-2 mt-1 flex-shrink-0"
                        />
                        <span>
                          Devis personnalisé gratuit pour contrats récurrents
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle
                          size={16}
                          className="text-green-600 mr-2 mt-1 flex-shrink-0"
                        />
                        <span>
                          10% de réduction sur votre première commande
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle
                          size={16}
                          className="text-green-600 mr-2 mt-1 flex-shrink-0"
                        />
                        <span>
                          Prix dégressifs selon la fréquence et la surface
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center mt-12">
                <div className="bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-[#212121] mb-4">
                    Besoin d'un devis personnalisé ?
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Ces tarifs sont indicatifs. Pour un devis précis adapté à
                    vos besoins, contactez-nous !
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setActiveTab("form")}
                      className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <FileText size={20} />
                      <span>Demander un devis gratuit</span>
                    </button>
                    <a
                      href="tel:+22890453153"
                      className="border-2 border-[#14A800] text-[#14A800] px-8 py-4 rounded-full font-semibold hover:bg-[#14A800] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Phone size={20} />
                      <span>Appeler maintenant</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "form" && (
            <div className="max-w-4xl mx-auto">
              {/* Form Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
                  Demande de Devis Personnalisé
                </h2>
                <p className="text-xl text-gray-700">
                  Remplissez ce formulaire pour recevoir votre devis gratuit
                  sous 24h
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-[#212121] mb-4 flex items-center">
                      <Users size={24} className="text-[#14A800] mr-3" />
                      Informations personnelles
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Prénom *"
                        placeholder="Votre prénom"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        required
                      />
                      <Input
                        label="Nom *"
                        placeholder="Votre nom"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <Input
                        label="Email *"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                      <Input
                        label="Téléphone *"
                        type="tel"
                        placeholder="+228 XX XX XX XX"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="mt-6">
                      <Input
                        label="Entreprise / Organisation"
                        placeholder="Nom de votre entreprise (optionnel)"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Service Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-[#212121] mb-4 flex items-center">
                      <Calculator size={24} className="text-[#14A800] mr-3" />
                      Détails du service
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <CustomSelect
                        label="Type de service *"
                        options={serviceOptions}
                        value={formData.serviceType}
                        onChange={(value) =>
                          handleInputChange("serviceType", value || "")
                        }
                        placeholder="Sélectionner un service"
                      />
                      <Input
                        label="Surface approximative"
                        placeholder="Ex: 200 m²"
                        value={formData.area}
                        onChange={(e) =>
                          handleInputChange("area", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <CustomSelect
                        label="Fréquence souhaitée"
                        options={frequencyOptions}
                        value={formData.frequency}
                        onChange={(value) =>
                          handleInputChange("frequency", value || "")
                        }
                        placeholder="Sélectionner la fréquence"
                      />
                      <CustomSelect
                        label="Budget approximatif"
                        options={budgetOptions}
                        value={formData.budget}
                        onChange={(value) =>
                          handleInputChange("budget", value || "")
                        }
                        placeholder="Votre budget"
                      />
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-[#212121] mb-4 flex items-center">
                      <FileText size={24} className="text-[#14A800] mr-3" />
                      Description du projet
                    </h3>
                    <Textarea
                      label="Décrivez vos besoins *"
                      placeholder="Décrivez en détail vos besoins, contraintes particulières, attentes spécifiques..."
                      rows={6}
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Urgency */}
                  <div>
                    <h3 className="text-xl font-semibold text-[#212121] mb-4 flex items-center">
                      <Clock size={24} className="text-[#14A800] mr-3" />
                      Urgence
                    </h3>
                    <CustomSelect
                      label="Délai souhaité pour le devis"
                      options={urgencyOptions}
                      value={formData.urgency}
                      onChange={(value) =>
                        handleInputChange("urgency", value || "")
                      }
                      placeholder="Sélectionner l'urgence"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <Button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`w-full py-4 px-8 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                        isFormValid && !isSubmitting
                          ? "bg-[#14A800] hover:bg-[#128700] hover:shadow-xl"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send color="white" size={20} />
                          <span>Envoyer ma demande de devis</span>
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center text-sm text-gray-600 mt-4">
                      <Info size={16} className="mr-2" />
                      <span>
                        Devis gratuit • Réponse sous 24h • Sans engagement
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#14A800] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi demander un devis chez Africa Clean ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Devis Gratuit</h3>
              <p className="opacity-90">
                Estimation détaillée sans frais ni engagement de votre part
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Réponse Rapide</h3>
              <p className="opacity-90">
                Votre devis personnalisé sous 24h maximum
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award color="white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Expertise Reconnue</h3>
              <p className="opacity-90">
                6 ans d'expérience et 5 prix remportés dans le secteur
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Besoin d'aide pour votre devis ?
              </h3>
              <p className="text-lg opacity-90 mb-6">
                Notre équipe est disponible pour vous accompagner dans votre
                demande
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+22890453153"
                  className="bg-white text-[#14A800] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Phone size={20} />
                  <span>+228 90 45 31 53</span>
                </a>
                <a
                  href="https://wa.me/22890453153"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#20BA5A] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <WhatsappLogo size={20} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-6">
            Prêt à commencer votre projet ?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Obtenez votre devis gratuit dès maintenant ou contactez-nous pour
            plus d'informations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab("form")}
              className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <FileText size={20} />
              <span>Demander un devis</span>
            </button>
            <button
              onClick={() => (window.location.href = "/contact")}
              className="border-2 border-[#14A800] text-[#14A800] px-8 py-4 rounded-full font-semibold hover:bg-[#14A800] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>Nous contacter</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuotePage;
