import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import consumer from "../../consumer";
import { showServer } from "../../store/servers";
import SideBar from "../SideBar";
import SideNavBar from "../SideNavBar";
import './ServerShowPage.css'
import ChannelContent from "../ChannelContent";

export default function ServerShowPage(){

    const {serverId} = useParams();
    let prevId = useRef();
    let server = useSelector(state => state.servers ? state.servers[serverId] : null);
    let messages = useSelector(state => state.messages ? Object.values(state.messages) : [])
    let channels = useSelector(state => state.channels ? Object.values(state.channels) : [])
    let subscription
    const dispatch = useDispatch();
    const [members, setMembers] = useState({});
    const [channel, setChannel] = useState([])

    const enterServer = () => {
        subscription = consumer.subscriptions.create( 
            { channel: 'ServersChannel', id: serverId},
            {
                received: ({ type, user }) => {
                    switch (type) {
                        case 'RECEIVE_USER':
                            setMembers({...members, [user.id]: user})
                            break;
                        case 'REMOVE_USER':
                            setMembers(delete members[user.id])
                            break;
                        default:
                            console.log('Unhandled broadcast: ', type);
                            break;
                    }
                }
            }
        );
    }

    useEffect(() => {
        setChannel(channels[0])
    },[channels.length])

    useEffect(() => {
        if(serverId)(
            dispatch(showServer(serverId))
        )
        if(serverId !== prevId){
            prevId.current = serverId;
            subscription?.unsubscribe();
            enterServer()
        }
        return (() => {
            subscription?.unsubscribe()
        })
    },[serverId, messages.length])

    const sessionUser = useSelector((state) => state.session.currentUser);

	if (!sessionUser) return <Redirect to={`/login`} />

    return server ? (
        <div className="server-page">
            <SideNavBar channels = {channels} setChannel = {setChannel}/>
            <SideBar />
            <main className='user-page-main'>
                
				<nav className='user-page-topnav'>
					<section className='user-page-topnav-children'>
						<h1># {server.name}</h1>
					</section>
					<div className='toolbar'></div>
				</nav>
				<div className='user-page-main-content'>
					<ChannelContent channel= {channel}/>
					<aside className='active-people'>
                        <h1 id="member-count">Members -- {Object.values(members).length}</h1>
                        {Object.values(members)?.map(member => {
                            return (
                            <div className="member-card-wrapper">
                                <img src={member.photo} className="member-button"/>
                                <li>{member.username}</li>
                            </div>
                            )
                            }
                        )
                        }
                    </aside>
				</div>
                
			</main>
        </div>
    ) : null
}