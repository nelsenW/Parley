class Api::FriendshipsController < ApplicationController

    def create 
        @friendship = Friendship.new(friend_params)
        if @friendship.save
            render :show
        else
            render json: {errors: @friendship.errors.full_messages, status: 422}
        end 
    end 

    def show 
        @friendship = Friendship.find_by_id(params[:id])
    end

    def index
        @friendships = Friendship.all 
    end

    def destroy 
        Friendship.destroy_by(id: params[:id])
    end 

    private

    def friend_params
        params.require(:friendship).permit(:user_id, :friend_id)
    end
end
