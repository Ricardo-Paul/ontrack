class TasksController < ApplicationController
    def create
        @task = Task.create(task_params)
        render json: {task: @task, message: "Task Added"}
    end

    def find_tasks
        @tasks = Task.where(day_id: params[:day_id])
        render json: @tasks
    end

    def toggle_done
        @task = Task.find(params[:id])
        @task.done = !@task.done
        @task.save
        render json: {task: @task, message:"checked unchecked"}
    end

    def update
        @task = Task.find_by(id: params[:id])
        @task.update(task_params)
        @task.save 

        @tasks = Task.where(day_id: params[:day_id])
        render json: @tasks
    end

    private
    def task_params
        params.require(:task).permit(:title, :done, :day_id)
    end
end
