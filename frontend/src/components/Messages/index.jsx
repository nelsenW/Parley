import React from 'react';
import './messages.css';
import { useDispatch, useSelector } from 'react-redux';
import { destroyMessage, receiveMessage } from '../../store/messages';
import { useEffect } from 'react';
import consumer from "../../consumer.js"
import { useState } from 'react';
import MessageForm from './messageForm';

export default function Message({ text, userId, createdAt, modify, id, channel}) {
	const dispatch = useDispatch();
	const userName = useSelector(state => state?.users[userId]?.username ?? null)
	const [editMsg, setEditMsg] = useState(false)
	const color = useSelector(state => state?.users[userId]?.color ?? null)
	const photo = useSelector(state => {
		return state?.users[userId]?.photo ? 
		<img src={state?.users[userId]?.photo} style={{ backgroundColor: 'transparent' }}/> 
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
			<div className='message-userIcon' style={{backgroundColor: `${color}`}}>
				{photo}
			</div>
			<span className='message-userName'>{userName}</span>
			<span className='message-timestamp'>{formattedTime}</span>
			{modify && 
			<>
			<span className='message-timestamp mod' id='message-edit' onClick={() => {setEditMsg(true)}}>Edit</span>
			<span className='message-timestamp mod' id='message-delete' onClick={() => {
				dispatch(destroyMessage(id))
				}}>Delete</span>
			</>
			}
			<p className='message-text'>{text}</p>
			{editMsg && <MessageForm editMessage = {{id, text}} channel={channel} setEditMsg={setEditMsg}/> }
		</div>
	);
};


