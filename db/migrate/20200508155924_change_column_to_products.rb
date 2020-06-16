class ChangeColumnToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :user_id, :integer, null: false, foreign_key: true
    add_column :products, :category_id, :integer, null: false, foreign_key: true
  end
  # 変更内容
  def up
    change_column :products, :arrival_date, :string, null: false
  end

  # 変更前の状態
  def down
    change_column :products, :arrival_date, :integer, null: true
  end
end
