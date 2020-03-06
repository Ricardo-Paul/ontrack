class SessionsController < ApplicationController
    def create
        if !@user = User.find_by(email: params[:user][:email])
            render json: {error: "User not found"}
        else
            @user.valid_password?(params[:user][:password])
            @user.auth_token = Devise.friendly_token()
            @user.save
            sign_in @user
            
            render json: @user
        end
    end

    def destroy
        @user = User.find_by(auth_token: request.headers['Authorization'])
        @user.save
        head 204
    end
end