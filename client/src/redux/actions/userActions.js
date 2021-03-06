import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from "../types";

import axios from "axios";

export const loginUser = (userData) => (dispatch, history) => {
    dispatch({ type: LOADING_UI });
    console.log("History:")
    console.log(history)
    axios.post("/login", userData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            // history.push("/");
        })
        .catch(error => {
            console.log("Looking for errors...")
            console.log(error);
            console.log(error.response);
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            })

        })
}

export const signupUser = (newUserData) => (dispatch, history) => {
    dispatch({ type: LOADING_UI });

    axios.post("/signup", newUserData)
        .then(res => {
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.data
            })
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem(`FBIDToken`);
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.get(`/user`)
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post("/user/image", formData).then((res) => {
        dispatch(getUserData());
    }).catch(err => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post("/user", userDetails)
        .then(() => {
            dispatch(getUserData())
        })
        .catch(err => console.log(err))
}

const setAuthorizationHeader = (token) => {
    const FBIDToken = `Bearer ${token}`
    localStorage.setItem("FBIDToken", FBIDToken);
    axios.defaults.headers.common["Authorization"] = FBIDToken;
}

