class AddDayIdToTask < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :day_id, :integer
  end
end
