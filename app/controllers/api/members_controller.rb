class Api::MembersController < ApplicationController

    def create 
        @membership = Member.new(member_params)
        if @membership.save
            ServersChannel.broadcast_to @membership.server,
                type: 'RECEIVE_USER',
                user: @membership.user
      
            render json: nil, status: :ok
        else
            render json: @membership.errors.full_messages, status: 422
        end 
    end 

    def destroy 

    end 

    private 

    def member_params 
        params.require(:member).permit(:user_id, :server_id)
    end 
end
