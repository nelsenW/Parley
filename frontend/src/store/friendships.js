import csrfFetch from "./csrf";
import { receiveDMs } from "./dms";


const RECEIVE_FRIENDSHIP = "RECEIVE_FRIENDSHIP";
const REMOVE_FRIENDSHIP = "REMOVE_FRIENDSHIP";
const RECEIVE_FRIENDSHIPS = "RECEIVE_FRIENDSHIPS"

export const receiveFriendships = friendships => ({
    type: RECEIVE_FRIENDSHIPS,
    friendships
})

export const receiveFriendship = friendship => ({
    type: RECEIVE_FRIENDSHIP,
    friendship
})

export const removeFriendship = friendshipId => ({
	type: REMOVE_FRIENDSHIP,
	friendshipId
})

export const indexFriendship = () => async (dispatch) => {
	await csrfFetch('/api/friendships')
	.then((res) => res.json())
	.then((friendships) => dispatch(receiveFriendships(friendships)))
	.catch((err) => console.log(err))
}

export const createFriendship = (friendship) => async (dispatch) => {
	await csrfFetch('/api/friendships', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(friendship)
	})
		.then((res) => res.json())
		.then((data) => dispatch(receiveFriendship(data.friendship)))
		.catch((err) => console.log(err));
};

export const showFriendship = (friendshipId) => async (dispatch) => {
	await csrfFetch(`/api/friendships/${friendshipId}`)
		.then((res) => res.json())
		.then((data) => {
			// dispatch(receiveFriendship(data.friendship));
			dispatch(receiveDMs(data.dms));
		})
		.catch((err) => console.log(err));
};

export const destroyFriendship = (friendshipId) => async (dispatch) => {
	await csrfFetch(`/api/friendships/${friendshipId}`, {
		method: 'DELETE'
	})
		.then(() => dispatch(removeFriendship(friendshipId)))
		.catch((err) => console.log(err));
};

const friendshipReducer = (state = {},action) =>{
    let newState = {...state}
    switch (action.type) {
		case RECEIVE_FRIENDSHIP:
			return { ...newState, [action.friendship.id]: action.friendship };
		case RECEIVE_FRIENDSHIPS:
			return {...action.friendships}
		case REMOVE_FRIENDSHIP:
			delete newState[action.friendshipId];
			return newState;
		default:
			return state;
    }
}

export default friendshipReducer;