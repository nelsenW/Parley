# == Schema Information
#
# Table name: dms
#
#  id            :bigint           not null, primary key
#  friendship_id :bigint
#  user_id       :bigint
#  text          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Dm < ApplicationRecord
    belongs_to :friendship,
        foreign_key: :friendship_id,
        class_name: :Friendship

    belongs_to :user

    has_one_attached :photo
end
