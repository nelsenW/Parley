json.extract! user, :username
if user.photo.url
    json.photo user.photo.url
end 
if user.color
    json.color user.color
end