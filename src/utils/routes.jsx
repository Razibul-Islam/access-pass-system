import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Header from "../Components/Headers";
import Footer from "../Components/Footer";
import HomePage from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <App />
        </main>
        <Footer />
      </div>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <div>Events</div>,
      },
      {
        path: "passes",
        element: <div>Passes</div>,
      },
      {
        path: "treasury",
        element: <div>Treasury</div>,
      },
    ],
  },
  {
    path: "/admin",
    element: <Dashboard />,
  },
]);
