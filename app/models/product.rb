class Product < ApplicationRecord
  validates :status, :postage, :delivery_method, :delivery_origin, :arrival_date, :category_id, presence: true
  validates :price, presence: true, inclusion: 300..999999
  validates :product_name, presence: true, length: { maximum: 40 }
  validates :explanation, presence: true, length: { maximum: 1000 }
  extend ActiveHash::Associations::ActiveRecordExtensions

  belongs_to_active_hash :prefecture
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true
  validates :images, length: { minimum: 1, maximum: 5}
  belongs_to :user
  has_many :favorites, dependent: :destroy
  has_many :favorites_products, through: :favorites, source: :product
  has_many :favorited_users, through: :favorites, source: :user
end
