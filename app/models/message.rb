# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  text       :string           not null
#  user_id    :bigint           not null
#  channel_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
    belongs_to :user

    belongs_to :channel

    has_one_attached :photo
end
