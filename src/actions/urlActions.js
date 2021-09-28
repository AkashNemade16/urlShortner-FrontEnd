import * as api from '../api';
import axios from "axios"
import { FETCH_USER_URLS,CLEAR_DATA } from './types';
const baseURL = "https://urlshort-backend.herokuapp.com"
//action creators
export const getUrlPost = async (dispatch) => {
    try {
        const { data } = await api.fetchUrl();
        dispatch({ type: "FETCH", payload: data });
    } catch (e) {
        console.log(e);
    }
}

export const createUrl = (url) => async (dispatch) => {
    try {
        const { data } = await api.createUrl(url);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

//fetch user urls
// export const getUserUrls = (email) => async (dispatch) => {
//     try {
//         const { data } = await api.fetchUserUrls(JSON.stringify(email));
//         console.log({ data })
//         dispatch({ type: 'FETCH_USER_URLS', payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getUserUrls = (email) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = { email };
    axios.post(`${baseURL}/users`, body, config)
        .then(res => dispatch({
            type: FETCH_USER_URLS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err)
        })
}

export const clearData = ()  => {
    return {
        type: CLEAR_DATA
    };
};



