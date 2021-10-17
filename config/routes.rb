Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'static_pages#home'
  get 'signup' => 'static_pages#signup'
  get '/login' => 'static_pages#login'
  get '/feeds' => 'static_pages#feeds'
  get '/home' => 'static_pages#home'
  get '/authenHome' => 'authenticated_pages#authenticated_home';
  namespace :api do
    #user
    post '/users' => 'users#create'

    #sessions
    post '/sessions' => 'sessions#create'
    get '/authenticated' => 'sessions#authenticated'
    delete '/destroy' => 'sessions#destroy'

    #tweets
    post '/tweets' => 'tweets#create'
    delete '/tweets/:id' => 'tweets#destroy'
    get '/tweets' => 'tweets#index'
    get '/users/:username/tweets' => 'tweets#index_by_user'
  end
end
