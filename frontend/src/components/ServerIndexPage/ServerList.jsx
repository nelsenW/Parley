import ServerListItem from "./ServerListItem";

export default function ServerList({servers}){
    return (
        <ul className="server-card-list">
            {servers.map(server => <ServerListItem server = {server} key = {server.id}/>)}
        </ul>
    )
}