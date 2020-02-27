class TasksController < ApplicationController
    def create
        @task = Task.create(task_params)
        render json: {task: @task, message: "Task Added"}
    end

    private
    def task_params
        params.require(:task).permit(:title, :done, :day_id)
    end
end
