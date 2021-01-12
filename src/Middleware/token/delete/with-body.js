/*eslint-disable*/
import {LOGOUT_SUCCESS} from "../../../types/account/Login";

let Symbol = require('es6-symbol');

function deleteApiWithBody(endpoint, body) {
    const token = localStorage.getItem("token");
    let config = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: body
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
            }
            else {
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
    }
    catch (e) {
        return false
    }
    return true
}


export const CALL_DELETE_API_WITH_BODY = Symbol('Call Delete API with body');

export default store => next => action => {
    const deleteAPIWithBody = action[CALL_DELETE_API_WITH_BODY];
    // So the middleware doesn't get applied to every single action
    if (typeof deleteAPIWithBody === 'undefined') {
        return next(action);
    }
    let {endpoint, types, body} = deleteAPIWithBody;
    const [requestType, successType, errorType] = types;
    // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes

    return (next({type: requestType}), deleteApiWithBody(endpoint, body).then(
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