import csrfFetch from "./csrf";

export const RECEIVE_STREAM = 'RECEIVE_STREAM';
export const REMOVE_STREAM = 'REMOVE_STREAM';

export const receiveStream = stream => {
  return {
    type: RECEIVE_STREAM,
    stream
  };
};

export const removeStream = streamId => {
  return {
    type: REMOVE_STREAM,
    streamId
  };
};

export const createCall = (stream, channel) => async (dispatch) => {
    await csrfFetch('/api/videos', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(stream, channel)
          })
          .then((res) => res.json())
              .then((stream) => dispatch(receiveStream(stream)))
              .catch((err) => console.log(err));
}

export const destroyCall = (streamId, channel) => async (dispatch) => {
	await csrfFetch(`/api/videos/${streamId}`, {
		method: 'DELETE',
        body: JSON.stringify(channel)
	})
		.then(() => dispatch(removeStream(streamId)))
		.catch((err) => console.log(err));
};

const videosReducer = (state = {}, action) => {
    Object.freeze(state);
  
    switch (action.type) {
      case RECEIVE_STREAM:
        const { stream } = action;
        return { ...state, [stream.id]: stream };
      case REMOVE_STREAM:
        const newState = { ...state };
        delete newState[action.streamId];
        return newState;
      default:
        return state;
    }
  };
  
  export default videosReducer