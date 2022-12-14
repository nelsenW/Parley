import { useDispatch, useSelector } from "react-redux";
import "./friendshipContent.css";
import { useRef, useEffect } from "react";
import Message from "../../Messages";
import MessageForm from "../../Messages/messageForm";
import consumer from "../../../consumer";
import { showFriendship } from "../../../store/friendships";
import { receiveDM, removeDM } from "../../../store/dms";

export default function FriendshipContent({
  friendship,
  wumpusClass,
  wumpusText,
}) {
  const dispatch = useDispatch();
  const prevId = useRef();
  let dms = useSelector((state) =>
    state.dms ? Object.values(state.dms) : [{ text: "No Messages Yet" }]
  );
  let subscription;
  const sessionUser = useSelector((state) => state.session.currentUser.id);

  const enterFriendship = () => {
    subscription = consumer.subscriptions.create(
      { channel: "FriendshipsChannel", id: friendship.id },
      {
        received: ({ type, dm, user, id }) => {
          switch (type) {
            case "RECEIVE_USER":
              break;
            case "REMOVE_USER":
              break;
            case "RECEIVE_DM":
              dispatch(receiveDM(dm));
              break;
            case "DESTROY_DM":
              dispatch(removeDM(id));
              break;
            default:
              break;
          }
        },
      }
    );
  };

  useEffect(() => {
    if (friendship?.id) {
      dispatch(showFriendship(friendship.id));
    }
    if (friendship?.id && friendship.id !== prevId) {
      prevId.current = friendship.id;
      subscription?.unsubscribe();
      enterFriendship();
    }
    return () => {
      subscription?.unsubscribe();
    };
  }, [friendship, dms.length]);

  return friendship ? (
    <div className="outer-center">
      <div className="center-column">
        <ul className="friendship-dms">
          <div id="no-message-card">
            {friendship?.user?.photo ? (
              <img
                src={friendship?.user?.photo}
                style={{ backgroundColor: "transparent" }}
                className="dm-userIcon"
              />
            ) : (
              <i
                className="fa-solid fa-skull-crossbones dm-userIcon"
                style={{ backgroundColor: `${friendship?.user?.color}` }}
              ></i>
            )}
            <h1>{friendship?.user?.username}</h1>
            <p>
              This is the beginning of your direct message history with @
              {friendship?.user?.username}
            </p>
          </div>
          {dms.map((dm) => {
            let modify = false;
            if (dm.userId === sessionUser) {
              modify = true;
            }
            return <Message {...dm} modify={modify} />;
          })}
        </ul>
      </div>
        <MessageForm friendship={friendship} />
    </div>
  ) : (
    <div className="center-column">
      <div id="list">
        <div className={wumpusClass}></div>
        <p>{wumpusText}</p>
      </div>
    </div>
  );
}
