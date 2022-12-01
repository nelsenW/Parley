
@friendships.each do |friend|
    json.set! friend.id do 
        json.extract! friend, :id
        json.user do  
            if (friend.user.id === current_user.id) 
                    json.partial! 'api/users/user', user: friend.other_user
            elsif (friend.other_user.id === current_user.id) 
                    json.partial! 'api/users/user', user: friend.user
            end
        end
    end 
end 
 