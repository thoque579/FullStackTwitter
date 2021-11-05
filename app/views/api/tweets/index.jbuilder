json.tweets do
  json.array! @tweets do |tweets|
    json.id tweets.id
    json.username tweets.user.username
    json.message tweets.message
    json.belongs_to_current_user tweets.user == @current_user
    if tweets.image.attached?
      json.image url_for(tweets.image)
    else
      json.image nil
    end
  end
end
