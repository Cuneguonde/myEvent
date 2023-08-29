import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1 class="title">My Event</h1>
      </div>

      <nav id="navbar">
        <ul>
          <li>
            <a href={`/geoloc`}>Geoloc</a>
          </li>
          <li>
            <a href={`/events`}>Listing events</a>
          </li>
        </ul>
      </nav>

      <div id="outlet">
        <Outlet />
      </div>
    </>
  );
}