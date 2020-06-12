class Address < ApplicationRecord
  belongs_to :user, optional: true
  validates :zipcode, :prefecture_id, :city, :block ,presence: true
  
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :prefecture
end
