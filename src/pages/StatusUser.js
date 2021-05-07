import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { changeImageLinkDomain } from "../commonFunctions";
import { friendStatusData } from "../features/userSlice";
let myInterval;

const StatusUser = () => {

    const friendStatus = useSelector(friendStatusData);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        //   if (friendStatus.length > 0) {
        //       let friendStatusDetails = friendStatus;
        //       let timeCount = 0;
        //   for (let elm of friendStatusDetails) {
        //     if (elm.type === "text") {
        //         elm.tim = 3000;
        //         timeCount = timeCount + 3000;
        //     }
        //     if (elm.type === "video") {
        //         elm.tim = 8000;
        //         timeCount = timeCount + 8000;
        //     }
        //     if (elm.type === "image") {
        //         elm.tim = 5000;
        //         timeCount = timeCount + 5000;
        //     }
        //   }
        //   let manageTime = 0;
        //   let defaultArrayTotalIndex = 0;
        //   let arrayTotalIndex = friendStatusDetails.length - 1;
        // myInterval = window.setInterval(() => {
        //     manageTime = manageTime + 1000;

        //         //     if (manageTime <= friendStatusDetails[defaultArrayTotalIndex].tim) {
        //         //         for (let j in friendStatusDetails) {
        //         //             if (j == defaultArrayTotalIndex) {
        //         //                 document.getElementById("status-"+j).style.display = "block"
        //         //             }
        //         //             if (j != defaultArrayTotalIndex) {
        //         //                 document.getElementById("status-"+j).style.display = "none"
        //         //             }
        //         //         }
        //         //     }

        //     if (manageTime == friendStatusDetails[defaultArrayTotalIndex].tim) {
        //         defaultArrayTotalIndex = ((defaultArrayTotalIndex + 1) <= arrayTotalIndex) ? defaultArrayTotalIndex + 1 : null;
        //         if (defaultArrayTotalIndex !== null) {
        //             friendStatusDetails[defaultArrayTotalIndex].tim = friendStatusDetails[defaultArrayTotalIndex].tim + manageTime;
        //         }
        //     } 
        // }, timeCount)

        //     setStatus(friendStatus);
        //   }
    }, [friendStatus])

    return (
        <div className="" id="status-modal" >
            {!!status &&
                <>
                    {status.map((item, index) => {
                        return <div className="modal-content" id={"status-" + index}>
                            <progress id={"progress-" + index} value="0" max="100"></progress>
                            <div className="status-info">
                                <div className="status_image">
                                    <img src={item.header.profileImage} alt="user" />
                                </div>
                                <div className="status_heading">
                                    <h6>{item.header.heading} • {item.header.age}</h6>
                                    <span className="timer d-block">{item.header.subheading}</span>
                                    <span className="status_view"><img src="/assets/images/eye-icon.svg" alt="eye" />{Number(item.totalviews)}</span>
                                </div>
                            </div>

                            <div className="status-bar__items">
                                {item.type == "text" ? <div><p>{item.url.replace(changeImageLinkDomain())}</p></div>
                                    : item.type == "image" ? <img src={item.url} alt="status" />
                                        : item.type == "video" ? <video src={item.url} width="300" height="400" type="video/mp4" />
                                            : ""}

                            </div>

                            <div className="status_footer">
                                <div className="status_like">
                                    <span><img src="/assets/images/heart-icon.svg" alt="like status" /> 2,190</span>
                                </div>
                                <div className="user_connect ml-auto">
                                    <ul>
                                        <li className="bg-grd-clr"><img src="/assets/images/message.svg" alt="message" /></li>
                                        <li className="bg-grd-clr"><img src="/assets/images/call-answer.svg" alt="call" /></li>
                                        <li className="bg-grd-clr"><img src="/assets/images/message.svg" alt="video call" /></li>
                                        <li className="bg-grd-clr"><img src="/assets/images/message.svg" alt="gift" /></li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    })}
                </>
            }
        </div>
    )
}
export default StatusUser;