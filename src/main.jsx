import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterWrapper } from "./utils/routes.jsx";
import { Web3Provider } from "./Context/Context.jsx";
import ComContext from "./Context/ComContext.jsx";
import { EventProvider } from "./hooks/backend.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Web3Provider>
      <ComContext>
        <EventProvider>
          <RouterWrapper />
        </EventProvider>
      </ComContext>
    </Web3Provider>
  </StrictMode>
);
