class Api::DmsController < ApplicationController

    def create
        @dm = Dm.new(dm_params)
        debugger
        if @dm.save
            FriendshipsChannel.broadcast_to @dm.friendship,
                type: 'RECEIVE_DM',
                **from_template('api/dms/show', dm: @dm)

            render json: nil, status: :ok
        else
            render json: @dm.errors.full_messages, status: 422
        end 
    end 

    def destroy
        @dm = Dm.find(params[:id])
        @dm.destroy
        FriendshipsChannel.broadcast_to @dm.friendship,
            type: 'DESTROY_DM',
            id: @dm.id
        render json: nil, status: :ok
    end

    private 

    def dm_params 
        params.require(:dm).permit(:text, :user_id, :friendship_id)
    end 

end
