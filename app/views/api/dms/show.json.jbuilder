
json.dm do
    json.partial! 'api/dms/dm', dm: dm
    if dm.photo.url
      json.photo dm.photo.url
    end   
  end
  
json.user do 
    json.partial! 'api/users/user', user: dm.user
end
  
