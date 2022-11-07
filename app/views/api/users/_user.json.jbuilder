json.extract! user, :id, :username
if user.photo.url
    json.extract! user, :photo.url
end 
if user.color
    json.extract! user, :color
end
