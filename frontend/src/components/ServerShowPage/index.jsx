import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import consumer from "../../consumer";
import { receiveMessage, removeMessage } from "../../store/messages";
import { indexServer, showServer } from "../../store/servers";
import { receiveCurrentUser } from "../../store/session";

export default function ServerShowPage(){
    
    const {serverId} = useParams();
    let prevId = useRef();
    let server = useSelector(state => state.servers ? state.servers[serverId] : null);
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
                            console.log('a')
                            break;
                        case 'REMOVE_USER':
                            setMembers(delete members[user.id])
                            console.log('b')
                            break;
                        case 'RECEIVE_MESSAGE':
                            dispatch(receiveMessage(message));
                            dispatch(receiveCurrentUser(user));
                            console.log('c')
                            break;
                        case 'DESTROY_MESSAGE':
                            dispatch(removeMessage(id));
                            console.log('d')
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
        dispatch(indexServer())
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
    },[dispatch, serverId])

    return server ? (
        <>
            <h1>Hello from {server.name}</h1>
        </>
    ) : null
}