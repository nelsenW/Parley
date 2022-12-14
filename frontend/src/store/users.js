import csrfFetch from "./csrf";

const RECEIVE_USER = "RECEIVE_USER";
const REMOVE_USER = "REMOVE_USER";
const RECEIVE_USERS = "RECEIVE_USERS"

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
})

export const indexUser = async () => {
	return await csrfFetch(`/api/users`)
		.then((res) => res.json())
		.then((users) => {
			return users
		})
		.catch((err) => (err));
};

const userReducer = (state = {},action) =>{
    let newState = {...state}
    switch (action.type) {
		case RECEIVE_USER:
			return { ...newState, [action.user.id]: action.user };
		case RECEIVE_USERS:
			return {...action.users}
		case REMOVE_USER:
			delete newState[action.userId];
			return newState;
		default:
			return state;
    }
}

export default userReducer;