import './friendBubble.css'

export default function FriendBubble({friend, selected, setFriendship}) {
    return (
        <div className={`friend-bubble ${selected ?? null}`} onClick={() => {setFriendship(friend)}}>
              {friend?.user.photo ? (
                <img
                  src={friend.user.photo}
                  style={{ backgroundColor: "transparent" }}
                  className="sidebar-userIcon"
                />
              ) : (
                <i
                  className="fa-solid fa-skull-crossbones sidebar-userIcon"
                  style={{ backgroundColor: `${friend.user.color}` }}
                ></i>
              )}
              <p className='friend-username'>{friend.user.username}</p>
        </div>
    )
}

