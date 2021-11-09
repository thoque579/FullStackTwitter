class StaticPagesController < ApplicationController
  def signup
    render 'signup'
  end

  def feeds
    render 'feeds'
  end

  def profile
    render 'profile'
  end
end
