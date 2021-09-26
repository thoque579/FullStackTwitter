module Api
  class UsersController < ApplicationController
    def create
      @user = user.new(user_params)

      if @user.save
        render 'api/users/create'
      else
        render json: {
          success: false
        }
      end
    end


      private
      def user_params
        params.require(:user).permit(:username, :password, :email)
      end

  end
end
