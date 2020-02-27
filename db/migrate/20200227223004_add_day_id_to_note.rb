class AddDayIdToNote < ActiveRecord::Migration[5.2]
  def change
    add_column :notes, :day_id, :integer
  end
end
