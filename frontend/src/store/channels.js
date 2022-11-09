import csrfFetch from './csrf';
import { receiveMessages } from './messages';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

const receiveChannel = (channel) => {
	return {
		type: RECEIVE_CHANNEL,
		channel
	};
};

export const receiveChannels = (channels) => {
	return {
		type: RECEIVE_CHANNELS,
		channels
	};
};

const removeChannel = (channelId) => {
	return {
		type: REMOVE_CHANNEL,
		channelId
	};
};

export const createChannel = (channel) => async (dispatch) => {
	await csrfFetch('/api/channels', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(channel)
	})
		.then((res) => res.json())
		.then((newChannel) => dispatch(receiveChannel(newChannel)))
		.catch((err) => console.log(err));
};

export const showChannel = (channelId) => async (dispatch) => {
	await csrfFetch(`/api/channels/${channelId}`)
		.then((res) => res.json())
		.then(({channel, messages}) => {
			debugger
			dispatch(receiveChannel(channel));
			dispatch(receiveMessages(messages));
		})
		.catch((err) => console.log(err));
};

export const indexChannel = () => async (dispatch) => {
	await csrfFetch(`/api/channels`)
		.then((res) => res.json())
		.then((channels) => {
			dispatch(receiveChannels(channels))
		})
		.catch((err) => console.log(err));
};

export const destroyChannel = (channelId) => async (dispatch) => {
	await csrfFetch(`/api/channels/${channelId}`, {
		method: 'DELETE'
	})
		.then(() => dispatch(removeChannel(channelId)))
		.catch((err) => console.log(err));
};

export const updateChannel = (channel) => async (dispatch) => {
	await csrfFetch(`/api/channels/${channel.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(channel)
	})
		.then((res) => res.json())
		.then((updatedChannel) => dispatch(receiveChannel(updatedChannel)))
		.catch((err) => console.log(err));
};

const channelReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case RECEIVE_CHANNEL:
			return { ...newState, [action.channel.id]: action.channel };
		case RECEIVE_CHANNELS:
			return {...action.channels}
		case REMOVE_CHANNEL:
			delete newState[action.channelId];
			return newState;
		default:
			return state;
	}
};

export default channelReducer
