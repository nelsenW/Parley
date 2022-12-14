Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  mount ActionCable.server => '/cable'

  post '/api/test', to: 'application#test'
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :destroy, :update, :index]
    resources :servers, only: [:show, :index, :destroy, :update, :create]
    resource :session, only: [:show, :create, :destroy]
    resources :messages, only: [:index, :create, :destroy, :update]
    resources :members, only: [:create, :destroy]
    resources :channels, only: [:create, :destroy, :update, :show]
    resources :friendships, only: [:create, :destroy, :show, :index]
    resources :dms, only:[:create, :destroy, :index]
  end

  get '*path', to: "static_pages#frontend_index"
  
end
 