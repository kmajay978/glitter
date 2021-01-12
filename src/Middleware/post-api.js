/*eslint-disable*/
let Symbol = require('es6-symbol');

async function postApi(endpoint, authenticated, body) {
    let token = localStorage.getItem('token') || null;
    let config = {};
    if (authenticated) {
        if (token) {
            config = {
                method: "POST",
                headers: {
                    'Authorization': `JWT ${token}`,
                    'Content-Type' : 'application/json'
                },
                body: body
            }
        }
        else {
            console.log("No token saved!")
        }
    }
    try {
        let response = await fetch(endpoint, config);
        if (response.status === 200) {
            return response.text().then(data=>{
                return isValidJSON(data)?({data: JSON.parse(data), status: response.status}):({data: "Success", status: response.status})
            })
        }
        else {
            return response.json().then(data =>
                ({data, status: response.status})
            )
        }
    }
    catch (e) {
        return ({data:{error: true, message: "Internal Server Error"}, status: 500})
    };
}
function isValidJSON(data) {
    try{
        JSON.parse(data);
    }
    catch(e) {
        return false
    }
    return true
}


export const POST_API = Symbol('Call Post API');

export default store => next => action => {
    const postAPI = action[POST_API];
    // So the middleware doesn't get applied to every single action
    if (typeof postAPI === 'undefined') {
        return next(action);
    }
    let {endpoint, authenticated, types, body} = postAPI;
    const [requestType, successType, errorType] = types;
    // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes

    return (next({type: requestType, body:body}),postApi(endpoint, authenticated, body).then(
            response => {
                if (response.status === 200) {
                    return next({
                        response,
                        authenticated,
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