import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { UseCompCtx } from "../Context/ComContext";
import Footer from "../Components/Footer";
import HomePage from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import MainDashboard from "../Dashboard/Dashboard";
import EventContent from "../Dashboard/Components/APS/EventContent";
import Passes from "../Dashboard/Pages/Passes";
import Analytics from "../Dashboard/Pages/Analytics";
import User from "../Dashboard/Pages/User";
import Header from "../Components/Headers";
import TokenInfo from "../Dashboard/Components/Token/TokenInfo";
import ApproveToken from "../Dashboard/Components/Token/ApproveToken";
import TransferToken from "../Dashboard/Components/Token/TransferToken";
import MintToken from "../Dashboard/Components/Token/MintToken";
import Event from "../Pages/Event";
import EventDetails from "../Pages/EventDetails";
import Allowance from "../Dashboard/Components/Token/Allowance";

export const RouterWrapper = () => {
  const {
    handleBuyPass,
    handleEditEvent,
    handleViewEvent,
    handleCreateEvent,
    Events,
    setEventId,
    handleUpdateEvent,
  } = UseCompCtx();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto">
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
          element: <Event />,
        },
        {
          path: "events/:_id/:id",
          element: <EventDetails />,
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
      children: [
        {
          index: true,
          element: (
            <MainDashboard onCreateEvent={handleCreateEvent} events={Events} />
          ),
        },
        {
          path: "events",
          element: (
            <EventContent
              events={Events}
              onCreateEvent={handleCreateEvent}
              onViewEvent={handleViewEvent}
              onEditEvent={handleEditEvent}
              onBuyPass={handleBuyPass}
              setEventId={setEventId}
              handleUpdateEvent={handleUpdateEvent}
            />
          ),
        },
        {
          path: "passes",
          element: <Passes />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "users",
          element: <User />,
        },
        {
          path: "token-info",
          element: <TokenInfo />,
        },
        {
          path: "approve-token",
          element: <ApproveToken />,
        },
        {
          path: "transfer-token",
          element: <TransferToken />,
        },
        {
          path: "mint-token",
          element: <MintToken />,
        },
        {
          path: "allowance",
          element: <Allowance />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};
