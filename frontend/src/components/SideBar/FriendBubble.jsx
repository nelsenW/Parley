import './friendBubble.css'

export default function FriendBubble({friend}) {
    return (
        <div className="friend-bubble">
              {friend?.photo ? (
                <img
                  src={friend.photo}
                  style={{ backgroundColor: "transparent" }}
                  className="sidebar-userIcon"
                />
              ) : (
                <i
                  className="fa-solid fa-skull-crossbones sidebar-userIcon"
                  style={{ backgroundColor: `${friend.color}` }}
                ></i>
              )}
              <p className='friend-username'>{friend.username}</p>
        </div>
    )
}

