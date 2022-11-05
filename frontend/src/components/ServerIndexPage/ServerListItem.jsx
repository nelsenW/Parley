export default function ServerListItem({server}){
    return (
        <div>
            <h1>{server.name}</h1>
            <img src={server.iconUrl}/>
        </div>
    )
}