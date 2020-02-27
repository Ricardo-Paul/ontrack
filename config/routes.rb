Rails.application.routes.draw do
  # get 'days/index'
  root to: 'days#main'
  scope '/api' do
    resources :days
    resources :notes
    resources :tasks
    resources :lessons
  end
end
