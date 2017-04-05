Rails.application.routes.draw do
  namespace :api do
    resources :courses, only: [:create]
  end

  root to: 'pages#index'
end
