/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { 
  Phone, 
  EnvelopeSimple, 
  MapPin, 
  Clock, 
//   User, 
  Buildings,
  ChatCircle,
  CheckCircle,
  Info,
  ArrowRight,
  WhatsappLogo,
  FacebookLogo,
  LinkedinLogo,
  TwitterLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { Input } from "../../components/forms/Input";
import { Textarea } from "../../components/forms/Textarea";
import { CustomSelect } from "../../components/forms/custom-select";
// import Button from "@/components/actions/Button";
import { useToast } from "../../context/toast-context";
import { Send } from "iconsax-react";
import Button from "@/components/actions/button";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  service: string;
  message: string;
  urgency: string;
}

const ContactPage: React.FC = () => {
  const { success, error } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    service: "",
    message: "",
    urgency: ""
  });

  const serviceOptions = [
    { value: "nettoie-pro", label: "Nettoie-Pro - Nettoyage professionnel" },
    { value: "sante-pro", label: "Santé-Pro - Hygiène centres de santé" },
    { value: "eco-jardin", label: "Eco-Jardin - Espaces verts" },
    { value: "natura-potager", label: "Natura-Potager - Jardins bio" },
    { value: "eco-event", label: "Éco-Event - Gestion déchets événementiels" },
    { value: "nettoie-event", label: "Nettoie-Event - Nettoyage événementiel" },
    { value: "formation", label: "Formation - Technicien de surfaces" },
    { value: "devis", label: "Demande de devis général" },
    { value: "partenariat", label: "Partenariat B2B/B2C" },
    { value: "autre", label: "Autre demande" }
  ];

  const urgencyOptions = [
    { value: "normal", label: "Normal (sous 48h)" },
    { value: "urgent", label: "Urgent (sous 24h)" },
    { value: "tres-urgent", label: "Très urgent (même jour)" }
  ];

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Adresse",
      info: "Djidjolé, derrière le CMS",
      subInfo: "Lomé-Togo",
      color: "#14A800"
    },
    {
      icon: <Phone size={24} />,
      title: "Téléphone",
      info: "+228 90 45 31 53",
      subInfo: "+225 01 51 15 46 16",
      color: "#0284C7",
      action: () => window.open('tel:+22890453153')
    },
    {
      icon: <EnvelopeSimple size={24} />,
      title: "Email",
      info: "africaclean.contact@gmail.com",
      subInfo: "Réponse sous 24h",
      color: "#DC2626",
      action: () => window.open('mailto:africaclean.contact@gmail.com')
    },
    {
      icon: <Clock size={24} />,
      title: "Horaires",
      info: "Lun - Sam: 7h00 - 18h00",
      subInfo: "Urgences: 24h/24",
      color: "#7C3AED"
    }
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <WhatsappLogo size={24} />,
      url: "https://wa.me/22890453153",
      color: "#25D366"
    },
    {
      name: "Facebook",
      icon: <FacebookLogo size={24} />,
      url: "https://www.facebook.com/share/1CPRhr5DdT/",
      color: "#1877F2"
    },
    {
      name: "LinkedIn",
      icon: <LinkedinLogo size={24} />,
      url: "https://www.linkedin.com/company/africacleantg/",
      color: "#0A66C2"
    },
    {
      name: "Twitter",
      icon: <TwitterLogo size={24} />,
      url: "https://x.com/africacleanTg",
      color: "#1DA1F2"
    },
    {
      name: "YouTube",
      icon: <YoutubeLogo size={24} />,
      url: "https://www.youtube.com/@AFRICACLEANSARL",
      color: "#FF0000"
    }
  ];

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      success(
        "Message envoyé avec succès !",
        "Nous vous répondrons dans les plus brefs délais.",
        {
          action: {
            label: "Voir nos services",
            onClick: () => window.location.href = '/services'
          }
        }
      );

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        service: "",
        message: "",
        urgency: ""
      });

    } catch (err) {
      error(
        "Erreur lors de l'envoi",
        "Veuillez réessayer ou nous contacter directement par téléphone."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone && formData.message;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#14A800] to-[#128700] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contactez-Nous
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Une question, un projet, une urgence ? Notre équipe est à votre disposition pour vous accompagner.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+22890453153"
              className="bg-white text-[#14A800] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Phone size={20} />
              <span>Appeler maintenant</span>
            </a>
            <a
              href="https://wa.me/22890453153"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#20BA5A] transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <WhatsappLogo size={20} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <ChatCircle size={40} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
          <Send size={35} />
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-[#212121] mb-4">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Prénom *"
                      placeholder="Votre prénom"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                    <Input
                      label="Nom *"
                      placeholder="Votre nom"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Email *"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                    <Input
                      label="Téléphone *"
                      type="tel"
                      placeholder="+228 XX XX XX XX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>

                  {/* Company */}
                  <Input
                    label="Entreprise / Organisation"
                    placeholder="Nom de votre entreprise (optionnel)"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />

                  {/* Subject */}
                  <Input
                    label="Sujet"
                    placeholder="Objet de votre demande"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                  />

                  {/* Service & Urgency */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <CustomSelect
                      label="Service concerné"
                      options={serviceOptions}
                      value={formData.service}
                      onChange={(value) => handleInputChange('service', value || '')}
                      placeholder="Sélectionner un service"
                    />
                    <CustomSelect
                      label="Urgence"
                      options={urgencyOptions}
                      value={formData.urgency}
                      onChange={(value) => handleInputChange('urgency', value || '')}
                      placeholder="Niveau d'urgence"
                    />
                  </div>

                  {/* Message */}
                  <Textarea
                    label="Message *"
                    placeholder="Décrivez votre demande en détail..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-4 px-8 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                      isFormValid && !isSubmitting 
                        ? 'bg-[#14A800] hover:bg-[#128700] hover:shadow-xl' 
                        : 'bg-gray-400 cursor-not-allowed'
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
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </Button>

                  <div className="flex items-center text-sm text-gray-600 mt-4">
                    <Info size={16} className="mr-2" />
                    <span>* Champs obligatoires</span>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Contact Cards */}
              {contactInfo.map((contact, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 transition-all duration-300 hover:shadow-xl ${
                    contact.action ? 'cursor-pointer hover:scale-105' : ''
                  }`}
                  style={{ borderColor: contact.color }}
                  onClick={contact.action}
                >
                  <div className="flex items-start">
                    <div 
                      className="p-3 rounded-full mr-4 flex-shrink-0"
                      style={{ backgroundColor: contact.color, color: 'white' }}
                    >
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#212121] mb-1">
                        {contact.title}
                      </h3>
                      <p className="text-gray-700 font-medium">{contact.info}</p>
                      <p className="text-gray-500 text-sm">{contact.subInfo}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-lg text-[#212121] mb-4">
                  Suivez-nous
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: `${social.color}20`, color: social.color }}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-[#14A800] to-[#128700] rounded-2xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-4">Actions Rapides</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = '/quote'}
                    className="w-full bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300 flex items-center space-x-3"
                  >
                    <ChatCircle size={20} />
                    <span>Demander un devis</span>
                    <ArrowRight size={16} className="ml-auto" />
                  </button>
                  <button
                    onClick={() => window.location.href = '/services'}
                    className="w-full bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300 flex items-center space-x-3"
                  >
                    <Buildings size={20} />
                    <span>Voir nos services</span>
                    <ArrowRight size={16} className="ml-auto" />
                  </button>
                  <a
                    href="https://wa.me/22890453153"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300 flex items-center space-x-3"
                  >
                    <WhatsappLogo size={20} />
                    <span>Chat WhatsApp</span>
                    <ArrowRight size={16} className="ml-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
              Notre Localisation
            </h2>
            <p className="text-xl text-gray-700">
              Venez nous rendre visite à notre siège social à Lomé
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="lg:flex">
              <div className="lg:w-1/3 p-8 lg:p-12 bg-gradient-to-br from-[#14A800] to-[#128700] text-white">
                <h3 className="text-2xl font-bold mb-6">Informations pratiques</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin size={24} className="mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Adresse complète</h4>
                      <p className="opacity-90">
                        Djidjolé, derrière le CMS<br />
                        Lomé, Togo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock size={24} className="mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Horaires de bureau</h4>
                      <p className="opacity-90">
                        Lundi - Samedi: 7h00 - 18h00<br />
                        Dimanche: Sur rendez-vous<br />
                        <span className="text-yellow-300">Urgences: 24h/24</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone size={24} className="mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Contact direct</h4>
                      <p className="opacity-90">
                        +228 90 45 31 53<br />
                        +225 01 51 15 46 16
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-sm opacity-90">
                    <strong>Transport :</strong> Accessible en taxi, moto-taxi et transport en commun. 
                    Parking disponible sur site.
                  </p>
                </div>
              </div>

              <div className="lg:w-2/3 h-96 lg:h-auto">
                {/* Placeholder for Google Maps */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center relative">
                  <iframe
                    src="https://maps.google.com/maps?q=Djidjol%C3%A9%2C%20derri%C3%A8re%20le%20CMS%20-%20Lom%C3%A9&t=m&z=10&output=embed&iwloc=near"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation Africa Clean"
                  ></iframe>
                  
                  {/* Overlay info */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#14A800] rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Africa Clean</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ or Additional Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-8">
            Besoin d'aide immédiate ?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <Phone size={40} className="text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#212121] mb-3">Urgences 24h/24</h3>
              <p className="text-gray-700 mb-4">
                Pour les interventions urgentes de nettoyage, désinfection ou gestion de déchets.
              </p>
              <a
                href="tel:+22890453153"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <Phone size={18} />
                <span>Appeler maintenant</span>
              </a>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
              <WhatsappLogo size={40} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#212121] mb-3">Chat en direct</h3>
              <p className="text-gray-700 mb-4">
                Posez vos questions et obtenez des réponses rapides via WhatsApp.
              </p>
              <a
                href="https://wa.me/22890453153"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <WhatsappLogo size={18} />
                <span>Ouvrir WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#14A800] to-[#128700] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Engagement Qualité</h3>
            <p className="text-lg opacity-90 mb-6">
              Nous nous engageons à répondre à toutes vos demandes dans les plus brefs délais. 
              Votre satisfaction est notre priorité.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} />
                <span>Réponse sous 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} />
                <span>Devis gratuit</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} />
                <span>Conseil personnalisé</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;