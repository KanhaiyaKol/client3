import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import
{
  Search,
  Person,
  Chat,
  Notifications,
  LibraryBooks,
  VideoLibrary,
  Home,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      
      
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={ { textDecoration: "none" } }>
          <span className="logo animated-logo">TechnoReader</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for a friend, post, or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/sidebar" style={ { textDecoration: "none" } }>
            <Home />
            <span className="topbarLink"></span>
          </Link>

          <Link to="/" style={ { textDecoration: "none" } }>
            <VideoLibrary />
            <span className="topbarLink"></span>
          </Link>

          <Link to="/library" style={ { textDecoration: "none" } }>
            <LibraryBooks />
            <span className="topbarLink"></span>
          </Link>
          <Link to="/Users" style={ { textDecoration: "none" } }>
            <Person />
            <span className="topbarLink"></span>
          </Link>

          <Link to="/" style={ { textDecoration: "none" } }>
            <Notifications />
            <span className="topbarLink"></span>
          </Link>
          <Link to="/messenger">
            <Chat />
            <span className="topbarLink"></span>
          </Link>

        </div>

       
      </div>
    </div>
    
     

      <div className="login">
        <div className="loginWrapper">
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
              <input
                placeholder="Username"
                required
                ref={username}
                className="loginInput"
              />
              <input
                placeholder="Email"
                required
                ref={email}
                className="loginInput"
                type="email"
              />
              <input
                placeholder="Password"
                required
                ref={password}
                className="loginInput"
                type="password"
                minLength="6"
              />
              <input
                placeholder="Password Again"
                required
                ref={passwordAgain}
                className="loginInput"
                type="password"
              />
              <button className="loginButton" type="submit">
                Sign Up
              </button>
              <button
                className="custom-button"
                onClick={() => history.push("/login")}
              >
                Go to Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="footer">
        {/* Footer content goes here */}
        <p>&copy; 2024 TechnoReader. All rights reserved.</p>
      </footer>
    </>
  );
}
