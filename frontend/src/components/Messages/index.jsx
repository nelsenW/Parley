import React from 'react';
import './messages.css';
import { useDispatch } from 'react-redux';
import { receiveMessage } from '../../store/messages';
import { useEffect } from 'react';
import consumer from "../../consumer.js"

export default function Message({ text, userId, mentionedUsernames, createdAt }) {
  	const dispatch = useDispatch();

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
			<span className='message__userId'>{userId}</span>
			<span className='message__timestamp'>{formattedTime}</span>
			<p>{getFormattedText(text, mentionedUsernames)}</p>
		</div>
	);
};


