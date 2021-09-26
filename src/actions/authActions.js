import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

const baseURL = "https://urlshort-backend.herokuapp.com"

//check token and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });



    axios.get(`${baseURL}/auth/getuser`, tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}
//register users
export const register = ({ name, email, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({ name, email, password });
    axios.post(`${baseURL}/user`, body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

//LogOut User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

//Login Users
export const LogIn = ({ email, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({ email, password });
    axios.post(`${baseURL}/auth/login`, body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const tokenConfig = getState => {
    //Get token from localstorage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    //if token add to headers
    if (token) {
        config.headers['x-auth-token'] = token
    }
    return config;
}