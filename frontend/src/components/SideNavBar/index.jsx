import "./SideNavBar.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import csrfFetch from "../../store/csrf";
import { Modal } from "../../context/Modal";
import NewServerForm from "../ServerFormModal";

export default function SideNavBar() {
  const sessionUser = useSelector((state) => state.session.currentUser);
  const [showModal, setShowModal] = useState(false);
  const [userServers, setUserServers] = useState([]);
  const [serverName, setServerName] = useState(false)

  const fetchUserServers = async (userId) => {
    await csrfFetch(`/api/servers?userId=${userId}`)
      .then((res) => res.json())
      .then((servers) => setUserServers(Object.values(servers)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserServers(sessionUser.id);
  }, []);

  const serverNameGen = (name) => {
    return name
      .toUpperCase()
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("");
  };



  return (
    <nav className="user-page-sidenav">
      <NavLink className="sidenav-a" id="DM's" to={`/users/${sessionUser.id}`}>
        <i className="fa-solid fa-skull-crossbones"></i>
      </NavLink>
      {userServers.map((server) => (
        <NavLink className="sidenav-a" to={`/servers/${server.id}`} style={{backgroundImage: `url(${server.iconUrl})`}} >
          {!server.iconUrl && serverNameGen(server.name)}
          
        </NavLink>
      ))}
      <button className="sidenav-a" id="add" onClick={() => setShowModal(true)}>
        <svg
          className="plus-button"
          aria-hidden="true"
          role="img"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
          ></path>
        </svg>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewServerForm setShowModal = {setShowModal}/>
        </Modal>
      )}
      <NavLink to={`/servers`} className="sidenav-a" id="explore">
        <svg
          aria-hidden="true"
          role="img"
          className="exploratories"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"
          ></path>
        </svg>
      </NavLink>
    </nav>
  );
}
