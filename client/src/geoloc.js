import React from "react";
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";


function GeoLoc() {

    const [userLocation, setUserLocation] = useState(null);
    //const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

    useEffect(() => {

        //if (!hasRequestedLocation) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ latitude, longitude });
                        console.log(userLocation)
                        //setHasRequestedLocation(true); // Set the flag to true so we don't request again
                    });
          //  }
        }
    }, []);

    return (
        <div>
            <h1>Geolocation App</h1>
            {/* create a button that is mapped to the function which retrieves the users location */}
            {/*             <button onClick={}>Get User Location</button>
 */}            {/* if the user location variable has a value, print the users location */}
            {userLocation && (
                <div>
                    <h2>User Location</h2>
                    <p>Latitude: {userLocation.latitude}</p>
                    <p>Longitude: {userLocation.longitude}</p>
                    <Link to={userLocation.latitude}>{userLocation.longitude}</Link>
                </div>
            )}
        </div>
    );
};

export default GeoLoc;