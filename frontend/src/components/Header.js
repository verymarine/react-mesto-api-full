import Logo from "../images/logo.svg";
import { Link, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={Logo} alt="Логотип Место" />
      <p className={`${props.userEmail && "header__email"}`}>{props.userEmail}</p>
        <Link
          to={`/${props.linkHeader}`} className="header__auth" onClick={props.exit}>
          {props.textAuth} 
        </Link>
    </header>
  );
}
export default Header;
