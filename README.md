
# Slick

[Live Site](https://slick-x3v8.onrender.com)

Slick, a clone of the popular messaging app Slack, allows users from a workspace to live chat with each other through direct messages or through channels, and organizes these conversations.

---

## Technologies Used

 - JavaScript
 - React
 - Redux
 - Ruby On Rails
 - PostgreSQL, ActionCable (for WebSockets)
 - HTML5
 - SCSS

Slick's core application is built around the WebSocket Communication Protocol to provide to users live updates without refreshing the page. The back end is built using Ruby on Rails and the database using PostgreSQL. The front end is built using React.js, Redux for the global state management of the application, HTML5, and SCSS.

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

### Workspaces:

 - Users can create workspaces
 - Users can choose which workspace to work on
 - Users can invite other users to their workspaces and join other workspaces
 - Users can switch between the workspaces that they're members of

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

1. When a message is created, the ```RECEIVE_MESSAGE``` action gets triggered and any user currently subscribed to that slice of state, will receive updates of it whenever it changes. This logic makes sure that when a message gets created in a specific room (channel or direct message conversation) of a workspace, only users that have that conversation open get their 'messages' slice of state updated.

```javascript
// frontend/src/store/messages.js line 87

export default function messageReducer(state = {}, action) {
  switch (action.type) { 
  ....  
  case RECEIVE_MESSAGE:
    let checker = state[Object.keys(state)[0]];
    if (checker) {
      if (
        checker.messageableId === action.message.messageableId &&
        checker.messageableType === action.message.messageableType
      ) {
        return { ...state, [action.message.id]: action.message };
      }
    } else {
      return state;
    }
    break;      
   ...
  }
}

```

2. This logic deals with the addition of new members of a workspace. The update controller action of the ```workspaces_controller.rb``` can receive new users through the request params. After checking that those users don't already belong to that workspace, subscriptions are created so that the new users become memmbers of the workspace, and of the channels that that workspace has. Because the param that contains the new users comes as JSON, the method makes use of ```ActiveSupport::JSON.decode()``` to turn it into Ruby syntax.

```ruby
# app/api/workspaces_controller.rb line 31

def update 
  @workspace = Workspace.find_by_id(params[:id]) 
  @users = ActiveSupport::JSON.decode(params[:new_users])

  if @users.length > 0
    @user_ids = @users.map {|user| user["id"]} 
    @channels = @workspace.channels

    @user_ids.each do |id|
      WorkspaceSubscription.create(user_id: id, workspace_id: @workspace.id)
      @channels.each do |channel|
        ChannelSubscription.create(user_id: id, channel_id: channel.id)
      end
    end
  end

  if @workspace.update(workspace_params)
    WorkspacesChannel.broadcast_to @workspace,
      type: 'EDIT_WORKSPACE',
      **from_template('api/workspaces/show', workspace: @workspace)

    render json: nil, status: :ok
  else
    render json: {errors: @workspace.errors.full_messages}, status: 422
  end
end 

```

## Features for the Future

 - User profiles and profile image upload
 - Remove users from workspace


