class LessonsController < ApplicationController

	def index
		@lessons = Lesson.all 
		render json: @lessons
	end

    def create
        @lesson = Lesson.create(lesson_params)
        render json: @lesson
    end

    def getLessons
    	@lessons = Lesson.where(day_id: params[:day_id])
    	render json: @lessons
    end

    private
    def lesson_params
        params.require(:lesson).permit(:description, :day_id)
    end
end
