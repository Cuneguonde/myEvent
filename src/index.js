import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Outlet } from "react-router-dom";
import { getLocation as loader } from "./events"
import Home from "./home.js";
import GetUserLocation from "./geoloc.js";
import ListEvents from "./list_events.js";
import SingleEvent from "./single_event.js";
import Header from "./header_footer/header.js";
import Footer from "./header_footer/footer.js";


// send to JJ https://www.youtube.com/@Solidjj

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

function Layout() {
  return (
    <>
      <Header />
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
        element: <GetUserLocation />,
      },
      {
        path: "/events",
        element: <ListEvents />,
        loader: async () => {
          return fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=20`)
        }
      },
      {
        path: "/single-event/:id",
        element: <SingleEvent />,
        loader: async ({ params }) => {
          console.log('params', params)
          return fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?where=uid%20%3D%20${params.id}`)
        }
      },
      {
        path: "/events_geo",
        element: <ListEvents />,
        loader: loader
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