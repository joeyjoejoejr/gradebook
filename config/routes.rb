Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  namespace :api do
    resources :courses, except: [:index, :show, :edit]
    resources :students, only: [:index]
    resources :users, only: [:index] do
      collection do
        get :dashboard
      end
    end
  end

  root to: 'pages#index'
end
