class Dm < ApplicationRecord
    belongs_to :friendship,
        foreign_key: :friendship_id,
        class_name: :Friend

    belongs_to :user
end
