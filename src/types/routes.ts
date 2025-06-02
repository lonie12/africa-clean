export interface RouteConfig {
  path: string;
  name: string;
  component: React.ComponentType;
  protected?: boolean;
  children?: RouteConfig[];
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Produits",
    href: "/produits",
    children: [
      { label: "Poubelles EcoTrash", href: "/produits/ecotrash" },
      { label: "Produits d'Entretien", href: "/produits/produits-entretien" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Nettoie-Pro", href: "/services/nettoie-pro" },
      { label: "Eco-Jardin", href: "/services/eco-jardin" },
      { label: "Natura-Potager", href: "/services/natura-potager" },
      { label: "Nettoie-Event", href: "/services/nettoie-event" },
      { label: "Éco-Event", href: "/services/eco-event" },
      { label: "Formations", href: "/services/formations" },
    ],
  },
  { label: "À Propos", href: "/a-propos" },
  { label: "Galeries", href: "/galeries" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
