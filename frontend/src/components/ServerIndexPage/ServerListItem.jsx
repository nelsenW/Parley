export default function ServerListItem({server}){
    return (
        <button className="server-card">
            <img src={server.iconUrl} className="server-card-image"/>
            <div className="server-card-content">
                <h1 >{server.name}</h1> 
            </div>
        </button>
    )
}