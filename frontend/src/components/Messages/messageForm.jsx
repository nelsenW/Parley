import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDM } from "../../store/dms";
import { createMessage, updateMessage } from "../../store/messages";

export default function MessageForm({ channel, friendship, editMessage, setEditMsg}) {
  const dispatch = useDispatch();
  const [text, setText] = useState(editMessage?.text ?? '');
  const userId = useSelector((state) => state.session.currentUser.id);
  const fileRef = useRef({});
  const [messageFile, setMessageFile] = useState("");
  const [messageUrl, setMessageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMessage) {
      dispatch(
        updateMessage({id: editMessage.id, text, userId, channelId: channel.id})
      )
      setEditMsg(false)
      return
    }
    if (channel) {
      const formData = new FormData();
      if (messageFile){
        formData.append('message[photo]', messageFile)
      }
      formData.append('message[channelId]', channel.id)
      formData.append('message[userId]', userId)
      formData.append('message[text]', text)
      dispatch(
        createMessage(formData)
      );
    } else {
      const formData = new FormData();
      if (messageFile){
        formData.append('dm[photo]', messageFile)
      }
      formData.append('dm[friendship_id]', friendship.id)
      formData.append('dm[user_id]', userId)
      formData.append('dm[text]', text)
      dispatch(createDM(formData));
    }
    setText("");
    setMessageUrl("");
    setMessageFile("");
  };

  const handleFile = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setMessageFile(file);
        setMessageUrl(fileReader.result);
      };
    }
  };

  const preview = messageUrl ? (
    <img
      src={messageUrl}
      className="message-preview"
      style={{ backgroundColor: "transparent" }}
    />
  ) : null;

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="messageForm">
        <div className="attachImage">
          <input
            className="messageFile"
            type="file"
            title="Upload a file"
            ref={fileRef}
            onChange={handleFile}
          ></input>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              className="ButtonPlus"
              fill="currentColor"
              d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
            ></path>
          </svg>
        </div>

        <div className="messageTextbox">
          {preview}
          <input
            className="messageInput"
            rows={text.split("\n").length}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter" && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            value={text}
          />
        </div>
      </form>
    </div>
  );
}
