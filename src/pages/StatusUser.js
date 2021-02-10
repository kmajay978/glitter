import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {friendStatusData} from "../features/userSlice";

const StatusUser = () => {

  const friendStatus = useSelector(friendStatusData);
  const [status , setStatus] = useState([]); 
  
  useEffect(() => {
    setStatus(friendStatus);
 }, [friendStatus])

return(
<div className="" id="status-modal" >
{!!status &&
<>
{status.map((item, index) => {
  return  <div className="modal-content">
      
          <div className="status-info">
            <div className="status_image">
                <img src="/assets/images/marlene_user.jpg" alt="user"/>
            </div>
             <div className="status_heading">
                 <h6>Augusta Castro • 20</h6>
                 <span className="timer d-block">9 Seconds</span>
                 <span className="status_view"><img src="/assets/images/eye-icon.svg" alt="eye"/>2022</span>
             </div>
              
          </div>
      
         
             <div className="status-bar__items">
             {item.type=="text" ? <div><p>{item.url.replace("http://167.172.209.57/glitter-101/public/profile_images/")}</p></div>
      : item.type=="image"?  <img src={item.url} alt="status"/>
      : item.type=="video"? <video src={item.url} width="300" height="400" type="video/mp4"  />
      : ""}
                 {/* <img src={item.url} alt="status"/> */}
             </div>
            
      
  
   
    <div className="status_footer">
        <div className="status_like">
            <span><img src="/assets/images/heart-icon.svg" alt="like status"/> 2,190</span>
        </div>
    <div className="user_connect ml-auto">
        <ul>
            <li className="bg-grd-clr"><img src="/assets/images/message.svg" alt="message"/></li>
            <li className="bg-grd-clr"><img src="/assets/images/call-answer.svg" alt="call"/></li>
            <li className="bg-grd-clr"><img src="/assets/images/message.svg" alt="video call"/></li>
            <li className="bg-grd-clr"><img src="/assets/images/message.svg" alt="gift"/></li>
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