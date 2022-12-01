import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditUserForm from "../UserFormModal";
import "./sideBar.css";
import { Modal } from "../../context/Modal";
import NewChannelForm from "../ChannelFromModal";
import VideoCall from "../VideoCallModal";
import { useEffect } from "react";
import { indexFriendship } from "../../store/friendships";
import FriendBubble from "./FriendBubble";

export default function SideBar({ setChannel, channels, name, type }) {
  const user = useSelector((state) => state.session.currentUser);
  const [userModal, setUserModal] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const color = user.color;
  const dispatch = useDispatch();
  const [channelModal, setChannelModal] = useState(false);
  const photo = user.photo ? (
    <img
      src={user.photo}
      style={{ backgroundColor: "transparent" }}
      className="sidebar-userIcon"
    />
  ) : (
    <i
      className="fa-solid fa-skull-crossbones sidebar-userIcon"
      style={{ backgroundColor: "transparent" }}
    ></i>
  );

  useEffect(() => {
    dispatch(indexFriendship());
  }, []);

  const friendships = useSelector((state) =>
    state.friendships ? Object.values(state.friendships) : []
  );

  return type === "user-page" ? (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>{user.username}</h1>
      </div>
      <div className="sidebar-main">
        <h1>Direct Messages: </h1>
        {friendships?.map((friend) => {
          return (
            <FriendBubble friend={friend}/>
          );
        })}
      </div>
      <div className="sidebar-profile-token">
        <div style={{ backgroundColor: `${color}` }} className="sidebar-user">
          {photo}
        </div>
        <h1>{user.username}</h1>
        <button className="settings-button" onClick={() => setUserModal(true)}>
          <svg
            aria-hidden="true"
            role="img"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
            ></path>
          </svg>
        </button>
        {userModal && (
          <Modal onClose={() => setUserModal(false)}>
            <EditUserForm setUserModal={setUserModal} />
          </Modal>
        )}
      </div>
    </div>
  ) : (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>{name}</h1>
      </div>
      <div className="sidebar-main">
        <h1>
          Text Channels
          <span>
            <button
              className="add-channel"
              onClick={() => setChannelModal(true)}
            >
              +
            </button>
          </span>
        </h1>

        {/* <button onClick={() => setVideoCall(true)}>Mystery button</button>
				{videoCall && (
					<Modal onClose={() => setVideoCall(false)}>
						<VideoCall setVideoCall = {setVideoCall}/>
					</Modal>
				)} */}

        {channelModal && (
          <Modal onClose={() => setChannelModal(false)}>
            <NewChannelForm setChannelModal={setChannelModal} />
          </Modal>
        )}
      </div>
      <div className="sidebar-profile-token">
        <div style={{ backgroundColor: `${color}` }} className="sidebar-user">
          {photo}
        </div>
        <h1>{user.username}</h1>
        <button className="settings-button" onClick={() => setUserModal(true)}>
          <svg
            aria-hidden="true"
            role="img"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
            ></path>
          </svg>
        </button>
        {userModal && (
          <Modal onClose={() => setUserModal(false)}>
            <EditUserForm setUserModal={setUserModal} />
          </Modal>
        )}
      </div>
    </div>
  );
}
