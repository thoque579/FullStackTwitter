json.tweets do
  json.array! @tweets do |tweets|
    json.id tweet.id
    json.username tweet.user.username
    json.message tweet.message
  end
end
