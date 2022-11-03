class Api::MessagesController < ApplicationController

    def create 
      @message = Message.new(message_params)
        if @message.save
            ActionCable.server.broadcast('message_channel', **from_template('api/messages/show', message: @message))
        end
    end 

    def index
      @messages = Message.all
      render json: {messages: @messages}
    end 

    def destroy
        # ...
        RoomsChannel.broadcast_to @message.room,
          type: 'DESTROY_MESSAGE',
          id: @message.id
        # ...
      end

      private

      def message_params
        params.require(:message).permit(:text)
      end 
end
