import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import consumer from '../../consumer';
import { showChannel } from '../../store/channels';
import { receiveMessage, removeMessage } from '../../store/messages';
import { receiveCurrentUser } from '../../store/session';
import Message from '../Messages';
import MessageForm from '../Messages/messageForm';
import './channelContent.css';

export default function ChannelContent({ channel }) {
	let prevId = useRef();
	let messages = useSelector((state) =>
		state.messages ? Object.values(state.messages) : []
	);
	let subscription;
	const sessionUser = useSelector((state) => state.session.currentUser.id);
	const dispatch = useDispatch();
	const [members, setMembers] = useState({});

	const enterChannel = () => {
		subscription = consumer.subscriptions.create(
			{ channel: 'ChannelsChannel', id: channel.id },
			{
				received: ({ type, message, user, id }) => {
					switch (type) {
						case 'RECEIVE_USER':
							setMembers({ ...members, [user.id]: user });
							break;
						case 'REMOVE_USER':
							setMembers(delete members[user.id]);
							break;
						case 'RECEIVE_MESSAGE':
							dispatch(receiveMessage(message));
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
	};

	useEffect(() => {
		if (channel?.id) {
			dispatch(showChannel(channel.id));
		}
		if (channel?.id && channel.id !== prevId) {
			prevId.current = channel.id;
			subscription?.unsubscribe();
			enterChannel();
		}
		return () => {
			subscription?.unsubscribe();
		};
	}, [channel, messages.length]);

	return channel ? (
		<div className='center-column'>
			<ul className='channel-messages'>
				{messages.map((message) => {
					let modify = false
					if(message.userId === sessionUser){
						modify = true
					}
					return <Message {...message} modify = {modify}/>; 
				})}
			</ul>
			<MessageForm channel={channel} />
		</div>
	) : (
		<div className='center-column'>
			<ul className='channel-messages'></ul>
			<MessageForm />
		</div>
	);
}
