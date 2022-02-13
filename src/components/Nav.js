import logo from "../assets/logo.svg";
import iconSun from "../assets/icon-sun.svg";
import iconMoon from "../assets/icon-moon.svg";
import avatar from "../assets/image-avatar.jpg";

function Nav() {
  return (
    <nav className="Nav">
      <div className="Nav-actions">
        <img src={logo} alt="logo" style={{ backgroundColor: "purple" }} />
        <img src={iconMoon} alt="" />
      </div>
      <div className="Nav-profile">
        <img src={avatar} alt="avatar" />
      </div>
    </nav>
  );
}

export default Nav;
