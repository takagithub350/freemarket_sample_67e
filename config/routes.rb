Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',  
    omniauth_callbacks: 'users/omniauth_callbacks',
  }
  devise_scope :user do
    get 'addresses', to: 'users/registrations#new_address'
    post 'addresses', to: 'users/registrations#create_address'
  end
  root to: 'toppages#index'
  resources :users, only: [:new, :index] do
    collection do
      get 'logout'
    end
  end
  resources 'categorys', only: [:index]

  resources :creditcards, only: [:new]
  resources :products, only: [:index, :new, :create]
  resources :products, only: [:new] do
    collection do
      get 'check'
    end
  end
  
  resources :products do
    collection do
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: { format: 'json' }
      get 'delete', to: 'products#delete'
    end
  end


  get 'show/index', to: 'show#index'

  resources :card, only: [:new, :show] do
    collection do
      post 'show', to: 'card#show'
      post 'pay', to: 'card#pay'
      post 'delete', to: 'card#delete'
    end
  end

  resources :purchase, only: [:index] do
    collection do
      post 'pay', to: 'purchase#pay'
      get 'done', to: 'purchase#done'
    end
  end
end
