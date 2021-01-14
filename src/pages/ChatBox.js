
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import { LIKED_LIST, VISITOR_LIST_API ,FRIENDLIST_API, GET_USERPROFILE_API ,VIDEOCALL_API} from '../components/Api';
import Loader from '../components/Loader';
import { error } from "jquery";
import {SOCKET} from '../components/Config';
import {addBodyClass} from '../components/CommonFunction'; 
import  $ from 'jquery';


const ChatBox = () =>{

const[Likes, setLikes] = useState([]);
const[Visitors, setVisitors] = useState([]);
const[FriendList, setFriendlist] = useState([]);
const[isLoaded, setIsLoaded] = useState(false);
const[FriendUserId, setFriendId] = useState('');
const[AllData, setData] = useState('');
const[CompleteMessageList, setMessages] = useState([]);
const[UserMessage, setuserMessage] = useState('');

// console.log(UserMessage);
const[GetActivity, setActivity] = useState(0);


 console.log(CompleteMessageList, "nowwww")
const sessionId = localStorage.getItem('session_id');
 
   const bodyParameters = {
       session_id: sessionId,
  };
  
  // Fetching details of user initial time 
  const getAllDetails = async () => {
  const likes = await axios.post(LIKED_LIST,bodyParameters)
   setLikes(likes.data.data);
    
  // Destructing response and getting data part
    const visitor = await axios.post(VISITOR_LIST_API,bodyParameters)
        setVisitors(visitor.data.result);
 
    const friend= await axios.post(FRIENDLIST_API,bodyParameters)
    setFriendlist(friend.data.data); 
  }

// Onclick button, getting LIkes, Visitor and friends list 
 
    const getLikes = async () => {  //Likes here
        setActivity(0);
    const { data: {data} } = await axios.post(LIKED_LIST,bodyParameters)
    setLikes(data);
      }

    const getVisitors = async () => {  // Visitors here
    setActivity(1);
    const { data: {result} } = await axios.post(VISITOR_LIST_API,bodyParameters)
        setVisitors(result);
    
    }
    
    const getFriend = async() => { //Friends here
       setActivity(2);
    const {data:{data}}= await axios.post(FRIENDLIST_API,bodyParameters)
    setFriendlist(data);
     }

  // fetching friends according to userID
        const getFriendDetails = async() => {
            const bodyParameters = {
            session_id: localStorage.getItem('session_id'),
            user_id: FriendUserId,
          };

     const {data:{data}}= await axios.post(GET_USERPROFILE_API,bodyParameters)
     setData(data);
     }

    // Adding call functionality here
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

/************************************* Working here socket *******************************************************/

  // function readThenSendFile(data){
  //     var reader = new FileReader();
  //     reader.onload = function(evt){
  //         var msg ={};
  //         msg.file = evt.target.result;
  //         msg.fileName = data.name;
  //         msg.sessionId = sessionId;
  //         console.log(msg, "msg...")
  //         SOCKET.emit('media_file', msg);
  //     };
  //     reader.readAsDataURL(data);
  // }


    // Authenicating user here
   const DetermineUser = () => {
        var secondUserDataId = FriendUserId;
       SOCKET.emit("authenticate", {
            session_id: sessionId,
            reciever_id: secondUserDataId,
      });
    }

    // Socket Methods 
      const CheckTextInputIsEmptyOrNot = () =>  {
   
        if ( UserMessage != '') {
             var secondUserDataId = FriendUserId;
            var message = { "session_id": sessionId, "reciever_id": secondUserDataId, "message": UserMessage }
            console.log('sent>>>> Data', message);
            SOCKET.emit("send_message", message)
            OnReceivedMessage(message) //Calling On recieve message here 
        } else {
            console.log("Please enter message")
        }
    }

  // User entered message here
  const OnReceivedMessage = (messages) => {
        console.log("listen message")
        // console.log(messages.obj)
         SOCKET.on('message_data', (messages) => {
           console.log(messages, "test..");
           let messageList = CompleteMessageList;
           messageList.push(messages.obj)
           console.log(messageList, "messageList...")
         setMessages(messageList)
        });
         setuserMessage(''); //Empty user input here  
    }
   
  // Get all messages here
    const GetAllMessages = (messages) => {
         console.log(messages.message_list,"messages.message_list....")
      
    }


// console.log(FriendUserId);
     useEffect(()=>{

    //    window.setTimeout(() => {
    //  $('#uploadfile').bind('change', function(e){
    // var data = e.originalEvent.target.files[0];
    // readThenSendFile(data);
    //   })
    // }, 1000); 

      getAllDetails()
     },[])

 useEffect(()=>{
   if (GetActivity === 2) {
     console.log("connect socket")
    
      SOCKET.connect();
   }
   else {
      SOCKET.disconnect();
   }
     },[GetActivity])

     useEffect(()=>{
      
        if (GetActivity === 2) {
                  getFriendDetails(); 
                  SOCKET.on('getMessage', (messages) => { // only one time
                  console.log(messages, "hahahaha")
                  setMessages(messages.message_list)
        });   
        }
       if (!!FriendUserId) {
          DetermineUser();
        //  GetAllMessages();
        //  OnReceivedMessage();
         
       }
       // get messagesfrom socket...
     
     },[FriendUserId])
     

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
                    <a className="nav-link" href="#chat-field" data-toggle="tab" data-id={item.liked_user_id} role="tab" onClick={() =>  setFriendId(item.liked_user_id)}>
                      
                      <img alt="Mia" className="img-circle medium-image" src={item.profile_images} />
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">{item.created_at}</span>
                          <h5 className="mb-0 name">{item.first_name}</h5>
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
{
  CompleteMessageList.map((data, i) => (
    <div>
    {
     (data.user_from_id === FriendUserId) ?
 <div className="message info">
                  <div className="message-body">
                    <div className="message-text">
                      <p>{data.message}</p>
                    </div>
                  </div>
                </div>
                :
 <div className="message my-message">
                  <div className="message-body">
                    <div className="message-body-inner">
                      <div className="message-text">
                        <p>{data.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
    }
</div>
  ))
}            
              </div>

              <div className="chat-footer">
                <label className="upload-file">
                  <div>
                    <input id="uploadfile" type="file" required />
                    <i className="far fa-image" />
                  </div>
                </label>
                {/* <textarea className="send-message-text" placeholder="Message..." defaultValue={UserMessage} /> */}
                  <input className="send-message-text" name="Message" id="Message" type="text" placeholder="Message..." value={UserMessage} onChange={e => setuserMessage(e.target.value)} />
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
                <button type="button" className="send-message-button bg-grd-clr" onClick={CheckTextInputIsEmptyOrNot}><i className="fas fa-paper-plane" /></button>
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





// created_at: "2021-01-13T00:09:46.000Z"
// id: 1
// media: null
// message: "This is test message"
// message_is_read: 1
// updated_at: "2021-01-13T00:02:28.000Z"
// user_from_id: 4
// user_to_id: 3