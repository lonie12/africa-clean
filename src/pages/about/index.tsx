import React, { useState } from "react";
import {
  User,
  Trophy,
  Users,
  Target,
  Heart,
  Eye,
  Handshake,
  ArrowRight,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Star,
  CheckCircle,
  Phone,
  EnvelopeSimple,
  Lock,
  Medal
} from "@phosphor-icons/react";
import WhatsAppFloatingButton from "@/components/common/WhatsAppButton";
import { useTranslation } from "react-i18next";

interface Achievement {
  year: string;
  title: string;
  description: string;
  organization: string;
  color: string;
}
interface ProfileType{
  icon:string,
  title:string,
  formationAcademique:{
    title:string,
    items:string[]
  },
  formationsComplementaires:{
    title:string,
    items:string[]
  },
  experience:{
    title:string,
    description:string
  },
}
interface AboutStatsType{
  value:string,
  label:string
}
interface StatsType{
  icon:string,
  title:string,
  subtitle:string,
  description:string
  color:string
}
interface whyChooseUsTypes{
  title:string;subtitle:string,
  features:StatsType[]

}
const IconMaping :Record<string,React.ElementType>={
   User,
  Trophy,
  Users,
  Target,
  Heart,
  Lock,
  Eye,
  Handshake,
  ArrowRight,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Star,
  CheckCircle,
  Phone,
  EnvelopeSimple,
  Medal
}
const AboutPage: React.FC = () => {
  const {t}=useTranslation()
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "values">(
    "mission"
  );
const aboutStats = t('about.stats',{returnObjects:true}) as AboutStatsType[]
const summaryPhrase = t('about.summary.phrases',{returnObjects:true}) as  string []
const historyStats = t('about.history.stats',{returnObjects:true}) as  StatsType []
  const achievements = t('about.history.achievements',{returnObjects:true}) as  Achievement []

  const coreValues = t('about.history.coreValues',{returnObjects:true}) as  StatsType []
  const tabContent = t('about.tabContent',{returnObjects:true}) as  string []
  const profile = t('about.profile',{returnObjects:true}) as  ProfileType 
  const whyChooseUs = t('about.whyChooseUs',{returnObjects:true}) as  whyChooseUsTypes

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#14A800] to-[#128700] text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/pages/PAGE_A_PROPOS.jpg"
            alt="À propos d'Africa Clean"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#14A800]/65 to-[#128700]/55"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
               {t('about.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
               {t('about.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("histoire")}
                  className="bg-white text-[#14A800] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  {t('cover.ourHistory')}
                </button>
                <button
                  onClick={() => scrollToSection("equipe")}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#14A800] transition-all duration-300"
                >
                  {t('cover.MeetTheTeam')}
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                 {t('cover.slogan')}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {aboutStats.map((item,idx)=>(
                    <div key={idx}>
                    <div className="text-3xl font-bold text-yellow-300">{item.value}</div>
                    <div className="text-sm opacity-90">
                      {item.label}
                    </div>
                  </div>
                  ))}
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <Trophy size={40} />
        </div>
        <div
          className="absolute bottom-20 right-10 opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <Target size={35} />
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-8">
           {t('about.summary.title')}
          </h2>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                         {t('about.summary.house')}
 <strong className="text-[#14A800]"> AFRICA CLEAN</strong>{summaryPhrase[0] }
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
          {  summaryPhrase[1]}
            </p>
            <p className="text-xl font-semibold text-[#14A800]">
             {summaryPhrase[2]}
            </p>
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section
        id="histoire"
        className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
             {t('cover.ourHistory')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
               {t('about.history.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {historyStats.map((item,idx)=>{
                const Icon = IconMaping[item.icon]
                return(
                   <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Icon size={30} className="text-[#14A800] mr-4" />
                  <h3 className="text-2xl font-bold text-[#212121]">
                  {item.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {item.subtitle}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
                )
              })}
             
          </div>

          {/* Timeline des récompenses */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#212121] text-center mb-12">
             {t('cover.ourDistinctions')}
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#14A800] h-full hidden lg:block"></div>

              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } flex-col lg:flex`}
                  >
                    <div
                      className={`lg:w-1/2 ${
                        index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                      } mb-4 lg:mb-0`}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center mb-4">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4"
                            style={{ backgroundColor: achievement.color }}
                          >
                            {achievement.year}
                          </div>
                          <h4 className="font-bold text-lg text-[#212121]">
                            {achievement.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 mb-2">
                          {achievement.description}
                        </p>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: achievement.color }}
                        >
                          {achievement.organization}
                        </p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden lg:block w-4 h-4 rounded-full bg-[#14A800] border-4 border-white shadow-lg z-10"></div>

                    <div className="lg:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Valeurs */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
             {t('cover.ourVision')}, Vision & {t('cover.values')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('cover.missionSlogan')}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-full p-2 flex space-x-2">
              {[
                {
                  key: "mission",
                  label: "Mission",
                  icon: <Target size={20} />,
                },
                { key: "vision", label: "Vision", icon: <Eye size={20} /> },
                { key: "values", label: t('cover.values'), icon: <Heart size={20} /> },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() =>
                    setActiveTab(tab.key as "mission" | "vision" | "values")
                  }
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-[#14A800] text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "mission" && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-3xl p-8 lg:p-12 text-center">
                <Target size={60} className="text-[#14A800] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212121] mb-6">
                 {t('cover.ourMission')}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('cover.house')} <strong className="text-[#14A800]">AFRICA CLEAN </strong>,
                  {tabContent[0]}
                </p>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-8 lg:p-12 text-center">
                <Eye size={60} className="text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#212121] mb-6">
                                 {t('cover.ourVision')}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
               { tabContent[1]}
                </p>
              </div>
            )}

            {activeTab === "values" && (
              <div className="grid md:grid-cols-2 gap-8">
                {coreValues.map((value, index) => {
                  const Icon = IconMaping[value.icon]
                  return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border-l-4"
                    style={{ borderColor: value.color }}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className="p-3 rounded-full mr-4"
                        style={{ backgroundColor: value.color, color: "white" }}
                      >
                        <Icon size={30}  />
                      </div>
                      <h4 className="text-xl font-bold text-[#212121]">
                        {value.title}
                      </h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                )})}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Équipe Section */}
      <section
        id="equipe"
        className="py-16 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
             {t('about.teamSection.title')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                           {t('about.teamSection.description')}

            </p>
          </div>

          {/* Promoteur Profile */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="lg:flex">
                <div className="lg:w-1/3 bg-gradient-to-br from-[#14A800] to-[#128700] p-8 text-white text-center">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                    <img
                      src="/images/team/lucien-agbeko.jpg"
                      alt="AGBEKO Koffi Lucien"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/images/Lucien-Koffi-Agbeko.jpg";
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    AGBEKO Koffi Lucien
                  </h3>
                  <p className="text-lg opacity-90 mb-4">{t('cover.badge')}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="tel:+22890453153"
                      className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all"
                    >
                      <Phone size={20} />
                    </a>
                    <a
                      href="mailto:africaclean.contact@gmail.com"
                      className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all"
                    >
                      <EnvelopeSimple size={20} />
                    </a>
                  </div>
                </div>

                <div className="lg:w-2/3 p-8 lg:p-12">
                  <h4 className="text-2xl font-bold text-[#212121] mb-6">
                   {profile.title}
                  </h4>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <GraduationCap
                        size={24}
                        className="text-[#14A800] mr-4 mt-1 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-semibold text-lg text-[#212121] mb-2">
                        {profile.formationAcademique.title}
                        </h5>
                        <ul className="text-gray-700 space-y-1">
                          {profile.formationAcademique.items.map((items,idx)=>(
                          <li key={idx}>• {items}</li>

                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Briefcase
                        size={24}
                        className="text-[#14A800] mr-4 mt-1 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-semibold text-lg text-[#212121] mb-2">
                         {profile.formationsComplementaires.title}
                        </h5>
                        <ul className="text-gray-700 space-y-1">
                        {profile.formationsComplementaires.items.map((items,idx)=>(
                          <li key={idx}>• {items}</li>

                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <User
                        size={24}
                        className="text-[#14A800] mr-4 mt-1 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-semibold text-lg text-[#212121] mb-2">
                         {profile.experience.title}
                        </h5>
                        <p className="text-gray-700">
                                               {profile.experience.description}

                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Values */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#212121] mb-8">
            {t('about.teamsValue.title')}
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            {t('about.teamsValue.description')}
            </p>
            <button
              onClick={() => (window.location.href = "/contact")}
              className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center mx-auto space-x-2"
            >
              <Users size={20} />
              <span>{t('cover.joiningTheTeam')}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir Africa Clean */}
      <section className="py-16 bg-[#14A800] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
             { whyChooseUs.title}
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
             { whyChooseUs.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.features.map((feature, index) => {
              const Icon = IconMaping[feature.icon]
              return(
              <div
                key={index}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center"
              >
                <div className="text-yellow-300 mb-4 flex justify-center">
                  <Icon  size={30}/>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="opacity-90">{feature.subtitle}</p>
              </div>
            )})}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                {t('cover.discoverQualify')}
              </h3>
              <p className="text-lg opacity-90 mb-6">
                              {t('cover.discover')}

              </p>
              <button
                onClick={() => (window.location.href = "/quote")}
                className="bg-white text-[#14A800] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                                         {t('cover.ClaimYourOffer')}

              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-6">
           {t('about.cTAContact.title')}
          </h2>
          <p className="text-xl text-gray-700 mb-8">
                     {t('about.cTAContact.description')}

          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="bg-[#14A800] hover:bg-[#128700] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {t('cover.contactUs')}
            </button>
            <button
              onClick={() => (window.location.href = "/quote")}
              className="border-2 border-[#14A800] text-[#14A800] px-8 py-4 rounded-full font-semibold hover:bg-[#14A800] hover:text-white transition-all duration-300"
            >
              {t('cover.quote')}

            </button>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default AboutPage;
