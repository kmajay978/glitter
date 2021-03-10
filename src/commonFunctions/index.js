import { useCallback, useState } from "react"

export const addDefaultSrc = (ev) => {
    ev.target.src = '/assets/images/image-placeholder.jpg'
}

export const returnDefaultImage = (ev) => {
    return '/assets/images/image-placeholder.jpg'
}

export const checkLiveDomain = () => {
    if (window.location.hostname === "glittersapp.com") {
        return true
    }
    return false
}

export const changeImageLinkDomain = () => {
    if (window.location.hostname === "glittersapp.com") {
        return "https://glittersapp.com/glitter-101/public/profile_images/"
    }
    return "http://167.172.209.57/glitter-101/public/profile_images/"
}

export const changeGiftLinkDomain = () => {
    if (window.location.hostname === "glittersapp.com") {
        return "https://glittersapp.com/glitter-101/public/gifts_icons/"
    }
    return "http://167.172.209.57/glitter-101/public/gifts_icons/"
}


export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick(tick => tick + 1);
    }, [])
    return update;
  }
  