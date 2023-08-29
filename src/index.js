import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from "./routes/root";
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
          console.log('params',params)
          return fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?where=uid%20%3D%20${params.id}`)
        }
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);