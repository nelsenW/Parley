import React from 'react';
import './messages.css';
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage } from '../../store/messages';
import { useEffect } from 'react';
import consumer from "../../consumer.js"

export default function Message({ text, userId, mentionedUsernames, createdAt }) {
	const dispatch = useDispatch();
	const userName = useSelector(state => state?.session[userId]?.username ?? null)
	const color = useSelector(state => state?.session[userId]?.color ?? null)
	const photo = useSelector(state => {
		return state?.session[userId]?.photo ? 
		<img src={state?.session[userId]?.photo} /> 
		: <i className='fa-solid fa-skull-crossbones' style={{backgroundColor: 'transparent'}}></i>
	})

	useEffect(() => {
		createSubscription();
	}, [dispatch]);

	const createSubscription = () => {
		consumer.subscriptions.create(
			{ channel: 'MessagesChannel' },
			{ received: (message) => handleReceivedMessage(message) }
		);
	};

	const handleReceivedMessage = (message) => {
		dispatch(receiveMessage(message));
	};

	const getFormattedText = (text, usernames) => {
		return usernames?.length
			? text
					.split(new RegExp(`(${usernames.join('|')})`))
					.map((text, idx) =>
						idx % 2 === 0 ? text : <strong key={text}>{text}</strong>
					)
			: text;
	}

	
		


	const getFormattedTime = (dateString) => {
		const date = new Date(dateString);

		const now = new Date();
		const startOfDay = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate()
		).getTime();

		const startOfYesterday = startOfDay - 1000 * 60 * 60 * 24;

		let formattedTime = date.toLocaleTimeString([], {
			timeStyle: 'short'
		});

		if (date.getTime() < startOfYesterday) {
			formattedTime = date.toDateString();
		} else if (date.getTime() < startOfDay) {
			formattedTime = `Yesterday at ${formattedTime}`;
		}
		return formattedTime;
	}

	const formattedTime = getFormattedTime(createdAt);

	return (
		<div className='message'>
			<div className='message-userIcon' style={{backgroundColor: 'blue'}}>
				{photo}
			</div>
			<span className='message-userName'>{userName}</span>
			<span className='message-timestamp'>{formattedTime}</span>
			<p className='message-text'>{getFormattedText(text, mentionedUsernames)}</p>
		</div>
	);
};


