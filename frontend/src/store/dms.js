import csrfFetch from "./csrf";

export const RECEIVE_DM = 'RECEIVE_DM';
export const RECEIVE_DMS = 'RECEIVE_DMS';
export const REMOVE_DM = 'REMOVE_DM';

export const receiveDM = dm => {
  return {
    type: RECEIVE_DM,
    dm
  };
};

export const receiveDMs = dms => {
  return {
    type: RECEIVE_DMS,
    dms
  };
};

export const removeDM = dmId => {
  return {
    type: REMOVE_DM,
    dmId
  };
};

export const indexDM = () => async (dispatch) => {
	await csrfFetch(`/api/dms`)
		.then((res) => res.json())
		.then((DMs) => dispatch(receiveDMs(DMs)))
		.catch((err) => (err));
};

export const createDM = formData => async (dispatch) => {
  await csrfFetch('/api/dms', {
		method: 'POST',
		body: formData
	})
    .then((res) => res.json())
		.then((newDM) => {
      dispatch(receiveDM(newDM))})
		.catch((err) => (err));
}

export const destroyDM = (DMId) => async (dispatch) => {
	await csrfFetch(`/api/dms/${DMId}`, {
		method: 'DELETE'
	})
		.then(() => dispatch(removeDM(DMId)))
		.catch((err) => (err));
};


const DMsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_DM:
      const { dm } = action;
      return { ...state, [dm.id]: dm };
    case RECEIVE_DMS:
      return { ...action.dms };
    case REMOVE_DM:
      const newState = { ...state };
      delete newState[action.dmId];
      return newState;
    default:
      return state;
  }
};

export default DMsReducer