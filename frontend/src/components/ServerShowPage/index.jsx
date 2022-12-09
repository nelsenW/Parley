import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import consumer from '../../consumer';
import { showServer } from '../../store/servers';
import SideBar from '../Navigation/SideBar';
import SideNavBar from '../Navigation/SideNavBar';
import './ServerShowPage.css';
import RightBar from './RightBar';
import ChannelContent from './ChannelContent'

export default function ServerShowPage() {
	const { serverId } = useParams();
	let prevId = useRef();
	let server = useSelector((state) =>
		state.servers ? state.servers[serverId] : null
	);
	let users = useSelector((state) => 
		state.users ? Object.values(state.users) : []
	);
	let messages = useSelector((state) =>
		state.messages ? Object.values(state.messages) : []
	);
	let channels = useSelector((state) =>
		state.channels ? Object.values(state.channels) : []
	);
	let onlineMembers = useSelector((state) =>
		state.users ? Object.values(state.users) : []
	)

	let subscription;
	const dispatch = useDispatch();
	const [offlineMembers, setOfflineMembers] = useState({});
	const [channel, setChannel] = useState(null);


	const enterServer = () => {
		subscription = consumer.subscriptions.create(
			{ channel: 'ServersChannel', id: serverId },
			{
				received: ({ type, user }) => {
					switch (type) {
						case 'RECEIVE_USER':
							break;
						case 'REMOVE_USER':
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
		setChannel(channels[0]);
	}, [channels.length]);

	useEffect(() => {
		if (serverId !== prevId.current) {
			enterServer();
			dispatch(showServer(serverId))
			prevId.current = serverId;
			subscription?.unsubscribe();
		}
		return () => {
			subscription?.unsubscribe();
		};
	}, [serverId, users]);

	const sessionUser = useSelector((state) => state.session.currentUser);

	if (!sessionUser) return <Redirect to={`/login`} />;

	return server ? (
		<div className='server-page'>
			<SideNavBar />
			<SideBar channels={channels} setChannel={setChannel} name={server.name} />
			<main className='user-page-main'>
				<nav className='user-page-topnav'>
					<section className='user-page-topnav-children'>
						<h1># {channel?.name ?? ''}</h1>
					</section>
					<div className='toolbar'></div>
				</nav>
				<div className='user-page-main-content'>
					<ChannelContent channel={channel} />
					<RightBar onlineMembers={onlineMembers} offlineMembers={offlineMembers} />
				</div>
			</main>
		</div>
	) : null;
}
