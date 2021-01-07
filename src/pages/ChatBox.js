
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import { LIKED_LIST, VISITOR_LIST_API ,FRIENDLIST_API, GET_USERPROFILE_API ,VIDEOCALL_API} from '../components/Api';
import Loader from '../components/Loader';
import { error } from "jquery";
// import MessageBox from '../components/MessageBox';
//import socketIOClient from 'socket.io-client'
import * as io from 'socket.io-client'

const ChatBox = () =>{

const[Likes, setLikes] = useState([]);
const[Visitors, setVisitors] = useState([]);
const[FriendList, setFriendlist] = useState([]);
const[isLoaded, setIsLoaded] = useState(false);
const[FriendUserId, setFriendId] = useState('');
const[AllData, setData] = useState('');
const[sendMessages , setSendMessages] = useState('');

 
 const socketUrl = 'http://localhost:3000';
 //const socketIo = require("socket.io");

 //const port = process.env.PORT || 3000;

   const bodyParameters = {
       session_id: localStorage.getItem('session_id'),
  };
//Likes here
  const getLikes = async () => {

  // Destructing response and getting data part
  const { data: {data} } = await axios.post(LIKED_LIST,bodyParameters)
  //  setTimeout(() => {
   
  //  setIsLoaded(true);
  //     }, 200);
   setLikes(data);
    }

    // Visitors here

    const getVisitors = async () => { 

  // Destructing response and getting data part
    const { data: {result} } = await axios.post(VISITOR_LIST_API,bodyParameters)
        setVisitors(result);
    
    }
    //Friends here

    const getFriend = async() => {
    const {data:{data}}= await axios.post(FRIENDLIST_API,bodyParameters)
    setFriendlist(data);
     }

  // fetching friends according to userID
        const friendListChat = async() => {
            const bodyParameters = {
            session_id: localStorage.getItem('session_id'),
            user_id: FriendUserId,
          };

     const {data:{data}}= await axios.post(GET_USERPROFILE_API,bodyParameters)
     setData(data);
     }

     const handleCall =() =>{
     const bodyParameters = {
      session_id: localStorage.getItem('session_id'),
      user_id :FriendUserId,
      type : 'audio',
      room_id : '1'
     }
     axios.post(VIDEOCALL_API , bodyParameters)
     .then((response) => {
     if(response.status==200) 
     {
       alert("call made successfully");
     }
     }, (error) => {

     });
     }

     useEffect(()=>{
       getLikes();
       getVisitors();
       getFriend(); 
     },[])

     useEffect(()=>{
       friendListChat();
     },[FriendUserId])
    
     const send = () => {
      const socket = io("localhost:3000"); 
       const bodyParameters ={
         session_id : localStorage.getItem("sesion_id") ,
         user_id : FriendUserId ,
        }
        //  io.on('connection',function(socket) {
        // console.log('made socket connection');
        socket.on('authenticate', function(data){
        socket.emit('authenticate', bodyParameters) 
     
        //console.log(data);
         });
      //  });
    }

    useEffect(()=> {
      // socket.off("authenticate");
    },[])
      //console.log(AllData);
      //console.log(FriendList);

    return( 
      
      <section className="home-wrapper"> 
      <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
       <div className="header-bar">
       <div className="container-fluid p-0">
      <div className="row no-gutters align-items-center">
        <div className="col-lg-3 p-3">
          <div className="d-flex flex-wrap align-items-center">
            <div className="logo-tab d-flex justify-content-between align-items-start">
              <a href="javascript:void(0)">
                <img src="/assets/images/glitters.png" alt="Glitters" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="rcall-head text-center">
            <h4>Activity</h4>
          </div>
        </div>
        <div className="col-lg-5 p-3">
          <div className="tab-top d-flex flex-wrap-wrap align-items-center">
            <div className="vc-action-tab ml-auto mr-4">
              <span>
                <i className="fas fa-crown" />
              </span>
              <span className="member-type">VIP</span>
            </div>
           <NavLinks />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="chat-box-wrapper">
    <div className="container">
      <div className="row panel messages-panel">
        <div className="contacts-list col-md-4">
          <ul className="nav inbox-categories d-flex flex-wrap mb-3" role="tablist">
            <li className="nav-item">
              <a id="tab-like" href="#like" className="nav-link active" data-toggle="tab" role="tab" onClick={getLikes} >Like</a>
            </li>
            <li className="nav-item">
              <a id="tab-visitors" href="#visitors" className="nav-link" data-toggle="tab" role="tab" onClick={getVisitors} >Visitors</a>
            </li>
            <li className="nav-item">
              <a id="tab-chat" href="#chat" className="nav-link" onClick={getFriend} data-toggle="tab" role="tab">Chat</a>
            </li>
          </ul>
          <div className="tab-content" role="tablist">
            <div id="like" className="contacts-outter-wrapper tab-pane fade show active" role="tabpanel" aria-labelledby="tab-like">
              <div className="contacts-outter">
              
              {/* { isLoaded && */}
                <ul className="nav contacts" role="tablist">
               
                { Likes.map((item, i) => {
                 return   <li className="nav-item">
                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab">
                      <img alt={item.liked_user_name} className="img-circle medium-image" src={item.liked_user_pic} />
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">{item.created_at}</span>
                          <h5 className="mb-0 name">{item.liked_user_name}</h5>
                          {/* <div className="message-count">2</div> */}
                        </div>
                        <div className="vcentered info-combo">
                          <p>Yep, I'm new in town and I wanted</p>
                        </div>
                      </div>
                    </a>
                
                  </li>
                
                  })}
                  
                </ul>
{/* } */}
              </div>
            </div>
            <div id="visitors" className="contacts-outter-wrapper tab-pane fade" role="tabpanel" aria-labelledby="tab-visitors">
              <div className="contacts-outter">
                <ul className="nav contacts" role="tablist">

              { Visitors.map((item, i) => {
                   return <li className="nav-item">
                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab" >
                      <img alt={item.full_name} className="img-circle medium-image" src={item.profile_images}/>
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">{item.created_at}</span>
                          <h5 className="mb-0 name">{item.full_name}</h5>
                          {/* {/* <div className="message-count">2</div> */}
                        </div>
                        <div className="vcentered info-combo">
                          <p>Yep, I'm new in town and I wanted</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  })}

                </ul>
              </div>
            </div>
            <div id="chat" className="contacts-outter-wrapper tab-pane fade" role="tabpanel" aria-labelledby="tab-chat">
              <div className="contacts-outter">
                <ul className="nav contacts" role="tablist">
                  
                  { FriendList.map((item, i) => {
                    return <li className="nav-item">
                    <a className="nav-link" href="#chat-field" data-toggle="tab" data-id={item.liked_user_id} role="tab" onClick={() => setFriendId(item.liked_user_id)}>
                      
                      <img alt="Mia" className="img-circle medium-image" src={item.liked_user_pic} />
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">{item.created_at}</span>
                          <h5 className="mb-0 name">{item.liked_user_name}</h5>
                          {/* <div className="message-count">2</div> */}
                        </div>
                        <div className="vcentered info-combo">
                          <p>Yep, I'm new in town and I wanted</p>
                        </div>
                      </div>
                    </a>
                  </li>
                   })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Chat box here */}
       <div className="col-md-8 tab-content chat-block" role="tablist">
          <div className="nothing-to-see text-center active">
            <figure>
              <img src="/assets/images/message-circle.png" alt="Message" />
              <figcaption>Nothing To See</figcaption>
            </figure>
          </div>
          <div className="tab-pane tab-pane fade" id="chat-field">
            <div className="message-top d-flex flex-wrap align-items-center justify-content-between">
              <div className="chat-header-info d-flex align-items-center">
                <img alt="Mia" className="img-circle medium-image" src={AllData.profile_images}/>
                <div className="chat-user-info ml-2">
                  <h5 className="mb-0 name">{AllData.first_name}</h5>
                  <div className="info">{AllData.occupation},  {AllData.age}</div>
                </div>
              </div>
              <div className="chat-call-opt">
                <a className="bg-grd-clr" onClick = {handleCall} href="javascript:void(0)">
                  <i className="fas fa-phone-alt" />
                </a>
              </div>
            </div>

            <div className="chat-date text-center my-2">Today</div>
              <div className="message-chat">

              <div className="chat-body">
                <div className="message info">
                  <div className="message-body">
                    <div className="message-text">
                      <p>Lorem ipsum dolor</p>
                    </div>
                  </div>
                </div>
                <div className="message my-message">
                  <div className="message-body">
                    <div className="message-body-inner">
                      <div className="message-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="message info">
                  <div className="message-body">
                    <div className="message-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chat-footer">
                <label className="upload-file">
                  <div>
                    <input type="file" required />
                    <i className="far fa-image" />
                  </div>
                </label>
                <textarea className="send-message-text" placeholder="Message..." defaultValue={""} />
                <label className="gift-message bg-grd-clr">
                  <a href="javascript:void(0)">
                    <i className="fas fa-gift" />
                  </a>
                </label>
                <label className="record-message">
                  <a href="javascript:void(0)">
                    <i className="fas fa-microphone" />
                  </a>
                </label>
                <button type="button" className="send-message-button bg-grd-clr" onClick={() => send()}><i className="fas fa-paper-plane" /></button>
              </div>
            </div>
            
          </div>

        </div>
        {/* End chat box here */}
      </div>

    </div>

  </div>
   
</section>

    )
}
export default ChatBox;



