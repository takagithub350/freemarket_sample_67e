FactoryBot.define do
  factory :image do
    image   {File.open("#{Rails.root}/spec/images/Unknown.jpeg")}
    product
  end
end