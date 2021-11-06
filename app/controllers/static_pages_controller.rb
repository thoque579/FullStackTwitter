class StaticPagesController < ApplicationController
  def signup
    render 'signup'
  end

  def feeds
    token = cookies.signed[:twitter_session_token]
    session = Session.find_by(token: token)
    @current_user = session.user.username
    render 'feeds'
  end

end
