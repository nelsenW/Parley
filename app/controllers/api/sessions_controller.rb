class Api::SessionsController < ApplicationController

  def show
    if current_user
      @user = current_user
      render 'api/users/show'
    else
      render json: {user: nil}
    end
  end

  def create
    @user = User.find_by_credentials( params[:credential], params[:password])
    if @user.nil?
      render json: { errors: ['The provided credential were invalid.'], status: :unauthorized}
    else
      login!(@user)
      render 'api/users/show'
    end
  end

  def destroy
    logout!
    render json: { message: 'success' }
  end
end
