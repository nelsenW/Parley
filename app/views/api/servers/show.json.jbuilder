json.server do
    json.extract! @server, :id, :name
    json.iconUrl @server.icon.url
end

@server.channels.each do |channel|
    json.channels do
        json.set! channel.id do
            json.partial! 'api/channels/channel', channel: channel
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