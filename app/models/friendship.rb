# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  user_id    :bigint
#  friend_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Friendship < ApplicationRecord

    belongs_to :user
    belongs_to :other_user,
        class_name: :User,
        foreign_key: :friend_id

    has_many :dms,
    dependent: :destroy
end
