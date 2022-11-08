class AddColumnstoUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :status, :string
    add_column :users, :description, :string
  end
end
