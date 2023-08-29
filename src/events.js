import { Outlet, useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";


const Events = () => {

  const albums = useLoaderData();

  const events = albums.results;

  console.log(events)

  return (
    <>
      <ul>
        {events.map((index) =>
          <li key={index.title_fr}>
            <Link to={`/single-event/${index.uid}`}>{index.title_fr}</Link>
          </li>
        )}
      </ul>
    </>
  )
}

export default Events