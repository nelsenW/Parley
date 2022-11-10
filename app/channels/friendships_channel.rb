class FriendshipsChannel < ApplicationCable::Channel
   attr_accessor :frienship

    def subscribed
      @frienship = Frienship.find_by(id: params[:id])
      frienships << @frienship
      stream_for @frienship
      
      self.class.broadcast_to @frienship,
        type: 'RECEIVE_USER',
        user: current_user.slice(:id, :username, :color)
    end
  
    def unsubscribed
        frienships.delete(@frienship)
        self.class.broadcast_to @frienship, 
          type: 'REMOVE_USER',
          id: current_user.id
    end
end

