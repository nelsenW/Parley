import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import csrfFetch from "../../store/csrf";

export default function ServerListItem({server}){
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.currentUser);

    const clickHandler = async () => {
        await csrfFetch('/api/members', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({member: {user_id: sessionUser.id, server_id: server.id}})
        })
        .then((res) => res.json())
        .catch((err) => console.log(err));
        history.push(`servers/${server.id}`)
    };

    return (
        <button className="server-card" onClick={clickHandler}>
            <img src={server.iconUrl} className="server-card-image"/>
            <div className="server-card-content">
                <h1>{server.name}</h1> 
            </div>
        </button>
    )
}