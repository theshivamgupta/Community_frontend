import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
/* import logo from '../../logo.svg'; */
import { Link, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../auth/isAuthenticated";
import logo from "../../logo.svg";
import defaultImage from "../../assets/images/defaultImage.jpg";
import { UserContext } from "../../App";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { myContext } from "../../context/NewPostContext";
import "./NavBar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const isAuth = isAuthenticated();
  const { me, currentUserId } = React.useContext(UserContext);
  const { openPost, handleClickNew, handleFlagModal } =
    React.useContext(myContext);
  const location = useLocation();

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="Logo" />
        </div>
        {isAuth && (
          <div className="gpt3__navbar-links_container">
            <p>
              <Link to={"/dash"}>Home</Link>
            </p>
            {/* <p>
              <a href="#wgpt3">What is GPT3?</a>
            </p>
            <p>
              <a href="#possibility">Open AI</a>
            </p>
            <p>
              <a href="#features">Case Studies</a>
            </p> */}
            {location.pathname === "/dash" && (
              <p>
                <button
                  className="btn btn-primary"
                  onClick={handleClickNew}
                  disabled={openPost}
                >
                  {/* Small */}
                  <ControlPointIcon /> New
                </button>
              </p>
            )}
          </div>
        )}
      </div>
      {!isAuth && (
        <div className="gpt3__navbar-sign">
          <Link to={`accounts/login`}>
            <p>Sign in</p>
          </Link>
          <Link to={`/accounts/signup`}>
            <button
              type="button"
              style={{ borderRadius: "19px" }}
              className="signup__button"
            >
              Sign up
            </button>
          </Link>
          {openPopover && (
            <div className="profile__navbar-menu_container scale-up-center">
              <div className="gpt3__navbar-menu_container-links">
                <p>
                  <a href="#home">Home</a>
                </p>
                <p>
                  <a href="#wgpt3">What is GPT3?</a>
                </p>
                <p>
                  <a href="#possibility">Open AI</a>
                </p>
                <p>
                  <a href="#features">Case Studies</a>
                </p>
                <p>
                  <a href="#blog">Library</a>
                </p>
              </div>

              <div className="gpt3__navbar-menu_container-links-sign">
                <p>Sign in</p>
                <button type="button">Sign up</button>
              </div>
            </div>
          )}
        </div>
      )}
      {isAuth && (
        <>
          {me?.moderatorLevel <= 1 && (
            <button
              type="button"
              className="btn btn-outline-danger mr-6"
              onClick={handleFlagModal}
            >
              Flagged Comment
            </button>
          )}
          <div
            onClick={() => {
              // console.log("iage clicked");
              // setToggleMenu(true);
              setOpenPopover(!openPopover);
            }}
            style={{
              cursor: "pointer",
            }}
            className="profile__navbar-menu"
          >
            <Avatar src={defaultImage} />
            {openPopover && (
              <div className="profile__navbar-menu_container scale-up-center">
                <div className="gpt3__navbar-menu_container-links text-white">
                  <p>
                    Moderator Level{" "}
                    <span className="text-blue-300">{me?.moderatorLevel}</span>
                  </p>
                  <p>
                    <Link to={`/u/${currentUserId}`}>Profile</Link>
                  </p>
                  <p>
                    <a
                      href="#blog"
                      className="text-white"
                      style={{
                        padding: "0.5rem 1rem",
                        color: "#fff",
                        background: "#ff4820",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "25px",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      Logout
                    </a>
                  </p>
                </div>

                {/* <div className="gpt3__navbar-menu_container-links-sign">
                  <p>Sign in</p>
                  <button
                    type="button"
                    style={{
                      padding: "0.5rem 1rem",
                      color: "#fff",
                      background: "#ff4820",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "25px",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    Sign up
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </>
      )}
      {!isAuth && (
        <div className="gpt3__navbar-menu">
          {toggleMenu ? (
            <RiCloseLine
              color="#fff"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#fff"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className="gpt3__navbar-menu_container scale-up-center">
              {/* {console.log({ toggleMenu })} */}
              <div className="gpt3__navbar-menu_container-links">
                <p>
                  <a href="#home">Home</a>
                </p>
                <p>
                  <a href="#wgpt3">What is GPT3?</a>
                </p>
                <p>
                  <a href="#possibility">Open AI</a>
                </p>
                <p>
                  <a href="#features">Case Studies</a>
                </p>
                <p>
                  <a href="#blog">Library</a>
                </p>
              </div>

              <div className="gpt3__navbar-menu_container-links-sign">
                <p>Sign in</p>
                <button type="button">Sign up</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
