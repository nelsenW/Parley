class UsersChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'user_channel'
    end
  
    def unsubscribed; end
  end