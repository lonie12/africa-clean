// import ContactPage from "@/pages/contact";
// import QuotePage from "@/pages/quote";
// import NotFound from "@/pages/NotFound";

// Service concept pages
// import NettoyageProPage from "@/pages/services/concepts/nettoie-pro";
// import EcoJardinPage from "@/pages/services/concepts/eco-jardin";
// import NaturaPotagerPage from "@/pages/services/concepts/natura-potager";
// import NettoyageEventPage from "@/pages/services/concepts/nettoie-event";
// import EcoEventPage from "@/pages/services/concepts/eco-event";
// import FormationsPage from "@/pages/services/formations";

// // Product detail pages
// import EcoTrashPage from "@/pages/products/ecotrash";
// import CleaningProductsPage from "@/pages/products/cleaning-products";

import type { RouteObject } from "react-router";
// import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ProductsPage from "@/pages/products";
import ServicesPage from "@/pages/services";
import GalleryPage from "@/pages/gallery";
import BlogPage from "@/pages/blog";
import ContactPage from "@/pages/contact";
import QuotePage from "@/pages/quote";
import Layout from "@/components/layout/Layout";

export const mainRoutes: RouteObject = {
  element: <Layout />,
  children: [
    {
      path: "/a-propos",
      element: <AboutPage />,
    },
    {
      path: "/produits",
      element: <ProductsPage />,
    },
    {
      path: "/services",
      element: <ServicesPage />,
    },
    {
      path: "/galeries",
      element: <GalleryPage />,
    },
    {
      path: "/blog",
      element: <BlogPage />,
    },
    {
      path: "/blog/:slug",
      element: <BlogPage />, // Blog detail page
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/quote",
      element: <QuotePage />,
    },
  ],
};
