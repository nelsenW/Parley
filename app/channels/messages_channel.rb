class MessagesChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'message_channel'
    end

    def unsubscribed
      
    end
  end