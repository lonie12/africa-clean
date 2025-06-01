import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./pages";

createRoot(document.getElementById("root")!).render(<AppRouter />);
