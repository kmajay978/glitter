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

export const changeImageLinkDomain = () => {
    if (window.location.hostname === "rrmr.co.in") {
        return "https://rrmr.co.in/glitter-101/public/profile_images/"
    }
    return "http://167.172.209.57/glitter-101/public/profile_images/"
}
