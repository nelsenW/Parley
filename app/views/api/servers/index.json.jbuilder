@servers.each do |server|
    json.set! server.id do 
        json.extract! server, :id, :name, :icon
        json.iconUrl url_for(server.icon)
    end 
end
debugger

