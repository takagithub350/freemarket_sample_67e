FactoryBot.define do
  factory :user do
    id {"1"}
    password = Faker::Internet.password(min_length: 7)
    nickname {"カツオ"}
    last_name {"磯野"} 
    first_name {"勝男"}
    last_name_kana {"イソノ"}
    first_name_kana {"カツオ"}
    birth_date {"2000-01-01"}

    email {Faker::Internet.free_email}
    encrypted_password {password}
  end
end