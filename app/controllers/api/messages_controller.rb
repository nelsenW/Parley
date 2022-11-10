class Api::MessagesController < ApplicationController

    def create 
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

    def update
      @message = Message.find_by(id: params[:id])
      if @message.update(message_params)
          render json: {message: @message}
      else 
          render json: {errors: @message.errors.full_messages, status: 422}
      end 
  end 
      private

      def message_params
        params.require(:message).permit(:text, :user_id, :channel_id)
      end 
end
