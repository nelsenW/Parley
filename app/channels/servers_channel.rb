class ServersChannel < ApplicationCable::Channel
    attr_accessor :server 
  
  def subscribed
      @server = Server.find_by(id: params[:id])
      servers << @server
      stream_for @server

      self.class.broadcast_to @server, 
        type: 'RECEIVE_USER',
        user: current_user.slice(:id, :username)
    end

    def unsubscribed
        servers.delete(@server)
        self.class.broadcast_to @room, 
          type: 'REMOVE_USER',
          id: current_user.id
    end

    def self.online_users(room)
        ActionCable.server.connections.filter_map do |conn| 
          conn.rooms.include?(room) && conn.current_user
        end.uniq
    end

  end