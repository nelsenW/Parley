import { useEffect } from "react";
import { useState } from "react";
import { createFriendship } from "../../../store/friendships";
import { useDispatch, useSelector } from "react-redux";
import { indexUser } from "../../../store/users";
import "./newFriendForm.css";

export default function NewFriendForm({ setFriendModal }) {
  const [username, setUsername] = useState();
  const [users, setUsers] = useState();
  const [filteredUsers, filterUsers] = useState();
  const [submit, setSubmit] = useState(false);
  const [friendId, setFriendId] = useState();
  const sessionUser = useSelector((state) => state.session.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    async function userSetter() {
      let grabbedUsers = await indexUser();
      setUsers(Object.values(grabbedUsers));
      filterUsers(Object.values(grabbedUsers));
    }
    userSetter();
  }, []);

  const handleInput = (e) => {
    const filterer = e.currentTarget.value;
    const reg_exp = new RegExp(`.*(${filterer}).*`, "i");
    let filterResults = users.filter((user) => {
      return reg_exp.test(user.username);
    });
    filterUsers(filterResults);
    setUsername(filterer);
  };

  const handleSelect = (e) => {
    const selected = document.querySelectorAll(".selected");
    selected.forEach((select) => select.classList.remove("selected"));
    e.currentTarget.classList.add("selected");
    setUsername(e.currentTarget.value);
    setSubmit(true);
  };

  const handleSubmit = () => {
    dispatch(
      createFriendship({
        friendship: { user_id: sessionUser.id, friend_id: friendId },
      })
    );
    setFriendModal(false);
  };

  return (
    <div className="friend-form-modal">
      <button
        className="closeIcon-container"
        onClick={() => setFriendModal(false)}
      >
        <svg
          className="closeIcon"
          aria-hidden="true"
          role="img"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
          ></path>
        </svg>
      </button>
      <div className="friend-form-header">
        <h1>Add a new friend!</h1>
        <p>Hanging out and being social helps brighten your life!</p>
      </div>
      <form className="friend-form">
        <input
          type="text"
          placeholder="Friend username"
          value={username}
          onChange={handleInput}
        />
      </form>
      <div className="known-users">
        <h1>People you may know...</h1>
        {filteredUsers
          ?.map((user) => (
            <FriendCard
              user={user}
              handleSelect={handleSelect}
              setFriendId={setFriendId}
            />
          ))
          .slice(0, 3)}
      </div>
      {submit && (
        <button
          type="submit"
          onClick={handleSubmit}
          className="add-friend-button"
        >
          Add Friend!
        </button>
      )}
    </div>
  );
}

function FriendCard({ user, handleSelect, setFriendId }) {
  return (
    <button
      className="known-user-card"
      onClick={(e) => {
        setFriendId(user.id);
        handleSelect(e);
      }}
      value={user.username}
      type="button"
    >
      {user.photo ? (
        <img
          src={user.photo}
          style={{ backgroundColor: "transparent" }}
          className="known-user-image"
        />
      ) : (
        <i
          className="fa-solid fa-skull-crossbones known-user-image"
          style={{ backgroundColor: `${user.color}` }}
        ></i>
      )}
      <h3>{user.username}</h3>
    </button>
  );
}
