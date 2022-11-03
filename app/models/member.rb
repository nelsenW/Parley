# == Schema Information
#
# Table name: members
#
#  id         :bigint           not null, primary key
#  server_id  :bigint
#  user_id    :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Member < ApplicationRecord
    belongs_to :server
    belongs_to :user
end
