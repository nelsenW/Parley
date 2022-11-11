class FriendshipsChannel < ApplicationCable::Channel
   attr_accessor :friendship
   
    def subscribed
      @friendship = Friendship.find_by(id: params[:id])
      friendships << @friendship
      stream_for @friendship
      
      self.class.broadcast_to @friendship,
        type: 'RECEIVE_USER',
        user: current_user.slice(:id, :username, :color)
    end
  
    def unsubscribed
        friendships.delete(@friendship)
        self.class.broadcast_to @friendship, 
          type: 'REMOVE_USER',
          id: current_user.id
    end
end

