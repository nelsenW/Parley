import { useState } from "react";
import { useSelector } from "react-redux";

export default function TabFiles({ tab }) {
  const sessionUser = useSelector((state) => state.session.currentUser);
  const [color,setColor] = useState(`#${sessionUser.color}`);
  const photo = sessionUser.photo ? (
    <img src={sessionUser.photo} />
  ) : (
    <i
      className="fa-solid fa-skull-crossbones"
      style={{ backgroundColor: `${color}` }}
    ></i>
  );

  switch (tab) {
    case "Profiles":
      return (
        <div>
          <h1>User Profile</h1>
          <div className="profile-customization">
            <form className="profile-customization-form">
              <div className="customization-sep">
                <h4>Avatar</h4>
                <button id="change-avatar">Change Avatar</button>
              </div>

              <div className="customization-sep">
                <h4>Banner Color</h4>
                <div className="input-wrapper">
                  <input type='color' className="bannerColor" value={color} onChange={(e) => setColor(e.target.value)} style={{ backgroundColor: `${color}`, color: `${color}` }}
                  />
                  <svg
                    class="dropperIcon"
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                  >
                    <g fill="none">
                      <path d="M-4-4h24v24H-4z"></path>
                      <path
                        fill="hsl(0, calc(var(--saturation-factor, 1) * 0%), 100%)"
                        d="M14.994 1.006C13.858-.257 11.904-.3 10.72.89L8.637 2.975l-.696-.697-1.387 1.388 5.557 5.557 1.387-1.388-.697-.697 1.964-1.964c1.13-1.13 1.3-2.985.23-4.168zm-13.25 10.25c-.225.224-.408.48-.55.764L.02 14.37l1.39 1.39 2.35-1.174c.283-.14.54-.33.765-.55l4.808-4.808-2.776-2.776-4.813 4.803z"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="customization-sep">
                <h4>About Me</h4>
                <p>I mean I guess you can use links...</p>
                <input type="text" id="update-about"/>
              </div>
            </form>
            <div className="preview">
              <h4>Preview</h4>
              <div className="preview-card">
                <div className="preview-banner" style={{ backgroundColor: `${color}` }}></div>
                <div className="my-account-photo">{photo}</div>
                <div className="preview-content">
                  <h1>{sessionUser.username}</h1>
                  <h4 className="spacer"></h4>
                  <div className="preview-content-desc">
                    <h2>Customizing my Profile</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "My Account":
      return (
        <div>
          <h1>My Account</h1>
          <div className="my-account-card">
            <div
              className="my-account-color"
              style={{ backgroundColor: `${color}` }}
            ></div>
            <div className="my-account-info">
              <div className="my-account-photo">{photo}</div>
              <h2>{sessionUser.username}</h2>
              <button className="edit-user-profile">Edit User Profile</button>
            </div>
            <div className="my-account-edits">
              <h4>USERNAME</h4>
              <h3>{sessionUser.username}</h3>
              <h4 className="spacer">EMAIL</h4>
              <h3>{sessionUser.email}</h3>
            </div>
          </div>
        </div>
      );
    default:
      return;
  }
}
