import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {
      console.error("Error liking post:", err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const renderMedia = () => {
    if (typeof post.img === 'string') {
      const fileExtension = post.img.split('.').pop().toLowerCase();

      if (fileExtension === "jpg" || fileExtension === "png") {
        return <img className="postImg" src={`${PF}${post.img}`} alt="" />;
      } else if (fileExtension === "mp4") {
        return (
          <video className="postVideo" controls>
            <source src={`${PF}${post.img}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      } else if (fileExtension === "pdf") {
        return (
          <object
            data={`${PF}${post.img}`}
            type="application/pdf"
            width="100%"
            height="500px"
          >
            <p>This browser does not support PDFs. Please download the PDF to view it.</p>
          </object>
        );
      } else if (fileExtension === "doc") {
        // Handle DOC files here
        return (
          <a href={`${PF}${post.img}`} target="_blank" rel="noopener noreferrer">
            View DOC File
          </a>
        );
      } else {
        // Handle other file types or display an error message here
        return <p>Unsupported file type</p>;
      }
    } else {
      // Handle the case where post.img is not a string (e.g., when there is no image)
      return null;
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? `${PF}${user.profilePicture}`
                    : `${PF}person/noAvatar.png`
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {renderMedia()}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
