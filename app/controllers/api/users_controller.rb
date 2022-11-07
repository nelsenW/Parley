class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  def create()
    @user = User.new(user_params, color: SecureRandom.hex(3))
    if @user.save
      login!(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages, status: :unprocessable_entity}
    end
  end

  def user_params
    params.require(:user).permit(:email, :username, :password, :birthday)
  end
end
