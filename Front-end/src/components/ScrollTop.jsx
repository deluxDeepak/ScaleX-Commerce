import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// layout ke andar lagate hain taaki har route change par page top pe scroll ho jaye.
const ScrollTop = () => {

    // Detect the route change 
    const { pathname } = useLocation();
    console.log("Pathname from the uselocation", pathname);

    useEffect(() => {
        window.scroll(0, 0);
    }, [pathname])

    return null;
}

export default ScrollTop