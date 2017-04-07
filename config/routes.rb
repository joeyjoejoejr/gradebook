Rails.application.routes.draw do
  namespace :api do
    resources :courses, except: [:show, :edit]
    resources :students, only: [:index]
  end

  root to: 'pages#index'
end
