/**
 * Created by Dupnder on 11/01/19.
 */
import {LOGOUT_SUCCESS} from "../../types/account/Login";

let Symbol = require('es6-symbol');

const config ={
    method: "GET"
};
async function getWithoutToken(endpoint) {
    try {
        let response = await fetch(endpoint, config);
        if (response.status === 200) {
            return response.text().then(data => {
                return isValidJSON(data) ? ({data: JSON.parse(data), status: response.status}) : ({
                    data: {
                        error: true,
                        message: "Error while parsing the json."
                    }, status: response.status
                })
            })
        }
        else {
            return response.json().then(data =>
                ({data, status: response.status})
            )
        }
    }
    catch (e) {
        return ({data: {error: true, message: "Internal Server Error"}, status: 500})
    }
}

function isValidJSON(data) {
    try {
        JSON.parse(data);
    }
    catch (e) {
        return false
    }
    return true
}

export const GET_API_WITHOUT_TOKEN = Symbol('Call API Without Token');

export default store => next => action => {
    const getAPIWithoutToken = action[GET_API_WITHOUT_TOKEN];
    // So the middleware doesn't get applied to every single action
    if (typeof getAPIWithoutToken === 'undefined') {
        return next(action);
    }
    let {endpoint, types} = getAPIWithoutToken;
    const [requestType, successType, errorType] = types;
    return (next({type: requestType}), getWithoutToken(endpoint).then(
        response => {
            if (response.status === 401) {
                return next({
                    response,
                    type: LOGOUT_SUCCESS
                })
            }
            else {
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