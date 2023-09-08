import App from "../routes/root.js";
import './App.css';

function Header() {
    return (
        <div id="header">
            <div>
                <img id="main-logo" src={require('./logo.png')} alt="logo"/>
            </div>
            <a href="/"><h1>My Event</h1></a>
            <div id="main-login">
            <App />
            </div>
        </div>
    );
}

export default Header;