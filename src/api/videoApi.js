import axios from "axios";
import { TOKEN_AGORA_API, VIDEO_CALL_START } from "../components/Api";
import { videoCall } from "../features/userSlice";

export const generateVideoChatToken = (dispatch, bodyParameters, startVideoChatInitParams) => {
      axios.post(TOKEN_AGORA_API,bodyParameters)
      .then((response) => {
        if (response.status === 200) {
            const newState = {
                channel_name: response.data.channelName,
                channel_token:  response.data.token
            }    
            alert("success")
            dispatch(videoCall(newState))
            // startVideoChatInit(dispatch, startVideoChatInitParams)
        }
        else {
         alert(response.data.message)
        }
        
   }, (error) => {
      alert(error.message)
  });
}

export const startVideoChatInit = (dispatch, bodyParameters) => {
      axios.post(VIDEO_CALL_START,bodyParameters)
      .then((response) => {
        if (response.status === 200 && !response.status.error) {
          window.setTimeout(() => {
            dispatch(videoCall(null))
            // history.push("/"+videoCallState.channel_id+"/video-chat")
          }, 5000)
        }
        else {
         alert()
        }
        
   }, (error) => {
      alert("api not found...")
      window.setTimeout(() => {
        //  history.push("/"+videoCallState.channel_id+"/video-chat");

      }, 5000)
  });
}