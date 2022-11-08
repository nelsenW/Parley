class Api::MessagesController < ApplicationController

    def create 
      debugger
      @message = Message.new(message_params)
      if @message.save
        ChannelsChannel.broadcast_to @message.channel,
          type: 'RECEIVE_MESSAGE',
          **from_template('api/messages/show', message: @message)
      
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
      @message = Message.find(params[:id])
      @message.destroy
      ChannelsChannel.broadcast_to @message.channel,
        type: 'DESTROY_MESSAGE',
        id: @message.id
      render json: nil, status: :ok
    end

      private

      def message_params
        params.require(:message).permit(:text, :user_id, :channel_id)
      end 
end
