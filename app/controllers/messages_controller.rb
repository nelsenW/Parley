class MessagesController < ApplicationController

    def create 
        if @message.save
            ServersChannel.broadcast_to @message.room, 
            from_template('api/messages/show', message: @message)
        end
    end 
end
