
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './root.css'

function App() {
    const [ profile, setProfile ] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            get_google_user(codeResponse);
            localStorage.setItem("token", codeResponse.access_token);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const get_google_user = (user) => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                mode: "cors",
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                console.log('myCS',res)
                setProfile(res.data);
                register_user(res.data);
            })
            .catch((err) => console.log(err));
    };

    const register_user = (user) => {
        console.log('try register: ', user);
        var formdata = new FormData();
        formdata.append("name", user.name);
        formdata.append("google_id", user.id);
        formdata.append("email", user.email);
        formdata.append("avatar", user.picture);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        };

        fetch("http://127.0.0.1:8000/user/create", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('token', token);
        if(token !== null) {
            console.log('user already logged in');
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    console.log('myCS',res)
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
            <p>React Google Login</p>
            {profile ? (
                <div>
                    <img id="login-menu" src={profile.picture} alt="illustrative" />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}
export default App;