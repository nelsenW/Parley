
# Parley

[Live Site](https://parley.onrender.com)

Parley, a clone of the popular messaging app Discord, allows users to create servers and channels and even message people directly through dms.

---

## Technologies Used

 - JavaScript
 - React
 - Redux
 - Ruby On Rails
 - PostgreSQL, ActionCable 
 - HTML5
 - CSS3

Parley's core application is built around the WebSocket Communication Protocol to provide to users live updates without refreshing the page. The back end is built using Ruby on Rails and the database using PostgreSQL. The front end is built using React.js, Redux for the global state management of the application, HTML5, and CSS3.

---

## Features

### Live Chat with WebSocket Communication Protocol

 - Logged in users that are subscribed to a specific channel will receive live updates of the changes that occur in it without having to refresh the page
 - Users can also see in real time if a channel was edited or deleted, and if a new direct message conversation directed to them by another user was created 

### User Authentication: 

- Users can create an account and login/logout with their credentials.
- Users can choose to login with a Demo User account, which will provide them with access to all of the application’s features.
- Users cannot use the application without first logging in.
- User authentication uses Rails’ session object to store in the database a session token to authenticate users after logging in.

### Messages:

 - Users can communicate with other users in real time through messages
 - Users can create messages
 - Users can edit their messages
 - Users can delete their messages
 - Users can send pictures in their messages as well using FileReader and AWS

### Servers:

 - Users can create servers
 - Users can explore different servers to join
 - Users can switch between the servers that they're members of

### Channels:

 - Users can create channels to have group conversations with other users from same server
 - Users can delete their owned channels

### Direct Messages: 

 - Users can create new conversations with friends and chat with them
 - DMs oppertae in the same sense Messages do

### Friends:

- Users can add new friends 
- Users can send DM's to their friends

---

## Code Snippets

1.  The starting handleSubmit function for the lifecycle of a message. After writing your message in the form formData is created so that the backend can have access to attached photos and text simultaneously. After this a fetch request is dispatched using the function createMessage.

```javascript
// frontend/src/components/Messages/messageForm.jsx line 15
 const handleSubmit = (e) => {
    e.preventDefault();
    if (channel) {
      const formData = new FormData();
      if (messageFile){
        formData.append('message[photo]', messageFile)
      }
      formData.append('message[channelId]', channel.id)
      formData.append('message[userId]', userId)
      formData.append('message[text]', text)
      dispatch(
        createMessage(formData)
      );
    setText("");
    setMessageUrl("");
    setMessageFile("");
  };


```

2. Built off a boilerplate secure csrfFetch function a POST request is made to the /api/messages endpoint.

```javascript 
// /frontend/src/store/messages.js
export const createMessage = formData => async (dispatch) => {
  await csrfFetch('/api/messages', {
		method: 'POST',
		body: formData 
	})
    .then((res) => res.json())
		.then((newMessage) => dispatch(receiveMessage(newMessage)))
		.catch((err) => (err));
}

```

3.  Using the POST route from the frontend a message is created with the passed secure params nested in the formData. If the params include a photo it is first opened and then attached to the new message object using AWS. Then if the message is saved it is broadcasted to the specific channel related to said message.


```ruby
# app/controllers/api/messages_controller.rb


 def create 
      @message = Message.new(message_params)
      if params[:message][:photo]
        file = File.open(params[:message][:photo])
        @message.photo.attach(io: file, filename: "#{@message.id}_photo")
      end
      if @message.save
        ChannelsChannel.broadcast_to @message.channel,
          type: 'RECEIVE_MESSAGE',
          **from_template('api/messages/show', message: @message)
      
        render json: nil, status: :ok
      else
        render json: @message.errors.full_messages, status: 422
      end
    end 



```

4. Finally the message is received by the frontend component after being broadcast, where it is rendered in this specific component.

```javascript

	return (
		<div className='message'>
			<div style={{backgroundColor: `${color}`}}>
				{photo ? <img src={photo} style={{ backgroundColor: 'transparent' }} className='message-userIcon'/> : <i className='fa-solid fa-skull-crossbones message-userIcon' style={{backgroundColor: `${color}`}}></i>}
			</div>
			<span className='message-userName'>{username}</span>
			<span className='message-timestamp'>{formattedTime}</span>
			{modify && 
			<>
			<span className='message-timestamp mod' id='message-edit' onClick={() => {setEditMsg(true)}}>Edit</span>
			<span className='message-timestamp mod' id='message-delete' onClick={() => {
				dispatch(destroyMessage(id))
				}}>Delete</span>
			</>
			}
			<p className='message-text'>{text}</p>
			<img src={messagePhoto} className='message-photo'></img>
			{editMsg && <MessageForm editMessage = {{id, text}} channel={channel} setEditMsg={setEditMsg}/> }
		</div>
	);

```

## Features for the Future

 - Video calls feature and channels wtih video calls
 - Server roles
 - Smaller features like emojis!


