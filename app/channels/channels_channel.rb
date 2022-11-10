class ChannelsChannel < ApplicationCable::Channel
    attr_accessor :channel
  
    def subscribed
        @channel = Channel.find_by(id: params[:id])
        channels << @channel
        stream_for @channel

        self.class.broadcast_to @channel, 
            type: 'RECEIVE_USER',
            user: current_user.slice(:id, :username, :color)
    end

    def unsubscribed
        channels.delete(@channel)
        self.class.broadcast_to @channel, 
          type: 'REMOVE_USER',
          id: current_user.id
    end

end