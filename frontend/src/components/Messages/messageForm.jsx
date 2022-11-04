import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createMessage } from "../../store/messages";

export default function MessageForm(){
    const dispatch = useDispatch();
    const [text, setText] = useState('')
    const {serverId} = useParams();
    const userId = useSelector((state) => state.session.currentUser.id);


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createMessage({message: { text, userId, serverId }}))
            .then(() => setText(''));
    }

    return(
       <form onSubmit={handleSubmit} className='messageForm'>
        <div className="messageTextbox">
            <input
                className="messageInput"
                rows={text.split('\n').length}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                if (e.code === 'Enter' && !e.shiftKey) {
                    handleSubmit(e);
                }
                }}
                value={text}
            />
        </div>
          
        </form> 
    )
}