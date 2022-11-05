@servers.each do |server|
    json.set! server.id do 
        json.extract! server, :id, :name
        json.iconUrl server.icon.url
    end 
end


