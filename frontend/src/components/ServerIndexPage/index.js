import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { indexServer } from "../../store/servers";
import ServerList from "./ServerList";
import './serverIndex.css'
import SideNavBar from "../SideNavBar";
import SideBar from "../SideBar";
import { useState } from "react";

export default function ServerIndexPage(){
    const servers = useSelector(state => state.servers ? Object.values(state.servers) : [])
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(indexServer())
    },[dispatch])

    const sessionUser = useSelector((state) => state.session.currentUser);
    debugger
	if (!sessionUser) return <Redirect to={`/login`} />
    
    return (
        <div className="servers-page">
            <SideNavBar />
            <SideBar />
            <main>
                <ServerList servers = {servers}/>
            </main>
        </div>
    )
}