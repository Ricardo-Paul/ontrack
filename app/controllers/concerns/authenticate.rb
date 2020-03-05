module Authenticate
    def current_user
        @current_user ||= User.find_by(auth_token: request.headers['Authorization'])
    end

    def check_authorization
            render json: {errors: 'Not authenticated, Please signup/login'}, status: :unauthorized unless current_user.present?
    end
end