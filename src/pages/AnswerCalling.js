import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import { SOCKET } from "../components/Config";
import { useSelector } from "react-redux";
import { userProfile } from "../features/userSlice";
import { changeImageLinkDomain } from "../commonFunctions";

let pickVideoCallInterval, pickVideoCallCount = 0, userData;

const AnswerCalling = () => {
    const history = useHistory();
    userData = useSelector(userProfile).user.profile; //using redux useSelector here
    const receiverDetails = !!localStorage.getItem("receiverDetails") ? JSON.parse(localStorage.getItem("receiverDetails")) : null
    const senderDetails = !!localStorage.getItem("receiverDetails") ? JSON.parse(localStorage.getItem("receiverDetails")).sender_details : null
    useEffect(() => {
        pickVideoCallInterval = window.setInterval(() => {
            pickVideoCallCount = pickVideoCallCount + 1;
            SOCKET.emit("check_pick_video_call_status", {
                type: receiverDetails.type,
                channel_name: receiverDetails.channel_name,
                user_from_id: receiverDetails.user_from_id,
                user_to_id: receiverDetails.user_to_id,
                pickVideoCallCount
            })
        }, 1000)

        SOCKET.off('stop_pick_video_call_status').on("stop_pick_video_call_status", (data) => {

            if (!!userData && (data.user_to_id == userData.user_id)) { // check one-to-one data sync
                clearInterval(pickVideoCallInterval);
                pickVideoCallCount = 0;
            }
        })

        return () => { localStorage.removeItem("receiverDetails") }
    }, [])
    const videoChatNow = () => {
        if (!!receiverDetails) {
            history.push(receiverDetails.link)
        }
    }
    const rejectVideoChat = () => {
        if (!!receiverDetails) {
            SOCKET.emit("receiver_decline_video_call", {
                sender: { user_from_id: receiverDetails.user_from_id },
                reciever_id: receiverDetails.user_to_id,
                channel_name: receiverDetails.channel_name,
                type: Number(receiverDetails.type),
                status: 2
            });
        }
    }
    return (
        <section className="home-wrapper">
            <div className="vc-screen-wrapper">
                <div className="vc-incoming-wrapper active">
                    <div className="vc-incoming-inner"><span className="btn-close" style={{ cursor: "pointer" }} onClick={rejectVideoChat}>×</span>
                        <div className="vc-ic-user text-center">
                            <figure>
                                {
                                    !!senderDetails ?
                                        <img src={changeImageLinkDomain() + senderDetails.profilePics} alt={senderDetails.firstName} />
                                        :
                                        <img src={changeImageLinkDomain() + "1611574536_download.jpg"} alt="placeholder" />
                                }
                                {
                                    !!senderDetails &&
                                    <figcaption><h4>{senderDetails.firstName + " " + senderDetails.lastName + ", " + senderDetails.age}</h4><span>{50 + "Km, " + senderDetails.occupation}</span></figcaption>
                                }
                                {
                                    !senderDetails &&
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