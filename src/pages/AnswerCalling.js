import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import {SOCKET} from "../components/Config";
const AnswerCalling = () =>{
    const history = useHistory();
    const receiverDetails = !!localStorage.getItem("receiverDetails") ? JSON.parse(localStorage.getItem("receiverDetails")) : null
    useEffect(() => {
        return () => localStorage.removeItem("receiverDetails")
    }, [])
    const videoChatNow = () => {
        if (!!receiverDetails) {
            history.push(receiverDetails.link)
        }
    }
    const rejectVideoChat = () => {
         if (!!receiverDetails) {
            SOCKET.emit("receiver_decline_video_call", {
                sender: {user_from_id: receiverDetails.user_from_id},
                reciever_id: receiverDetails.user_to_id,
                channel_name: receiverDetails.channel_name,
                type: 0,
                status: 2
            });
         }
    }
    return(
        <section className="home-wrapper">
            <div className="vc-screen-wrapper">
                <div className="vc-incoming-wrapper active">
                    <div className="vc-incoming-inner"><span className="btn-close" style={{cursor: "pointer"}} onClick={rejectVideoChat}>×</span>
                        <div className="vc-ic-user text-center">
                            <figure>
                                {
                                    !!receiverDetails ?
                                        <img src={"http://167.172.209.57/glitter-101/public/profile_images/"+receiverDetails.profilePics} alt={receiverDetails.firstName}/>
                                        :
                                        <img src={"http://167.172.209.57/glitter-101/public/profile_images/1611574536_download.jpg"} alt="placeholder"/>
                                }
                                {
                                    !!receiverDetails &&
                                    <figcaption><h4>{receiverDetails.firstName +" "+ receiverDetails.lastName +", " + receiverDetails.age}</h4><span>{50+"Km, " + receiverDetails.occupation}</span></figcaption>
                                }
                                {
                                    !receiverDetails &&
                                    <figcaption><h4> , </h4><span> km, </span></figcaption>
                                }
                            </figure>
                        </div>
                        <div className="vc-cta-btns d-flex flex-wrap align-items-center justify-content-between mt-5"><a
                            className="btn bg-grd-clr cta-accept" href="javascript:void(0)" onClick={videoChatNow}>Accept</a><a
                            className="btn btn-trsp cta-reject" href="javascript:void(0)" onClick={rejectVideoChat}>Reject</a></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AnswerCalling;