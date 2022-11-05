class AddPhototoUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :photo, :string
    add_column :users, :color, :string 
  end
end
