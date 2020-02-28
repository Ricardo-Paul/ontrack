Rails.application.routes.draw do
  # get 'days/index'
  root to: 'days#main'
  scope '/api' do
    resources :days
    resources :notes
    resources :tasks
    resources :lessons

    get 'getTasks', to: 'tasks#find_tasks'
    get 'toggleDone', to: 'tasks#toggle_done'
  end
end
