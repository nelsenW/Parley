class Api::MessagesController < ApplicationController

    def create 
      @message = Message.new(message_params)
      if @message.save
        ServersChannel.broadcast_to @message.server,
        from_template('api/messages/show', message: @message)
        
        render json: nil, status: :ok
      else
        render json: @message.errors.full_messages, status: 422
      end
    end 

    def index
      @messages = Message.all
      render json: {messages: @messages}
    end 

    def destroy
        # ...
        ServersChannel.broadcast_to @message.room,
          type: 'DESTROY_MESSAGE',
          id: @message.id
        # ...
      end

      private

      def message_params
        params.require(:message).permit(:text, :user_id, :server_id)
      end 
end
