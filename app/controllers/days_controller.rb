class DaysController < ApplicationController
    def main
    end
    
    def index
       render json: @days = Day.all.order("created_at DESC")
    end

    def create 
        @day = Day.create(day_params)
        render json: @day
    end

    private 
    def day_params
        params.require(:day).permit(:chosen_date)
    end
end
