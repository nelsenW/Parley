json.message do
  json.partial! 'api/messages/message', message: message
  debugger
  if message.photo.url
    json.photo message.photo.url
  end   
end

json.user do 
  json.partial! 'api/users/user', user: message.user
end
