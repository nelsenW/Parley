import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import consumer from "../../consumer"
import { createCall, destroyCall } from "../../store/videos"
import './videoCallModal.css'


export default function VideoCall(setVideoCall, setChannel, channel) {
	const [ stream, setStream ] = useState()
	const myVideo = useRef()
	const dispatch = useDispatch()
	const streams = useSelector(state => state.videos ? Object.values(state.videos) : [])


    const enterCall = () => {
            consumer.subscriptions.create(
                { channel: 'ChannelsChannel', id: channel.id},
				{
                received: ({ type, stream, id }) => {
					switch (type) {
						case 'RECEIVE_VIDEO':
							dispatch(createCall(stream));
							break;
						case 'REMOVE_VIDEO':
							dispatch(destroyCall(id));
							break;
						default:
							console.log('Unhandled broadcast: ', type);
							break;
					}
				}
				}
            );
        };
		
	

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			myVideo.current.srcObject = stream
		})
		
		enterCall()
		dispatch(createCall(stream))

        return (
			function stopBothVideoAndAudio(stream) {
				stream.getTracks().forEach(function(track) {
					if (track.readyState === 'live') {
						track.stop();
					}
				});
			}
		)
	}, [])


	return (
		<>
		<div className="container">
			<div className="video-container">
				<div className="video">
					{streams?.map(stream => <video ref={stream} playsInline muted autoPlay style={{width: '300px'}}/>)}
				</div>
			</div>
		</div>
		</>
	)
}
