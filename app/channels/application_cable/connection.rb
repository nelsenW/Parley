module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user, :servers, :channels, :frienships

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

    def frienships
      @frienships ||= []
    end 

  end
end