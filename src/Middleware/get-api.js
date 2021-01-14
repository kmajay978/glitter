/**
 * Created by Dupnder on 11/01/19.
 */

let Symbol = require('es6-symbol');

async function getApi(endpoint) {

    let token = localStorage.getItem('token');
    const config = {
        headers: {'Authorization': `Bearer ${token}`}
    };
    try {
        let response = await fetch(endpoint, config);
        if (response.status === 200) {
            return response.text().then(data => {
                return isValidJSON(data) ? ({data: JSON.parse(data), status: response.status}) : ({
                    data: "Success",
                    status: response.status
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

export const GET_API = Symbol('Call API');

export default store => next => action => {
    const getAPI = action[GET_API];
    // So the middleware doesn't get applied to every single action
    if (typeof getAPI === 'undefined') {
        return next(action);
    }
    let {endpoint, types} = getAPI;
    const [requestType, successType, errorType] = types;
    return (next({type: requestType}), getApi(endpoint).then(
        response => {
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
    ))
}