class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members do |t|
      t.references :server
      t.references :user
      t.timestamps
    end
    add_index :members, [:server_id, :user_id], unique: true
  end
end
