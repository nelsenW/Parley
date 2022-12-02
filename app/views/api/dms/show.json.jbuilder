
json.dm do
    json.partial! 'api/dms/dm', dm: dm
  end
  
json.user do 
    json.partial! 'api/users/user', user: dm.user
end
  
