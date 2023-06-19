import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import logoImage from "../img/icons8-question-mark-96.png";
import Logout from "./Logout";

const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((50vw - 500px) / 2);
  z-index: 10;
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const Header = ({ showLogout }) => (
  <>
    <Nav>
      <NavLink to="/mainPage">
        <img src={logoImage} alt="logo" />
        <h1>DevQuiz&Chat</h1>
      </NavLink>
      <Bars />
      {showLogout && <Logout />}
    </Nav>
  </>
);

export default Header;
