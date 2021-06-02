const roomId = window.location.pathname.split("/")[1];
const videoGrid = document.getElementById("video-grid");

const peer = new Peer();
const socket = io("/");

const video = document.createElement("video");
video.muted = true;
const peers = {};

peer.on("open", id => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        addVideoStream(video, stream);

        socket.emit("join-room", roomId, id);

        peer.on("call", call => {
            call.answer(stream);

            const video = document.createElement("video");
            call.on("stream", userVideoStream => {
                addVideoStream(video, userVideoStream);
            });

            call.on("close", () => {
                video.remove();
            });

            peers[call.peer] = call;
        });

        socket.on("user-joined", userId => {
            connectToNewUser(userId, stream);
        });
    });
});

socket.on("user-disconnected", userId => {
    console.log("user disconnected", userId);
    console.log(peers);
    if (peers[userId]) peers[userId].close();
});

function connectToNewUser(userId, stream) {
    const call = peer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
    call.on("close", () => {
        video.remove();
    });

    peers[userId] = call;
}

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    videoGrid.append(video);
}
