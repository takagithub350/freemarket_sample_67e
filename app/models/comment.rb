class Comment < ApplicationRecord
  validates :text, presence: true
  belongs_to :product
  belongs_to :user
end
