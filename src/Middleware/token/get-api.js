/**
 * Created by Dupnder on 11/01/19.
 */
import {LOGOUT_SUCCESS} from "../../types/account/Login";

let Symbol = require('es6-symbol');

function getApi(endpoint, tokenForGeneratingTest) {
    let token = null;
    if (!!tokenForGeneratingTest) {
        token = tokenForGeneratingTest;
    } else {
        token = localStorage.getItem('token');
    }
    let config = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return fetch(endpoint, config)
        .then((response) => {
            if (response.status === 200) {
                return response.text().then(data => {
                    return isValidJSON(data) ? ({data: JSON.parse(data), status: response.status}) : ({
                        data: {
                            error: true,
                            message: "Error while parsing the json."
                        }, status: response.status
                    })
                })
            } else {
                return response.json().then(data =>
                    ({data, status: response.status})
                )
            }
        })
        .catch(err => ({data: {error: true, message: "Internal Server Error"}, status: 500}));
}

function isValidJSON(data) {
    try {
        JSON.parse(data);
    } catch (e) {
        return false
    }
    return true
}

export const GET_API = Symbol('Call API');

export default store => next => action => {
    const getAPI = action[GET_API];
    // So the middleware doesn't get applied to every single action
    if (typeof getAPI === 'undefined') {
        return next(action);
    }
    let {endpoint, types, token} = getAPI;
    const [requestType, successType, errorType] = types;
    return (next({type: requestType}), getApi(endpoint, token).then(
        response => {
            if (response.status === 401) {
                return next({
                    response,
                    type: LOGOUT_SUCCESS
                })
            } else {
                if (response.status === 200) {
                    return next({
                        response,
                        type: successType
                    })
                } else {
                    return next({
                        response,
                        type: errorType
                    })
                }
            }
        }
    ))
}
