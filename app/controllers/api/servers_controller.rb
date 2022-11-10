class Api::ServersController < ApplicationController

    def create 
        @server = Server.new(server_params)
        if @server.save 
            @member = Member.create!(user_id: @server.owner_id, server_id: @server.id)
            @channel = Channel.create!(name: 'General', server_id: @server.id, channel_type: 'text')
            render :show
        else  
            render json: {errors: @server.errors.full_messages, status: 422}
        end 
    end 

    def show
        @server = Server.find_by(id: params[:id])
        @online_users = ServersChannel.online_users(@server) << current_user
    end

    def index
        if params[:user_id]
            user = User.find_by_id(params[:user_id])
            @servers = user.servers
        else
            @servers = Server.all
        end
    end 

    def destroy
        Server.destroy_by(id: params[:id])
    end 
    
    def update
        @server = Server.find_by(id: params[:id])
        if @server.update(server_params)
            render json: {server: @server}
        else 
            render json: {errors: @server.errors.full_messages, status: 422}
        end 
    end 

    private

    def server_params
        params.require(:server).permit(:name, :owner_id, :icon)
    end 
end
