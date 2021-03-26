import React, { useState, useEffect } from "react";
import {  useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {videoCall} from "../features/userSlice";

 

const NavLinks = () => {
  //  const {route} = useRouter()
    const dispatch = useDispatch();
    const history = useHistory();

    const [path, setPath] = useState("")

    let pathname = window.location.pathname;

 
    useEffect(() => {
 
      // alert(window.location.href)
        pathname = window.location.pathname;
        // if (pathname !==)/chat   /searching-profile  /video-chat  /answer-calling
        if (pathname !== "/chat" &&
            pathname !== "/searching-profile" &&
            pathname !== "/answer-calling" &&
            !pathname.match("/video-chat")) {
            localStorage.removeItem("videoCallPageRefresh");
            dispatch(videoCall(null))
        }
        setPath(pathname)
      
    }, [window.location.pathname]);

    // useEffect(() => {
    //   return () => {
    //     // && history.location.pathname === "any specific path")
    //     if (history.action === "POP") {
    //       alert("pop")
    //       history.replace(history.location.pathname, /* the new state */);
    //     }
    //   };
    // }, [history])

    return(
      !path.match("/live-video-chat") && !path.match("/searching-profile") &&
      !path.match("/audio-chat") && !path.match("/video-chat") &&
         <ul className="feature-menu ml-auto">
              <li className={`${pathname === '/' ? 'active' : ''}`}>
                   <Link to="/">
                    <i className="fas fa-compass" />
                    <span>Discover</span>
                  </Link>
                </li>
                {/* <li className={`${pathname.match('/searching-profile') ? 'active' : ''}`}>
                    <Link to="/searching-profile">
                     <i className="fas fa-video" />
                    <span>Video Chat</span>
                  </Link>
                </li> */}
                <li className={`${pathname === '/chat' ? 'active' : ''}`}>
                   <Link to="/chat">
                     <i className="fas fa-layer-group" />
                    <span>Activity</span>
                </Link>
                </li>
                <li className={`${pathname === '/profile' ? 'active' : ''}`}>
                <Link to="/profile">
                    <i className="fas fa-user" />
                    <span>Profile</span>
                </Link>
                </li>
              </ul>
    )
}
export default NavLinks;



