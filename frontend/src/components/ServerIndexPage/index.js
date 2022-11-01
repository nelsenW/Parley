import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { indexServer } from "../../store/servers";
import ServerList from "./ServerList";

export default function ServerIndexPage(){
    const servers = useSelector(state => state.servers ? Object.values(state.servers) : []);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(indexServer())
    },[dispatch])
    
    return (
        <div>
            <ServerList servers = {servers}/>
        </div>
    )
}