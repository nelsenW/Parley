json.server do
    json.extract! @server, :id, :name
    json.iconUrl @server.icon.url
end

@server.messages.each do |message|
    json.messages do
        json.set! message.id do
            json.partial! 'api/messages/message', message: message
        end
    end

    json.users do
        json.set! message.user.id do
            json.partial! 'api/users/user', user: message.user
        end
    end
end 


@server.users.each do |user|
    json.users do 
        json.set! user.id do
            json.partial! 'api/users/user', user: user 
        end 
    end 
end