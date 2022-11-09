import { useEffect, useRef, useState } from "react"
import consumer from "../../consumer"

export default function VideoCall() {
	const [ stream, setStream ] = useState()
	const myVideo = useRef()



    // const createSubscription = () => {
    //         consumer.subscriptions.create(
    //             { channel: 'VideosChannel', id: 1},
    //             { received: (data) => {}}
    //         );
    //     };

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			myVideo.current.srcObject = stream
		})

        // createSubscription();

	}, [])


	return (
		<>
		<div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
			</div>
		</div>
		</>
	)
}
