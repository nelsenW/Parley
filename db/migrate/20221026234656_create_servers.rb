class CreateServers < ActiveRecord::Migration[7.0]
  def change
    create_table :servers do |t|
      t.string :name, null: false
      t.references :owner, foreign_key: {to_table: :users}
      t.string :icon
      t.timestamps
    end
  end
end
