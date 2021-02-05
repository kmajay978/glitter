"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinChannel = joinChannel;
exports.joinChannelAudio = joinChannelAudio;
exports.leaveEventHost = leaveEventHost;
exports.leaveEventAudience = leaveEventAudience;

var _agoraRtcSdk = _interopRequireDefault(require("agora-rtc-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rtc = {
  client: null,
  joined: false,
  published: false,
  localStream: null,
  remoteStreams: [],
  params: {}
}; // Options for joining a channel
// let url = new URL(window.location.href)
// let params = new URLSearchParams(url.search);

function joinChannel(role, option) {
  // Create a client
  rtc.client = _agoraRtcSdk["default"].createClient({
    mode: "live",
    codec: "h264"
  }); // Initialize the client

  rtc.client.init(option.appID, function () {
    console.log("init success"); // Join a channel

    rtc.client.join(option.token ? option.token : null, option.channel, option.uid ? +option.uid : null, function (uid) {
      console.log("join channel: " + option.channel + " success, uid: " + uid);
      rtc.params.uid = uid;

      if (role === "host") {
        rtc.client.setClientRole("host"); // Create a local stream

        console.log(rtc.params.uid, "host id");
        rtc.localStream = _agoraRtcSdk["default"].createStream({
          streamID: rtc.params.uid,
          audio: true,
          video: true,
          screen: false
        });
        rtc.localStream.setVideoProfile("4K_3"); // Initialize the local stream

        rtc.localStream.init(function () {
          console.log("init local stream success");
          rtc.localStream.play("local_stream");
          rtc.client.publish(rtc.localStream, function (err) {
            console.log("publish failed");
            console.error(err);
          });
        }, function (err) {
          console.error("init local stream failed ", err);
        });
        rtc.client.on("connection-state-change", function (evt) {
          console.log("audience", evt);
        });
      }

      if (role === "audience") {
        rtc.client.on("connection-state-change", function (evt) {
          console.log("audience", evt);
        });
        rtc.client.on("stream-added", function (evt) {
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          console.log(id, rtc.params.uid, "uidddd");

          if (id !== rtc.params.uid) {
            // alert("stream added")
            // removeView(id)
            rtc.client.subscribe(remoteStream, function (err) {
              console.log("stream subscribe failed", err);
            });
          }

          console.log('stream-added remote-uid: ', id);
        });
        rtc.client.on("stream-removed", function (evt) {
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          console.log('stream-removed remote-uid: ', id);
        });
        rtc.client.on("stream-subscribed", function (evt) {
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          remoteStream.play("remote_video_");
          console.log('stream-subscribed remote-uid: ', id);
        });
        rtc.client.on("stream-unsubscribed", function (evt) {
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          remoteStream.pause("remote_video_");
          console.log('stream-unsubscribed remote-uid: ', id);
        });
      }
    }, function (err) {
      console.error("client join failed", err);
    });
  }, function (err) {
    console.error(err);
  });
}

function joinChannelAudio(role, option) {
  alert("Channel Join audio"); // Create a client

  rtc.client = _agoraRtcSdk["default"].createClient({
    mode: "live",
    codec: "h264"
  }); // Initialize the client

  rtc.client.init(option.appID, function () {
    console.log("init success"); // Join a channel

    rtc.client.join(option.token ? option.token : null, option.channel, option.uid ? +option.uid : null, function (uid) {
      console.log("join channel: " + option.channel + " success, uid: " + uid);
      rtc.params.uid = uid;

      if (role === "host") {
        rtc.client.setClientRole("host"); // Create a local stream

        console.log(rtc.params.uid, "host id");
        rtc.localStream = _agoraRtcSdk["default"].createStream({
          streamID: rtc.params.uid,
          audio: true,
          video: false,
          screen: false
        });
        rtc.localStream.setVideoProfile("4K_3"); // Initialize the local stream

        rtc.localStream.init(function () {
          console.log("init local stream success");
          rtc.localStream.play("local_stream");
          rtc.client.publish(rtc.localStream, function (err) {
            console.log("publish failed");
            console.error(err);
          });
        }, function (err) {
          console.error("init local stream failed ", err);
        });
        rtc.client.on("connection-state-change", function (evt) {
          console.log("audience", evt);
        });
      }

      if (role === "audience") {
        rtc.client.on("connection-state-change", function (evt) {
          console.log("audience", evt);
        });
        rtc.client.on("stream-added", function (evt) {
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          console.log(id, rtc.params.uid, "uidddd");

          if (id !== rtc.params.uid) {
            // alert("stream added")
            // removeView(id)
            rtc.client.subscribe(remoteStream, function (err) {
              console.log("stream subscribe failed", err);
            });
          }

          console.log('stream-added remote-uid: ', id);
        });
        rtc.client.on("stream-removed", function (evt) {
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          console.log('stream-removed remote-uid: ', id);
        });
        rtc.client.on("stream-subscribed", function (evt) {
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          remoteStream.play("remote_video_");
          console.log('stream-subscribed remote-uid: ', id);
        });
        rtc.client.on("stream-unsubscribed", function (evt) {
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          remoteStream.pause("remote_video_");
          console.log('stream-unsubscribed remote-uid: ', id);
        });
      }
    }, function (err) {
      console.error("client join failed", err);
    });
  }, function (err) {
    console.error(err);
  });
}

function leaveEventHost(params) {
  rtc.client.unpublish(rtc.localStream, function (err) {
    console.log("publish failed");
    console.error(err);
  });
  rtc.client.leave(function (ev) {
    console.log(ev);
  });
}

function leaveEventAudience(params) {
  rtc.client.leave(function () {
    console.log("client leaves channel"); //……
  }, function (err) {
    console.log("client leave failed ", err); //error handling
  });
}