import  csrfFetch from "./csrf"

const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";

export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
})

export const removeCurrentUser = userId => ({
    type: REMOVE_CURRENT_USER,
    userId
})

const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
  }

export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(receiveCurrentUser(data.user));
    return response;
};

export const loginUser = user => async (dispatch) =>{
    const { credential, password } = user;
    let res = await csrfFetch("/api/session",{
        method: "POST",
        body: JSON.stringify({credential, password})
    })
    let data = await res.json();
    dispatch(receiveCurrentUser(data.user));
    return res 
}

export const logoutUser = () => async (dispatch) =>{
    let res = await csrfFetch("/api/session",{ method: "DELETE"});
    storeCurrentUser(null)
    dispatch(removeCurrentUser());
    return res
}

export const signup = user => async (dispatch) => {
    const { username, email, password, birthday } = user;
    let res = await csrfFetch("/api/users",{
        method: "POST",
        body: JSON.stringify({username, email, password, birthday})
    })
    let data = await res.json();
    storeCurrentUser(data.user)
    dispatch(receiveCurrentUser(data.user))
    return res
}


const sessionReducer = (state = { currentUser: null },action) =>{
    switch (action.type){
        case REMOVE_CURRENT_USER:
            return  { ...state, currentUser: null }
        case RECEIVE_CURRENT_USER:
            return {...state, currentUser: action.user}
        default:
            return state
    }
}

export default sessionReducer;
