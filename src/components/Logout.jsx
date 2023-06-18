import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const Avatar = styled.div`
  display: flex;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #fff;
  padding: 10px 22px;
  color: #010606;
  border: solid 1px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: transparent;
    color: #fff;
  }
`;

const Logout = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const [userImages, setUserImages] = useState({});

  const logOut = () => {
    localStorage.removeItem("authenticated");
    setAuthenticated(false);
    console.log("logout success");
  };

  const avatarImage = authenticated ? userImages[authenticated]?.image : null;

  return (
    <>
      {authenticated && (
        <Avatar>
          <img src={avatarImage} alt="" />
        </Avatar>
      )}
      <NavBtn>
        <NavBtnLink to="/" onClick={logOut}>
          Log out
        </NavBtnLink>
      </NavBtn>
    </>
  );
};

export default Logout;
