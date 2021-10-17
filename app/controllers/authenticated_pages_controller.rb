class AuthenticatedPagesController < ApplicationController
  def homeAuthenticated
    render 'authenticated_home'
  end

end
