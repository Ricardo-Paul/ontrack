class NotesController < ApplicationController
    def index
        render json: Note.all
    end

    def create
        @note  = Note.create(note_params)
        render json: {note: @note, message: "Note saved"}
    end

    def getNotes
        @notes = Note.where(day_id: params[:day_id])
        render json: @notes
    end

    private
    def note_params
        params.require(:note).permit(:title, :content, :day_id)
    end
end
