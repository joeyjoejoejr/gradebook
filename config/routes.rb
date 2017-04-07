Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  namespace :api do
    resources :courses, except: [:show, :edit]
    resources :students, only: [:index]
  end

  root to: 'pages#index'
end
