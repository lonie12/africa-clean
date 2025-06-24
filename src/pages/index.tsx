import RootLayout from "@/app.layout";
import { createBrowserRouter, RouterProvider } from "react-router";
// import HomePage from "./home";
import NotFound from "./NotFound";
import { mainRoutes } from "@/lib/routes/main.routes";
import HomePage from "./home";
import Layout from "@/components/layout/Layout";
import { adminRoutes, authRoutes } from "@/lib/routes/admin.routes";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
        ],
      },
      mainRoutes,
      adminRoutes,
      authRoutes,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
