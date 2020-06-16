require 'rails_helper'
describe Product do
  describe '#create' do
    it "全ての必須項目が入力されている場合出品できる" do
      product = FactoryBot.build(:product)
      expect(product).to be_valid
    end
  end
end