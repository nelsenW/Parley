class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  def create()

    @user = User.new(user_params.merge({color: SecureRandom.hex(3)}))
    if @user.save
      login!(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages, status: :unprocessable_entity}
    end
  end

  def index
    @users = User.all
  end

  def update()
    @user = User.find_by(id: params[:id])
    @user.color = params[:user][:color]
    @user.description = params[:user][:desc]
    if params[:user][:photo]
      file = File.open(params[:user][:photo])
      @user.photo.purge_later
      @user.photo.attach(io: file, filename: "#{@user.id}_photo")
    end
    if @user.save
        render :show
      else 
        render json: {errors: user.errors.full_messages, status: 422}
      end 
  end 

  def user_params
    params.require(:user).permit(:email, :username, :password, :birthday, :color, :photo)
  end
end
