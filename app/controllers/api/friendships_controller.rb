class Api::FriendshipsController < ApplicationController

    def create 
        @friendship = Friendship.new(friend_params)
        if @friendship.save
            render :show
        else
            render json: {errors: @friendship.errors.full_messages, status: 422}
        end 
    end 

    def index
        @friendships = Friendship.all 
        render json: {friendships: @friendships}
    end

    def destroy 
        Friendship.destroy_by(id: params[:id])
    end 

    private

    def friend_params
        params.require(:friend).permit(:user_id, :friend_id)
    end
end