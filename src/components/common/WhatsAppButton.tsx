import { WhatsappLogo } from "@phosphor-icons/react";

const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://wa.me/22890453153"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 animate-pulse"
    >
      <WhatsappLogo size={28} />
    </a>
  );
};

export default WhatsAppFloatingButton;
