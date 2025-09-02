import React, { useState, useEffect } from "react";
import { Star, Quotes, ArrowLeft, ArrowRight, User, ChatCircle, X, PaperPlaneTilt } from "@phosphor-icons/react";
import { useForm, ValidationError } from '@formspree/react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  service: string;
  location: string;
}

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [state, handleSubmit] = useForm("xgvllynn"); // Remplace par ton Form ID

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Adjo MENSAH",
      company: "Centre Médical Saint-Joseph",
      role: "Directrice Administrative",
      content: "Africa Clean a transformé nos standards d'hygiène hospitalière. Leur expertise en Santé-Pro et leur respect des protocoles de désinfection nous ont permis d'améliorer significativement la qualité de nos services médicaux.",
      rating: 5,
      service: "Santé-Pro",
      location: "Lomé, Togo"
    },
    {
      id: 2,
      name: "Koffi AGBEKO",
      company: "Hôtel Golden Tulip",
      role: "Responsable Entretien",
      content: "Un service impeccable ! L'équipe Nettoie-Pro assure un entretien quotidien de nos locaux avec un professionnalisme remarquable. Nos clients apprécient toujours la propreté et la fraîcheur de nos espaces.",
      rating: 5,
      service: "Nettoie-Pro",
      location: "Lomé, Togo"
    },
    {
      id: 3,
      name: "Marie KOUAKOU",
      company: "Résidence Villa Verde",
      role: "Propriétaire",
      content: "Le service Eco-Jardin a dépassé nos attentes ! Notre espace vert est maintenant magnifique et l'entretien écologique respecte parfaitement l'environnement. Les plans 3D étaient très précis.",
      rating: 5,
      service: "Eco-Jardin",
      location: "Abidjan, Côte d'Ivoire"
    },
    {
      id: 4,
      name: "Didier TOSSOU",
      company: "Festival des Arts de Lomé",
      role: "Coordinateur Événementiel",
      content: "Africa Clean a géré parfaitement les déchets de notre festival avec Éco-Event. Les poubelles personnalisées étaient superbes et le tri sélectif a sensibilisé nos 5000 participants !",
      rating: 5,
      service: "Éco-Event",
      location: "Lomé, Togo"
    },
    {
      id: 5,
      name: "Fatima IBRAHIM",
      company: "Famille Ibrahim",
      role: "Mère de famille",
      content: "Notre jardin potager Natura-Potager nous permet de nourrir toute la famille avec des légumes 100% bio. L'équipe nous a bien formés pour l'auto-gestion. Merci Africa Clean !",
      rating: 5,
      service: "Natura-Potager",
      location: "Kara, Togo"
    },
    {
      id: 6,
      name: "Emmanuel ASANTE",
      company: "Pharmacie Nouvelle",
      role: "Pharmacien Titulaire",
      content: "La formation Technicien de surfaces spécialisé en milieu hospitalier a été excellente. Mon équipe maîtrise maintenant parfaitement les protocoles d'hygiène pharmaceutique.",
      rating: 5,
      service: "Formation",
      location: "Sokodé, Togo"
    }
  ];

  // Auto-play testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Change every 8 seconds
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        weight={index < rating ? "fill" : "regular"}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case "Santé-Pro": return "#DC2626";
      case "Nettoie-Pro": return "#14A800";
      case "Eco-Jardin": return "#22C55E";
      case "Éco-Event": return "#0284C7";
      case "Natura-Potager": return "#16A34A";
      case "Formation": return "#7C3AED";
      default: return "#14A800";
    }
  };

  // Gestion du succès de soumission
  useEffect(() => {
    if (state.succeeded) {
      // Réinitialiser le formulaire
      const form = document.getElementById('testimonial-form') as HTMLFormElement;
      if (form) {
        form.reset();
      }
      setRating(5);
      setShowForm(false);
      // Petite pause pour s'assurer que le modal se ferme avant l'alerte
      setTimeout(() => {
        alert('Merci pour votre témoignage ! Nous l\'examinerons bientôt.');
      }, 100);
    }
  }, [state.succeeded]);

  // Convertir la note en emojis étoiles
  const getStarEmojis = (rating: number) => {
    const fullStars = "⭐".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return fullStars + emptyStars;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Quotes size={40} className="text-[#14A800] mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121]">
              Ce que disent nos clients
            </h2>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Découvrez les témoignages de satisfaction de nos clients qui nous font confiance
            pour leurs besoins de nettoyage, d'hygiène et d'aménagement écologique.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
              <Quotes size={200} className="text-[#14A800]" />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Client Info */}
                <div className="text-center lg:text-left">
                  <div className="w-24 h-24 mx-auto lg:mx-0 mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                    <User size={40} className="text-gray-600" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-[#212121] mb-1">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  
                  <p className="text-gray-600 mb-2">
                    {testimonials[currentTestimonial].role}
                  </p>
                  
                  <p className="font-semibold text-gray-800 mb-3">
                    {testimonials[currentTestimonial].company}
                  </p>

                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white mb-2"
                       style={{ backgroundColor: getServiceColor(testimonials[currentTestimonial].service) }}>
                    {testimonials[currentTestimonial].service}
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    📍 {testimonials[currentTestimonial].location}
                  </p>
                </div>

                {/* Testimonial Text */}
                <div className="lg:col-span-2">
                  <div className="flex items-center mb-6">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic mb-6">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-[#14A800] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
            aria-label="Témoignage précédent"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-[#14A800] p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
            aria-label="Témoignage suivant"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Testimonials Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? "bg-[#14A800] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { number: "200+", label: "Clients satisfaits" },
            { number: "98%", label: "Taux de satisfaction" },
            { number: "6", label: "Services spécialisés" },
            { number: "5+", label: "Années d'expérience" }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-[#14A800] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Add Testimonial Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <ChatCircle size={20} />
            <span>Partager votre expérience</span>
          </button>
          <p className="text-gray-600 text-sm mt-2">
            Votre témoignage nous aide à améliorer nos services
          </p>
        </div>
      </div>

      {/* Testimonial Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <ChatCircle size={32} className="text-[#14A800]" />
                  <h3 className="text-2xl font-bold text-[#212121]">
                    Partagez votre expérience
                  </h3>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Nom */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14A800] focus:border-transparent"
                    placeholder="Votre nom complet"
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14A800] focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                  />
                </div>

                {/* Note sur 5 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note sur 5 *
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={32}
                          weight={star <= rating ? "fill" : "regular"}
                          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-sm text-gray-600">
                      {rating}/5 étoiles
                    </span>
                  </div>
                  <input type="hidden" name="rating" value={`${rating}/5 ${getStarEmojis(rating)}`} />
                </div>

                {/* Témoignage */}
                <div>
                  <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-2">
                    Votre témoignage *
                  </label>
                  <textarea
                    id="testimonial"
                    name="testimonial"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14A800] focus:border-transparent resize-vertical"
                    placeholder="Partagez votre expérience avec Africa Clean..."
                  />
                  <ValidationError 
                    prefix="Testimonial" 
                    field="testimonial"
                    errors={state.errors}
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de téléphone (optionnel)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14A800] focus:border-transparent"
                    placeholder="+228 XX XX XX XX"
                  />
                  <ValidationError 
                    prefix="Phone" 
                    field="phone"
                    errors={state.errors}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-6">
                  <p className="text-sm text-gray-600">
                    * Champs obligatoires
                  </p>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="bg-[#14A800] hover:bg-[#128700] disabled:bg-gray-400 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Envoi...</span>
                      </>
                    ) : (
                      <>
                        <PaperPlaneTilt size={20} />
                        <span>Envoyer mon témoignage</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;