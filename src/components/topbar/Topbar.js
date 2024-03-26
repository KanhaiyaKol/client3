import "./topbar.css";
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
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Messenger from "../../pages/messenger/Messenger";
import FriendsList from "../../pages/friendsList/FriendsList";

import React from 'react';

export default function Topbar ()
{
  const { user } = useContext( AuthContext );
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // Check if the user object is null or undefined before accessing its properties
  if ( !user )
  {
    // Handle the case where the user object is not available
    // You can return null, display a loading spinner, or take appropriate action
    return null;
  }

  return (
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

          <Link to="/MediaList" style={ { textDecoration: "none" } }>
            <VideoLibrary />
            <span className="topbarLink"></span>
          </Link>

          <Link to="/library" style={ { textDecoration: "none" } }>
            <LibraryBooks />
            <span className="topbarLink"></span>
          </Link>
          <Link to="/FriendsList" style={ { textDecoration: "none" } }>
            <Person />
            <span className="topbarLink"></span>
          </Link>

          <Link to="/FriendsList" style={ { textDecoration: "none" } }>
            <Notifications />
            <span className="topbarLink"></span>
          </Link>
          <Link to="/messenger">
            <Chat />
            <span className="topbarLink"></span>
          </Link>

        </div>

        <Link to={ `/profile/${ user.username }` }>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}




