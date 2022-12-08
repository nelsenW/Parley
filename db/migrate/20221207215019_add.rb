class Add < ActiveRecord::Migration[7.0]
  def change
    add_column :dms, :photo, :string
    add_column :messages, :photo, :string
  end
end
