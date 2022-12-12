
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

 - Logged in users that are subscribed to a specific room will receive live updates of the changes that occur in it without having to refresh the page
 - Users can also see in real time if a channel was edited or deleted, and if a new direct message conversation directed to them by another user was created 

https://user-images.githubusercontent.com/56778101/206611124-3c90f20d-9403-42ed-9bb8-9d3e285465fb.mp4

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
 - Users can send emojis in their messages, thanks to the React Emoji Picker package

### Servers:

 - Users can create servers
 - Users can choose which server to work on
 - Users can invite other users to their servers and join other servers
 - Users can switch between the servers that they're members of

### Channels:

 - Only the owner of the workspace can create channels to have group conversations with other users from same workspace
 - Users can edit their owned channels
 - Users can delete their owned channels

### Direct Messages: 

 - Users can create new conversations with selected members from same workspace and chat with them

### Search:

 - When creating a new message, users can search to which user, channel, or existing conversation they want to send it
 - Users can search for users that are not members of the workspace they're currently signed in, and add them to it

---

## Code Snippets

1. 
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
    } else {
      const formData = new FormData();
      if (messageFile){
        formData.append('dm[photo]', messageFile)
      }
      formData.append('dm[friendship_id]', friendship.id)
      formData.append('dm[user_id]', userId)
      formData.append('dm[text]', text)
      dispatch(createDM(formData));
    }
    setText("");
    setMessageUrl("");
    setMessageFile("");
  };

  const handleFile = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setMessageFile(file);
        setMessageUrl(fileReader.result);
      };
    }
  };


```

2.  


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

## Features for the Future

 - Video calls feature and channels wtih video calls
 - Server roles
 - Smaller p


