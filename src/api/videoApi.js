import axios from "axios";
import { TOKEN_AGORA_API, VIDEO_CALL_START } from "../components/Api";
import { videoCall, liveVideoCall, audioCall } from "../features/userSlice";
import moment from "moment";

export const generateVideoChatToken = (history, dispatch, bodyParameters, startVideoChatInitParams) => {
      axios.post(TOKEN_AGORA_API,bodyParameters)
      .then((response) => { 
        if (response.status === 200) {
            let nowDate = moment().format();
            nowDate = nowDate.replace("T", " ").replace("+", " ");
            nowDate = nowDate.split(" ");
            nowDate = nowDate[0] + " " + nowDate[1];

            let newState = {};
            newState.user_from_id =  startVideoChatInitParams.user_from_id;
            newState.user_to_id =  startVideoChatInitParams.user_to_id;
            newState.channel_id = startVideoChatInitParams.channel_id;
            newState.user_to_image = startVideoChatInitParams.user_to_image;
            newState.channel_name = response.data.data.chanelName;
            newState.channel_token = response.data.data.token;
            newState.call_created_date = nowDate;
            dispatch(videoCall(newState))
            startVideoChatInit(history, dispatch, newState)
        }
        else {
         alert(response.data.message)
        }
   }, (error) => {
      alert(error.message)
  });
}

export const generateAudioChatToken = (history, dispatch, bodyParameters, startVideoChatInitParams) => {
    console.log("audioScreen....");
    axios.post(TOKEN_AGORA_API,bodyParameters)
    .then((response) => { 
      if (response.status === 200) {
          let nowDate = moment().format();
          nowDate = nowDate.replace("T", " ").replace("+", " ");
          nowDate = nowDate.split(" ");
          nowDate = nowDate[0] + " " + nowDate[1];

          let newState = {};
          newState.user_from_id =  startVideoChatInitParams.user_from_id;
          newState.user_to_id =  startVideoChatInitParams.user_to_id;
          newState.channel_id = startVideoChatInitParams.channel_id;
          newState.user_to_image = startVideoChatInitParams.user_to_image;
          newState.channel_name = response.data.data.chanelName;
          newState.channel_token = response.data.data.token;
          newState.type = "audio";
          newState.call_created_date = nowDate;
          dispatch(audioCall(newState))
          startAudioChatInit(history, dispatch, newState)
      }
      else {
       alert(response.data.message)
      }
 }, (error) => {
    alert(error.message)
});
}


export const generateLiveVideoChatToken = (dispatch, bodyParameters, call_type, user_id, channel_id, SOCKET) => {
    axios.post(TOKEN_AGORA_API,bodyParameters)
        .then((response) => {
            if (response.status === 200) {
                let newState = {};
                newState.host_id = user_id;
                newState.user_id = user_id;
                newState.call_type = call_type;
                newState.channel_id = channel_id;
                newState.channel_name = response.data.data.chanelName;
                newState.channel_token = response.data.data.token;

                localStorage.setItem("liveVideoProps", JSON.stringify(newState))

                dispatch(liveVideoCall(newState));
                SOCKET.emit("start_live_video_call", newState)
            }
            else {
                alert(response.data.message)
            }
        }, (error) => {
            alert(error.message)
        });
}
export const startVideoChatInit = (history, dispatch, bodyParameters) => {
      axios.post(VIDEO_CALL_START,bodyParameters)
      .then((response) => {
        if (response.status === 200) {
            window.setTimeout(() => {
                history.push("/false/" + bodyParameters.user_from_id + "/" + bodyParameters.user_to_id + "/" + bodyParameters.channel_id + "/" + bodyParameters.channel_name + "/video-chat");
            }, 5000)
        }
        else {
         alert("something went wrong...")
        }
   }, (error) => {
     alert(error.message)
  });
}

export const startAudioChatInit = (history, dispatch, bodyParameters) => {
    axios.post(VIDEO_CALL_START,bodyParameters)
    .then((response) => {
      if (response.status === 200) {
          window.setTimeout(() => {
              history.push("/false/" + bodyParameters.user_from_id + "/" + bodyParameters.user_to_id + "/" + bodyParameters.channel_id + "/" + bodyParameters.channel_name + "/audio-chat");
          }, 5000)
      }
      else {
       alert("something went wrong...")
      }
 }, (error) => {
   alert(error.message)
});
}