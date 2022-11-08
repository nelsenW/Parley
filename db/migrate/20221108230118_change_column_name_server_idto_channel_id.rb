class ChangeColumnNameServerIdtoChannelId < ActiveRecord::Migration[7.0]
  def change
    rename_column :channels, :server_type, :channel_type
  end
end
