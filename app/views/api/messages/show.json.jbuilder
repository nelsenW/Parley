json.message do
  json.partial! 'api/messages/message', message: message
end
  debugger
json.user do 
  json.partial! 'api/users/user', user: message.user
end
