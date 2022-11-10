const RECEIVE_ONLINE = "RECEIVE_ONLINE"

export const receiveOnline = online => ({
    type: RECEIVE_ONLINE,
    online
})

const onlineReducer = (state = {},action) =>{

    switch (action.type) {
		case RECEIVE_ONLINE:
			return { ...action.online };
		default:
			return state;
    }
}

export default onlineReducer;