import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './root.css';

function App() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            localStorage.setItem("token", codeResponse.access_token);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    console.log('myCS', res)
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('token', token);
        if (token !== null) {
            console.log('user already logged in');
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    console.log('myCS', res)
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
        localStorage.removeItem('token');
    };

    return (
        <div>
            <p>peu importe</p>
            {profile ? (
                <div>
                    <img id="login-menu" src={profile.picture} alt="illustrative" />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}

/* export async function loader() {
    const contacts = await getEvents();
    console.log(contacts);
} */
export default App;