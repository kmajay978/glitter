import { useCallback, useState } from "react"

export const addDefaultSrc = (ev) => {
    ev.target.src = '/assets/images/image-placeholder.jpg'
}

export const returnDefaultImage = (ev) => {
    return '/assets/images/image-placeholder.jpg'
}

export const checkLiveDomain = () => {
    // if (window.location.hostname === "rrmr.co.in") {
    return true
    // }
    // return false
}

export const changeImageLinkDomain = () => {
    // if (window.location.hostname === "rrmr.co.in") {
    return "https://rrmr.co.in/glitter-101/public/profile_images/"
    // }
    // return "http://167.172.209.57/glitter-101/public/profile_images/"
}

export const changeGiftLinkDomain = () => {
    // if (window.location.hostname === "rrmr.co.in") {
    return "https://rrmr.co.in/glitter-101/public/gifts_icons/"
    // }
    // return "http://167.172.209.57/glitter-101/public/gifts_icons/"
}

export const openNewWindow = (page) => {
    const host_name = window.location.hostname
    if (host_name === "glittersapp.com") {
        window.open('https://glittersapp.com' + page, 'PoP_Up', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,' + `height=${screen.height},width=${screen.width}`)
    }
    else {
        window.open('http://localhost:3000' + page, 'PoP_Up', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,' + `height=${screen.height},width=${screen.width}`)
    }

}

export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);
    }, [])
    return update;
}
