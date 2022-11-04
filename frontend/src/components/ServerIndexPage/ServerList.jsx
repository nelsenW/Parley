import ServerListItem from "./ServerListItem";

export default function ServerList({servers}){
    return (
        <ul>
            {servers.map(server => <ServerListItem server = {server} key = {server.id}/>)}
        </ul>
    )
}