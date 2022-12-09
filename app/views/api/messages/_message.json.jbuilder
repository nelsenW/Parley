json.extract! message, 
    :id, 
    :text, 
    :user_id, 
    :channel_id, 
    :created_at
if message.photo.url
    json.messagePhoto message.photo.url
end 
