FactoryBot.define do
  factory :product do
    id                {"1"}
    product_name      {"hoge"}
    explanation       {Faker::Lorem.sentence}
    status            {"新品、未使用"}
    postage           {"送料込み（出品者負担）"}
    delivery_method   {"レターパック"}
    delivery_origin   {"1"}
    arrival_date      {"４〜７日で発送"}
    price             {"9999"}
    user_id           {"1"}
    category_id       {"2"}
    buyer_id          {""}

    after(:build) do |product|
      product.images << build(:image, product: product)
    end 
  end
end