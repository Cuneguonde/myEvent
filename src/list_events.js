import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";


const ListEvents = () => {

  const albums = useLoaderData();
  console.log('myStilo', albums)
  const events = albums.results;

  console.log('myStilo1', events)

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

export default ListEvents