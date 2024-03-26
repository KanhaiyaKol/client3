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

export default function Library() {




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

       
      </div>
    </div>
    
      

      <footer className="footer">
        {/* Footer content goes here */}
        <p>&copy; 2024 TechnoReader. All rights reserved.</p>
      </footer>
    </>
  );
}
