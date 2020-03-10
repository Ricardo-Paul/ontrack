Rails.application.routes.draw do
  devise_for :users

  get '/home', '/signup', to: 'days#main'
  root to: 'days#main'

  scope '/api' do
    resources :users
    resources :days
    resources :notes
    resources :tasks
    resources :lessons
    resource :sessions

    get 'getNotes', to: 'notes#getNotes'
    get 'getTasks', to: 'tasks#find_tasks'
    get 'toggleDone', to: 'tasks#toggle_done'

    get 'getLessons', to: 'lessons#getLessons'
  end
end
