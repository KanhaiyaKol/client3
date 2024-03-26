import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import React from 'react';
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
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id); // Use optional chaining to access user._id safely
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user?.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user?._id); // Use optional chaining to access user._id safely
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]); // Use optional chaining to access user._id safely

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const res = await axios.get("/messages/" + currentChat._id);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentChat) {
      const message = {
        sender: user?._id, // Use optional chaining to access user._id safely
        text: newMessage,
        conversationId: currentChat._id,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== user?._id // Use optional chaining to access user._id safely
      );

      socket.current.emit("sendMessage", {
        senderId: user?._id, // Use optional chaining to access user._id safely
        receiverId,
        text: newMessage,
      });

      try {
        const res = await axios.post("/messages", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? ( // Check if currentChat is not null
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === user?._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user?.id} // Use optional chaining
              setCurrentChat={setCurrentChat}
            />
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