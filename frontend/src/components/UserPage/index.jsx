import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Modal } from "../../context/Modal";
import NewFriendForm from "../Modals/FriendFormModal";
import SideBar from "../Navigation/SideBar";
import SideNavBar from "../Navigation/SideNavBar";
import FriendshipContent from "./FriendshipContent";
import "./userpage.css";

export default function UserPage() {
  const [wumpusClass, setWumpusClass] = useState("");
  const [wumpusText, setWumpusText] = useState("");
  const [friendship, setFriendship] = useState("");
  const [friendModal, setFriendModal] = useState(false);

  const friendships = useSelector((state) =>
    state.friendships ? Object.values(state.friendships) : []
  );

  useEffect(() => {
    setFriendship(friendships[0]);
  }, [friendships.length]);

  const wumpusHandler = (arg) => {
    setWumpusClass(arg);
    switch (arg) {
      case "online":
        setWumpusText("No one's around to play with Wumpus.");
        break;
      case "all":
        setWumpusText("Wumpus is waiting on friends. You don't have to though");
        break;
      case "pending":
        setWumpusText(
          "There are no pending friend requests. Here's Wumpus for now."
        );
        break;
      case "blocked":
        setWumpusText("You can't unblock the Wumpus.");
        break;
      default:
        return;
    }
  };

  const sessionUser = useSelector((state) => state.session.currentUser);
  if (!sessionUser) return <Redirect to={`/login`} />;

  return (
    <div className="user-page">
      <SideNavBar />
      <SideBar
        type={"user-page"}
        setFriendship={setFriendship}
        friendship={friendship}
      />
      <main className="user-page-main">
        <nav className="user-page-topnav">
          <section className="user-page-topnav-children">
            <svg
              x="0"
              y="0"
              className="iconic"
              aria-hidden="true"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="currentColor"
                  fillRule="nonzero"
                  d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
                  transform="translate(2 4)"
                ></path>
                <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
              </g>
            </svg>
            <h1>Friends</h1>
            <div className="divider"></div>
            <button onClick={() => wumpusHandler("online")}>Online</button>
            <button onClick={() => wumpusHandler("all")}>All</button>
            <button onClick={() => wumpusHandler("pending")}>Pending</button>
            <button onClick={() => wumpusHandler("blocked")}>Blocked</button>
            <button id="add-friend" onClick={() => setFriendModal(true)}>
              Add Friend
            </button>
          </section>
          <div className="toolbar"></div>
        </nav>
        <div className="user-page-main-content">
          <FriendshipContent
            friendship={friendship}
            wumpusClass={wumpusClass}
            wumpusText={wumpusText}
          />
          <aside className="active-people"></aside>
        </div>
        {friendModal && (
          <Modal onClose={() => setFriendModal(false)}>
            <NewFriendForm setFriendModal={setFriendModal} />
          </Modal>
        )}
      </main>
    </div>
  );
}
