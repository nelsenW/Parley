import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import consumer from "../../consumer";
import { receiveMessage, removeMessage } from "../../store/messages";
import { indexServer, showServer } from "../../store/servers";
import { receiveCurrentUser } from "../../store/session";
import Message from "../Messages";
import SideBar from "../SideBar";
import SideNavBar from "../SideNavBar";
import MessageForm from "../Messages/messageForm";
import './ServerShowPage.css'

export default function ServerShowPage(){

    const {serverId} = useParams();
    let prevId = useRef();
    let server = useSelector(state => state.servers ? state.servers[serverId] : null);
    let messages = useSelector(state => state.messages ? Object.values(state.messages) : [])
    let subscription
    const dispatch = useDispatch();
    const [members, setMembers] = useState({})

    const enterServer = () => {
        subscription = consumer.subscriptions.create( 
            { channel: 'ServersChannel', id: serverId},
            {
                received: ({ type, message, user, id}) => {
                    switch (type) {
                        case 'RECEIVE_USER':
                            setMembers({...members, [user.id]: user})
                            break;
                        case 'REMOVE_USER':
                            setMembers(delete members[user.id])
                            break;
                        case 'RECEIVE_MESSAGE':
                            dispatch(receiveMessage(message));
                            dispatch(receiveCurrentUser(user));
                            break;
                        case 'DESTROY_MESSAGE':
                            dispatch(removeMessage(id));
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
            <SideNavBar />
            <SideBar />
            <main className='user-page-main'>
                
				<nav className='user-page-topnav'>
					<section className='user-page-topnav-children'>
						<h1># {server.name}</h1>
					</section>
					<div className='toolbar'></div>
				</nav>
				<div className='user-page-main-content'>
					<div className='center-column'>
                        <ul className="server-messages">
                            {messages.map(message => <li>{message.text}</li>)}
                        </ul>
					</div>
					<aside className='active-people'>
                        {Object.entries(members)?.map(member => <li>{member.username}</li>)}
                    </aside>
				</div>
                <MessageForm />
			</main>
        </div>
    ) : null
}