import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./sideBar.css";
import { Modal } from "../../context/Modal";
import NewChannelForm from "../ChannelFromModal";
import VideoCall from "../VideoCallModal";
import { useEffect } from "react";
import { indexFriendship } from "../../store/friendships";
import FriendBubble from "./FriendBubble";
import ProfileToken from "./ProfileToken";

export default function SideBar({ name, type, setFriendship, friendship }) {
  const user = useSelector((state) => state.session.currentUser);
  const [videoCall, setVideoCall] = useState(false);
  const dispatch = useDispatch();
  const [channelModal, setChannelModal] = useState(false);

  const friendships = useSelector((state) =>
    state.friendships ? state.friendships : []
  );

  useEffect(() => {
    dispatch(indexFriendship());
  }, [friendships.length]);

  return type === "user-page" ? (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>{user.username}</h1>
      </div>
      <div className="sidebar-main">
        <h1>Direct Messages: </h1>
        {Object.values(friendships)?.map(friend=> {
          return friendship?.id === friend.id ? (
            <FriendBubble
              friend={friend}
              setFriendship={setFriendship}
              selected={'selected'}
            />
          ) : (
            <FriendBubble
              friend={friend}
              setFriendship={setFriendship}
            />
          );
        })}
      </div>
      <ProfileToken user={user} />
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

        {channelModal && (
          <Modal onClose={() => setChannelModal(false)}>
            <NewChannelForm setChannelModal={setChannelModal} />
          </Modal>
        )}
      </div>
      <ProfileToken user={user} />
    </div>
  );
}
