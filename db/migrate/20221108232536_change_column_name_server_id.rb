class ChangeColumnNameServerId < ActiveRecord::Migration[7.0]
  def change
    rename_column :messages, :server_id, :channel_id
  end
end
