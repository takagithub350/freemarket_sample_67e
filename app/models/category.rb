class Category < ApplicationRecord
  has_ancestry
  def change
    add_column :categories, :ancestry, :string
    add_index :categories, :ancestry
    belongs_to :parent, class_name: :Category, optional: true
    has_many :children, class_name: :Category, foreign_key: :parent_id
  end
  
end
