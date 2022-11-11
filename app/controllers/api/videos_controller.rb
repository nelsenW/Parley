class Api::VideosController < ApplicationController

    def create
        ChannelsChannel.broadcast_to params.channel
            type: 'RECEIVE_VIDEO',
            stream: params.stream
    end

    def destroy 
        ChannelsChannel.broadcast_to params.channel
            type: 'REMOVE_VIDEO',
            id: params.id
    end 

end
