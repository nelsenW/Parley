json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at
    if @user.photo.url
        json.extract! @user, :photo.url
    end 
    if @user.color
        json.extract! @user, :color
    end
end

