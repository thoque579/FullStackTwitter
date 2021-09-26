module Api
  class TweetsController < ApplicationController
    def index
      @tweets = Tweet.all
      render 'api/tweets/index'
     end

     def create
       @tweets = Tweet.create(tweet_params)

       if @task.save
         render 'api/tweets/create'
       end
     end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      user = session.user
      tweet = Tweet.find_by(id: params: [:id])

      if tweet and tweet.user === user and tweet.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end

    def index_by_user
      user = User.find_by(username: params[:username])

        if user
          @tweets = user.tweets
          render 'api/tweets/index'
        end
    end


  private
    def tweet_params
      params.require(:tweets).permit(:message, :image)
    end
end
