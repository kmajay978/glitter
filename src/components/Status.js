import React, { useState} from "react";

const Status = () => {

  

<div class="modal fade" id="status-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body p-0">
          <div class="status-info">
            <div class="status_image">
                <img src="images/marlene_user.jpg" alt="user"/>
            </div>
             <div class="status_heading">
                 <h6>Augusta Castro • 20</h6>
                 <span class="timer d-block">9 Seconds</span>
                 <span class="status_view"><img src="/assets/images/eye-icon.svg" alt="eye"/>2022</span>
             </div>
              
          </div>
      
         
             <div class="status-bar__items">
                 <img src="/assets/images/status-img.jpg" alt="status"/>
             </div>
            
      
      </div>
    </div>
    <div class="status_footer">
        <div class="status_like">
            <span><img src="/assets/images/heart-icon.svg" alt="like status"/> 2,190</span>
        </div>
    <div class="user_connect ml-auto">
        <ul>
            <li class="bg-grd-clr"><img src="/assets/images/message.svg" alt="message"/></li>
            <li class="bg-grd-clr"><img src="/assets/images/call-answer.svg" alt="call"/></li>
            <li class="bg-grd-clr"><img src="/assets/images/message.svg" alt="video call"/></li>
            <li class="bg-grd-clr"><img src="/assets/images/message.svg" alt="gift"/></li>
        </ul>
    </div>    
        
        
    </div>
    
    
  </div>
</div>
}
export default Status