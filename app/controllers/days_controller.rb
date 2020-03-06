class DaysController < ApplicationController
    before_action :check_authorization, only: [:index, :create]

    def main
    end
    
    def index

        # @days = @current_user.days.order("created_at DESC")
        @days = Day.where(user_id: @current_user.id)
        render json: @days
    end
    
    def create
        @day = @current_user.days.build(day_params)
        @day.save
        render json: @day
    end
    
    private 
    def day_params
        params.require(:day).permit(:chosen_date, :user_id)
    end
end
