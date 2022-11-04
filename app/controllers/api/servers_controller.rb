class Api::ServersController < ApplicationController

    def create 
        @server = Server.new(server_params)
        if @server.save
            render json: {server: @server}
        else  
            render json: {errors: @server.errors.full_messages, status: 422}
        end 
    end 

    def show
        @server = Server.find_by(id: params[:id])
    end

    def index
        if params[:user_id]
            user = User.find_by_id(params[:user_id])
            @servers = user.servers
        else
            @servers = Server.all
        end
            render json: {servers: @servers}
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
