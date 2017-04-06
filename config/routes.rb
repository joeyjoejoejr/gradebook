Rails.application.routes.draw do
  namespace :api do
    resources :courses, only: [:index, :create, :update, :destroy]
  end

  root to: 'pages#index'
end
