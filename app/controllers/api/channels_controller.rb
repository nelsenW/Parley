class Api::ChannelsController < ApplicationController

    def create 
        @channel = Channel.new(channel_params)
        if @channel.save
            render :show
        else 
            render json: {errors: @server.errors.full_messages, status: 422}
        end
    end 

    def destroy 
        Channel.destroy_by(id: params[:id])
    end 

    def update
        @channel = Channel.find_by(id: params[:id])
        if @channel.update(channel_params)
            render :show
        else 
            render json: {errors: @channel.errors.full_messages, status: 422}
        end 
    end 

    def show
        @channel = Channel.find_by(id: params[:id])
    end 

    private 

    def channel_params 
        params.require(:channel).permit(:name, :server_id, :channel_type)
    end 
end
