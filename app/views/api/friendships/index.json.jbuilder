@friendships.each do |friend|
    if (friend.user.id === current_user.id) 
        json.set! friend.id do
            json.partial! 'api/users/user', user: friend.other_user
        end
    elsif (friend.other_user.id === current_user.id) 
        json.set! friend.id do
            json.partial! 'api/users/user', user: friend.user
        end
    end
end 
 