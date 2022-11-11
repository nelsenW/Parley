module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user, :servers, :channels, :friendships

    def current_user
      @current_user ||= User.find_by(
        session_token: request.session[:session_token]
      )
    end

    def servers
      @servers ||= []
    end

    def channels
      @channels ||= []
    end

    def friendships
      @friendships ||= []
    end 

  end
end