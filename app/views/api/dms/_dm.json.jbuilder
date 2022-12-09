json.extract! dm, 
    :id, 
    :text, 
    :friendship_id,
    :user_id,
    :created_at
if dm.photo.url
    json.messagePhoto dm.photo.url
end   