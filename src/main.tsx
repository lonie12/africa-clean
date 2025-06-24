import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./pages";
import { ToastProvider } from "./context/toast-context";
import { ToastContainer } from "./components/Toast";
import { AuthProvider } from "./context/auth-context";
import { BlogProvider } from "./context/blog-context";

createRoot(document.getElementById("root")!).render(
 <AuthProvider>
    <BlogProvider>
      <ToastProvider>
        <AppRouter />
        <ToastContainer />
      </ToastProvider>
    </BlogProvider>
  </AuthProvider>
);
