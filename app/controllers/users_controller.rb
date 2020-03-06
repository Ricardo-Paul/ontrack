class UsersController < ApplicationController

    def index
        render json: User.all
    end

    def create
        @user = User.new(user_params)
        @user.auth_token = Devise.friendly_token()
        @user.save
        render json: @user
        if !@user.save
            render json: @user.errors
        end
    end

    private
    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
