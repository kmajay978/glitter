export const addDefaultSrc = (ev) => {
    ev.target.src = '/assets/images/image-placeholder.jpg'
}

export const returnDefaultImage = (ev) => {
    return '/assets/images/image-placeholder.jpg'
}

export const checkLiveDomain = () => {
    if (window.location.hostname === "rrmr.co.in") {
        return true
    }
    return false
}