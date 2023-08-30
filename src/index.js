import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [

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
  {
    path: "/home",
    element: <Home />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="515988295110-cte5msacd45k78l34bspfgfptpvranm6.apps.googleusercontent.com">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>,
);