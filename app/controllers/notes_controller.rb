class NotesController < ApplicationController
    def index
        render json: Note.all
    end

    def create
        @note  = Note.create(note_params)
        render json: {note: @note, message: "Note saved"}
    end

    private
    def note_params
        params.require(:note).permit(:title, :content, :day_id)
    end
end
