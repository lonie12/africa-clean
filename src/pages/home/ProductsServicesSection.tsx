import React from "react";
import { CheckCircle, Leaf, Recycle, type IconProps } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const iconMap: Record<string, React.FC<IconProps>> = {
  Recycle,
  Leaf,
  CheckCircle
};

const ProductsServicesOverview: React.FC = () => {
  const { t } = useTranslation();

  const products = t("productsServices.products", { returnObjects: true }) as {
    title: string;
    description: string;
    href: string;
    icon: "Recycle" | "Leaf" | "CheckCircle";
  }[];

  const services = t("productsServices.services", { returnObjects: true }) as string[];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            {t("productsServices.title")}
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t("productsServices.intro")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Produits */}
          <div>
            <h3 className="text-2xl font-bold text-[#212121] mb-6">
              {t("productsServices.productsTitle")}
            </h3>
            <div className="space-y-6">
              {products.map((product, idx) => {
                const Icon = iconMap[product.icon];
                return (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#14A800]/10 p-3 rounded-lg">
                        <Icon size={32} className="text-[#14A800]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-2">
                          {product.title}
                        </h4>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <a
                          href={product.href}
                          className="text-[#14A800] font-semibold hover:underline"
                        >
                          {t('cover.more')} →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-2xl font-bold text-[#212121] mb-6">
              {t("productsServices.servicesTitle")}
            </h3>
            <div className="space-y-4 mb-8">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle
                    size={20}
                    className="text-[#14A800] flex-shrink-0"
                  />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
            <a
              href="/services"
              className="mt-6 bg-[#14A800] hover:bg-[#128700] text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              {t("productsServices.servicesCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsServicesOverview;
