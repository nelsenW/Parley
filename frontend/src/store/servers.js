import { receiveChannels } from './channels';
import csrfFetch from './csrf';
import { receiveOnline } from './online';
import { receiveUsers } from './users';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const REMOVE_SERVER = 'REMOVE_SERVER';

const receiveServer = (server) => {
	return {
		type: RECEIVE_SERVER,
		server
	};
};

const receiveServers = (servers) => {
	return {
		type: RECEIVE_SERVERS,
		servers
	};
};

const removeServer = (serverId) => {
	return {
		type: REMOVE_SERVER,
		serverId
	};
};

export const createServer = (server) => async (dispatch) => {
	await csrfFetch('/api/servers', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(server)
	})
		.then((res) => res.json())
		.then((newServer) => dispatch(receiveServer(newServer)))
		.catch((err) => console.log(err));
};

export const showServer = (serverId) => async (dispatch) => {
	await csrfFetch(`/api/servers/${serverId}`)
		.then((res) => res.json())
		.then(({server, users, channels, onlineUsers}) => {
			dispatch(receiveServer(server));
			dispatch(receiveChannels(channels));
			dispatch(receiveUsers(users))
			dispatch(receiveOnline(onlineUsers))
		})
		.catch((err) => console.log(err));
};

export const indexServer = () => async (dispatch) => {
	await csrfFetch(`/api/servers`)
		.then((res) => res.json())
		.then((servers) => {
			dispatch(receiveServers(servers))
		})
		.catch((err) => console.log(err));
};

export const destroyServer = (serverId) => async (dispatch) => {
	await csrfFetch(`/api/servers/${serverId}`, {
		method: 'DELETE'
	})
		.then(() => dispatch(removeServer(serverId)))
		.catch((err) => console.log(err));
};

export const updateServer = (server) => async (dispatch) => {
	await csrfFetch(`/api/servers/${server.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(server)
	})
		.then((res) => res.json())
		.then((updatedServer) => dispatch(receiveServer(updatedServer)))
		.catch((err) => console.log(err));
};

const serverReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case RECEIVE_SERVER:
			return { ...newState, [action.server.id]: action.server };
		case RECEIVE_SERVERS:
			return {...action.servers}
		case REMOVE_SERVER:
			delete newState[action.serverId];
			return newState;
		default:
			return state;
	}
};

export default serverReducer
