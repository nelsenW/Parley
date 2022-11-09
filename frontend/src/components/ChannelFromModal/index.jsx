import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { receiveChannel } from "../../store/channels";
import csrfFetch from "../../store/csrf";
import "./channelForm.css";

function NewChannelForm({ setChannelModal }) {
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const [channelName, setChannelName] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrfFetch("/api/channels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: {
          name: channelName,
          server_id: serverId,
          channel_type: "text",
        },
      }),
    })
      .then((res) => res.json())
      .then((channel) => {
        dispatch(receiveChannel(channel));
        setChannelModal(false);
      });
  };

  return (
    <div className="channel-form-modal">
      <div className="channel-form-header">
        <h1>Create Channel</h1>
        <div id="esc-toolbar" onClick={() => setChannelModal(false)}>
          <div id="esc-button">
            <svg role="img" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <form id="channel-form" onSubmit={handleSubmit}>
        <h2>Channel Name</h2>
        <div id="channel-name-input">
          <h3>#</h3>
          <input
            type="text"
            placeholder="new-channel"
            value={channelName}
            onChange={(e) => {
              setChannelName(e.target.value);
            }}
          ></input>
        </div>
        <div className="channel-buttons">
          <button
            id="cancel-button"
            type="button"
            onClick={() => setChannelModal(false)}
          >
            Cancel
          </button>
          <button id="create-channel" type="submit">
            Create Channel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewChannelForm;
