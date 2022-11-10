class CreateDms < ActiveRecord::Migration[7.0]
  def change
    create_table :dms do |t|
      t.references :friendship, unique: true
      t.references :user
      t.string :text
      t.timestamps
    end
  end
end
