class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :text, null: false, index: true
      t.references :user, null: false
      t.references :server, null: false
      t.timestamps
    end
  end
end
