@users.each do |user|
    json.set! user.username do 
        json.extract! user, :id, :username, :color
        if user.photo.url
            json.photo user.photo.url
        end         
    end 
end