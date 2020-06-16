class ChangeDatatypeArrivalDateOfProducts < ActiveRecord::Migration[5.2]
  def change
    change_column :products, :arrival_date, :string
  end
end
