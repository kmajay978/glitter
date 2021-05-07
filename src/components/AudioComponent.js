import AgoraRTC from "agora-rtc-sdk";
var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
};
// Options for joining a channel
// let url = new URL(window.location.href)
// let params = new URLSearchParams(url.search);

export function joinChannel(role, option) {
    // Create a client
    rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
    // Initialize the client
    rtc.client.init(option.appID, function () {
        // Join a channel
        rtc.client.join(option.token ?
            option.token : null,
            option.channel, option.uid ? +option.uid : null, function (uid) {

                rtc.params.uid = uid;
                if (role === "host") {
                    rtc.client.setClientRole("host");
                    // Create a local stream
                    rtc.localStream = AgoraRTC.createStream({
                        streamID: rtc.params.uid,
                        audio: true,
                        video: true,
                        screen: false,
                    })
                    // Initialize the local stream
                    rtc.localStream.init(function () {
                        rtc.localStream.play("local_stream");
                        rtc.client.publish(rtc.localStream, function (err) {
                            console.error(err);
                        })
                    }, function (err) {
                        console.error("init local stream failed ", err);
                    });
                    rtc.client.on("connection-state-change", function (evt) {
                    })
                }
                if (role === "audience") {
                    rtc.client.on("connection-state-change", function (evt) {
                    })
                    rtc.client.on("stream-added", function (evt) {

                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                        if (id !== rtc.params.uid) {
                            // removeView(id)
                            rtc.client.subscribe(remoteStream, function (err) {
                            })
                        }
                    });
                    rtc.client.on("stream-removed", function (evt) {
                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                    });
                    rtc.client.on("stream-subscribed", function (evt) {
                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                        remoteStream.play("remote_video_");
                    })
                    rtc.client.on("stream-unsubscribed", function (evt) {
                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                        remoteStream.pause("remote_video_");
                    })
                }
            }, function (err) {
                console.error("client join failed", err)
            })
    }, (err) => {
        console.error(err);
    });
}
export function leaveEventHost(params) {
    rtc.client.unpublish(rtc.localStream, function (err) {
        console.error(err);
    })
    rtc.client.leave(function (ev) {
    })
}
export function leaveEventAudience(params) {
    rtc.client.leave(function () {
        //……
    }, function (err) {
        //error handling
    })
}
