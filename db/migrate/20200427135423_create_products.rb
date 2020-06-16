class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      # t.string :product_name,    null: false
      # t.integer :price,          null: false
      # t.string :size
      # t.string :status
      # t.string :postage,         null: false
      # t.text :explanation
      # t.text :delivery_method
      # t.string :delivery_origin, null: false
      # t.integer :arrival_date,   null: false
      # t.string :brand
      # t.timestamps
      t.string :product_name
      t.integer :price
      t.string :size
      t.string :status
      t.string :postage
      t.text :explanation
      t.text :delivery_method
      t.string :delivery_origin
      t.integer :arrival_date
      t.string :brand
      t.timestamps

    end
  end
end
