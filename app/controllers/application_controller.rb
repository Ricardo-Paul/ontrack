class ApplicationController < ActionController::Base
    # protect_from_forgery with: :null_session
    protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

    # def configure_permitted_parameters
    #     devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :password_confirmation) }
    #     devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :email, :password, :password_confirmation) }
    # end

    include Authenticate
end
