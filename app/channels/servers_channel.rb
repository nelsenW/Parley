class ServersChannel < ApplicationCable::Channel
   
  def self.online_users(server)
        ActionCable.server.connections.filter_map do |conn|     
          conn.servers.include?(server) && conn.current_user
      end.uniq
  end

  def subscribed
      @server = Server.find_by(id: params[:id])
      servers << @server
      stream_for @server
  
      photo = {photo: current_user.photo.url}
      self.class.broadcast_to @server, 
        type: 'RECEIVE_USER',
        user: current_user.slice(:id, :username, :color).merge(photo)
    end

    def unsubscribed
        servers.delete(@server)
        self.class.broadcast_to @server, 
          type: 'REMOVE_USER',
          id: current_user.id
    end

    

  end