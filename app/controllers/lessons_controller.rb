class LessonsController < ApplicationController

    def create
        @lesson = Lesson.create(lesson_params)
        render json: {lesson: @lesson, message: "Great Keep Learning !!!"}
    end

    private
    def lesson_params
        params.require(:lesson).permit(:description, :day_id)
    end
end
