let Symbol = require('es6-symbol');

function postWithoutTOKEN(endpoint, body) {
    let config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    };
    return fetch(endpoint, config)
        .then((response)=>{
            if (response.status === 200) {
                return response.text().then(data=>{
                    return isValidJSON(data)?({data: JSON.parse(data), status: response.status}):({data: {error: true, message: "Unable to parse json."}, status: response.status})
                })
            }
            else {
                return response.json().then(data =>
                    ({data, status: response.status})
                )
            }
        })
        .catch(() => ({data:{error: true, message: "Internal Server Error"}, status: 500}));
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

export const POST_WITHOUT_TOKEN = Symbol('Post Without Token');

export default store => next => action => {
    const postWithoutToken = action[POST_WITHOUT_TOKEN];
    // So the middleware doesn't get applied to every single action
    if (typeof postWithoutToken === 'undefined') {
        return next(action);
    }
    let {endpoint, types, body} = postWithoutToken;
    const [requestType, successType, errorType] = types;
    // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
    return (next({type: requestType}),postWithoutTOKEN(endpoint, body).then(
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