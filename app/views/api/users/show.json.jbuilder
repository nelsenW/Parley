json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at
    if @user.photo.url
        json.photo @user.photo.url
    end 
    if @user.color
        json.color @user.color
    end
end

