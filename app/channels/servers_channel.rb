class ServersChannel < ApplicationCable::Channel
    def subscribed
      @server = Server.find_by(id: params[:id])
      stream_for @server
    end

    def unsubscribed
        rooms.delete(@room)
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