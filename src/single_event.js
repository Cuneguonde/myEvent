import * as React from "react";
import { useLoaderData } from "react-router-dom";
import { useParams } from 'react-router-dom';


const SingleEvent = () => {
    const { id } = useParams();
    const event = useLoaderData();
    const singleEvent = event.results;
    console.log('event', singleEvent);

    return (
        <>
            {
                singleEvent.map((event) =>
                    <div>
                        <p>{event.location_city}</p>
                        <p>{event.title_fr}</p>
                        <img src={event.image} class="image" />
                        <div dangerouslySetInnerHTML={{ __html: event.longdescription_fr }}></div>
                        {/*                        <div>
                            {event.longdescription_fr}
                            <p>{event.location_address}</p>
                        </div> */}
                    </div>
                )
            }
        </>
    )
}

export default SingleEvent