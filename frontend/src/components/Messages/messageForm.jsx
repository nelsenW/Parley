import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createMessage } from "../../store/messages";

export default function MessageForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { serverId } = useParams();
  const userId = useSelector((state) => state.session.currentUser.id);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createMessage({ message: { text, userId, serverId } })).then(() =>
      setText("")
    );
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="messageForm">
          <button className="attachImage" type="button" title="Upload a file">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              className="ButtonPlus"
              fill="currentColor"
              d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
            ></path>
          </svg>
        </button>
        <div className="messageTextbox">
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
