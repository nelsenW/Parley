import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { indexServer } from "../../store/servers";
import ServerList from "./ServerList";
import './serverIndex.css'
import explore from '../../assests/explore/explor.svg'
import SideNavBar from "../Navigation/SideNavBar";
import SideBar from "../Navigation/SideBar";

export default function ServerIndexPage(){
    const servers = useSelector(state => state.servers ? Object.values(state.servers) : [])
    const dispatch = useDispatch();
    const [text, setText] = useState('')

    useEffect(() =>{
        dispatch(indexServer())
    },[dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const sessionUser = useSelector((state) => state.session.currentUser);
	if (!sessionUser) return <Redirect to={`/login`} />
    
    return (
        <div className="servers-page">
            <SideNavBar />
            <SideBar />
            <main className="servers-explore-list">
                <div className="servers-explore-header">
                    <img src={explore} className="servers-explore-image" style={{ backgroundColor: 'transparent' }}/>
                    <div className='header-content-wrapper'>
                        <div className="header-content">
                            <h1>Find your crew on Parley</h1>
                            <p>From gaming, to music, to learning, there's a place for you.</p>
                            <div className="search-container">
                                <div className="servers-explore-search">
                                    <input placeholder="Explore communities" className="servers-explore-input"
                                    rows={text.split('\n').length}
                                    onChange={e => setText(e.target.value)}
                                    onKeyDown={e => {
                                    if (e.code === 'Enter' && !e.shiftKey) {
                                        handleSubmit(e);
                                    }
                                    }}
                                    value={text}></input>
                                    <div className='mag-glass-container'>
                                        <i className='fa-solid fa-magnifying-glass'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <ServerList servers = {servers}/>
            </main>
        </div>
    )
}