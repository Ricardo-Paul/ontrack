class AddDayIdToLesson < ActiveRecord::Migration[5.2]
  def change
    add_column :lessons, :day_id, :integer
  end
end
