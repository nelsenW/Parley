import './friendBubble.css'

export default function FriendBubble({friend, selected, setFriendship}) {
    return (
        <div className={`friend-bubble ${selected ?? null}`} onClick={() => {setFriendship(friend)}}>
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

