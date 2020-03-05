Rails.application.routes.draw do
  devise_for :users

  get '/home', to: 'days#main'
  root to: 'days#main' #login route

  scope '/api' do
    resources :users
    resources :days
    resources :notes
    resources :tasks
    resources :lessons
    resource :sessions

    get 'getTasks', to: 'tasks#find_tasks'
    get 'toggleDone', to: 'tasks#toggle_done'
  end
end
