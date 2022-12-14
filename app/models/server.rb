# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :bigint
#  icon       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord
    validates :name, :owner_id, presence: true

    belongs_to :user,
        foreign_key: :owner_id,
        class_name: :User

    has_many :user_memberships,
        class_name: :Member,
        foreign_key: :server_id,
        dependent: :destroy

    has_many :users,
        through: :user_memberships,
        source: :user

    has_many :channels,
        dependent: :destroy

    has_one_attached :icon
end
