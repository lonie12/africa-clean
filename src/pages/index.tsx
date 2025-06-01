import RootLayout from "@/app.layout";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./home";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
