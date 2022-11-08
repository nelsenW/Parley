import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import consumer from "../../consumer";
import { receiveMessage, removeMessage } from "../../store/messages";
import { receiveCurrentUser } from "../../store/session";
import Message from "../Messages";
import MessageForm from "../Messages/messageForm";
import './channelContent.css'

export default function ChannelContent({channel}){
    let prevId = useRef();
    let channelId = channel ? channel.id : ''
    let messages = useSelector(state => state.messages ? Object.values(state.messages) : [])
    let subscription
    const dispatch = useDispatch();
    const [members, setMembers]= useState({})

    const enterChannel = () => {
        subscription = consumer.subscriptions.create( 
            { channel: 'ChannelsChannel', id: channelId},
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
        if(channelId !== prevId){
            prevId.current = channelId;
            subscription?.unsubscribe();
            enterChannel()
        }
        return (() => {
            subscription?.unsubscribe()
        })
    },[channelId, messages.length])

    return (
		<div className='center-column'>
            <ul className="channel-messages">
                {messages.map(message => <Message {...message}/>)}
            </ul>
            <MessageForm channelId={channelId}/>
        </div>
    )
}