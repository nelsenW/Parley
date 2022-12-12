import csrfFetch from "./csrf";

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const receiveMessage = message => {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
};

export const receiveMessages = messages => {
  return {
    type: RECEIVE_MESSAGES,
    messages
  };
};

export const removeMessage = messageId => {
  return {
    type: REMOVE_MESSAGE,
    messageId
  };
};

export const indexMessage = () => async (dispatch) => {
	await csrfFetch(`/api/messages`)
		.then((res) => res.json())
		.then((messages) => dispatch(receiveMessages(messages)))
		.catch((err) => console.log(err));
};

export const createMessage = formData => async (dispatch) => {
  await csrfFetch('/api/messages', {
		method: 'POST',
		body: formData 
	})
    .then((res) => res.json())
		.then((newMessage) => dispatch(receiveMessage(newMessage)))
		.catch((err) => console.log(err));
}

export const destroyMessage = (messageId) => async (dispatch) => {
	await csrfFetch(`/api/messages/${messageId}`, {
		method: 'DELETE'
	})
		.then(() => dispatch(removeMessage(messageId)))
		.catch((err) => console.log(err));
};

export const updateMessage = (message) => async (dispatch) => {
	await csrfFetch(`/api/messages/${message.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(message)
	})
		.then((res) => res.json())
		.then((updatedMessage) => dispatch(receiveMessage(updatedMessage)))
		.catch((err) => console.log(err));
};


const messagesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MESSAGE:
      const { message } = action;
      return { ...state, [message.id]: message };
    case RECEIVE_MESSAGES:
      return { ...action.messages };
    case REMOVE_MESSAGE:
      const newState = { ...state };
      delete newState[action.messageId];
      return newState;
    default:
      return state;
  }
};

export default messagesReducer