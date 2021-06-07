import React, {useEffect, useRef} from "react";

import io from "socket.io-client";
import Peer from "peerjs";

import "../styles/App.css";

const roomId = window.location.pathname.split("/")[1];
const peer = new Peer();
const socket = io("http://localhost:5000");
const peers = {};

const Meet = () => {
    const refVideoGrid = useRef(null);
    let videoGrid = null;

    useEffect(() => {
        videoGrid = refVideoGrid.current;

        peer.on("open", id => {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then(stream => {
                const video = document.createElement("video");
                video.muted = true;

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

                socket.on("user-disconnected", userId => {
                    console.log("user disconnected", userId);
                    console.log(peers);
                    if (peers[userId]) peers[userId].close();
                });
            });
        });
    }, []);

    const connectToNewUser = (userId, stream) => {
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

    const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            video.play();
        });
        videoGrid.append(video);
    }

    return (
        <div id="video-grid" ref={refVideoGrid}>

        </div>
    );
};

export default Meet;