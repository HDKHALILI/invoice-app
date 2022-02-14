import logo from "../assets/logo.svg";
import iconSun from "../assets/icon-sun.svg";
import iconMoon from "../assets/icon-moon.svg";
import avatar from "../assets/image-avatar.jpg";

import "../styles/Nav.css";

function Nav() {
  return (
    <nav className="Nav">
      <div className="Nav-actions">
        <div className="Nav-logo-container">
          <img src={logo} alt="logo" className="Nav-logo" />
        </div>
        <button className="Nav-theme-selector">
          <img src={iconMoon} alt="theme" className="Nav-icon" />
        </button>
      </div>
      <div className="Nav-profile">
        <div className="Nav-avatar-container">
          <img src={avatar} alt="avatar" className="Nav-avatar" />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
