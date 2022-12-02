json.friendship do
    json.extract! @friendship, :id, :user_id, :friend_id
end

@friendship.dms.each do |dm|
    json.dms do
        json.set! dm.id do
            json.partial! 'api/dms/dm', dm: dm
            json.partial! 'api/users/user', user: dm.user
        end 
    end

end 
