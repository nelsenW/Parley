import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { indexServer } from "../../store/servers";
import ServerList from "./ServerList";

export default function ServerIndexPage(){
    const servers = useSelector(state => state.servers ? Object.values(state.servers) : []);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(indexServer())
    },[dispatch])

    const sessionUser = useSelector((state) => state.session.currentUser);

	if (!sessionUser) return <Redirect to={`/login`} />
    
    return (
        <div>
            <ServerList servers = {servers}/>
        </div>
    )
}