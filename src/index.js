import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Outlet } from "react-router-dom";
import Root from "./routes/root";
import Home from "./home.js";
import Geoloc from "./geoloc.js";
import Events from "./events.js";
import SingleEvent from "./single_event.js";

// send to JJ https://www.youtube.com/@Solidjj

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

function Headers() {
  return (
    <div className="header">
      <h1>Headers</h1>
      <Root />
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p>Footer</p>
    </div>
  );
}

function Layout() {
  return (
    <>
      <Headers />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    errorElement: () => <div>Not Found</div>,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/geoloc",
        element: <Geoloc />,
      },

      {
        path: "/events",
        element: <Events />,
        loader: async () => {
          return fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=20`)
        },
      },

      {
        path: "/single-event/:id",
        element: <SingleEvent />,
        loader: async ({ params }) => {
          console.log('params', params)
          return fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?where=uid%20%3D%20${params.id}`)
        }
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="515988295110-cte5msacd45k78l34bspfgfptpvranm6.apps.googleusercontent.com">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>,
);