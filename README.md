# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


# freemarket_sample_67e DB設計


## usersテーブル

|column|type|options|
|------|----|-------|
|name|varchar|null: false|
|e-mail|varchar|null: false|
|password|varchar|null: false|
|first_name|varchar|null: false|
|first_name_kana|varchar|null: false|
|last_name|varchar|null: false|
|last_name_kana|varchar|null: false|
|birthday|date|null: false|
|phone_number|varchar|null: false|

### Association
- has_many :address
- has_many :creditcards
- has_many :messages, through: :users_messages
- has_mamy :comments
- has_many :products


## user_messagesテーブル
|column|type|options|
|------|----|-------|
|user_id|string|null: false,foreign_key:true|
|message_id|string|null: false,foreign_key:true|

### Association
- belongs_to :users
- belongs_to :messages


## messagesテーブル
|column|type|options|
|------|----|-------|
|messages_text|text|null: false|

### Asociation
- has_many: users,through: :users_messages


## addressテーブル
|column|type|options|
|------|----|-------|
|postcode|varchar|null: false|
|city|varchar|null: false|
|city_block|varchar|null :false|
|building|varchar|null :false|
|user_id|integer|null :false,foreign_key:true|

### Association
- belongs_to :users
- belongs_to :prefectures


## creditcardsテーブル
|column|type|options|
|------|----|-------|
|card_number|varchar|null: false|
|month_data|int|null: false|
|year_data|int|null: false|
|security_code|varchar|null: false|
|user_id|integer|null: false,foreign_key: true|

### Asociation
- belongs_to :users


## commentsテーブル
|column|type|options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|product_id|integer|null :false, foreign_key: true|

### Association
- belongs_to :users
- belongs_to :products

## prefecturesテーブル
|column|type|options|
|------|----|-------|
|prefecture|varchar|null: false|
|address_id|integer|null: false,foreign_key:true|

### Association
- has_many: address


## productsテーブル
|column|type|options|
|------|----|-------|
|products_name|varchar|null: false|
|price|int|null: false|
|size|varchar||
|status|varchar||
|postage|varchar|null: false|
|explanation|text||
|delivery_method|text||
|delivery_origin|varchar|null: false|
|arrival_date|int|null: false|
|brand|varchar||

### Asociation
- belongs_to :users
- has_mamy :comments
- has_many :images
- has_many :categories,through: :products_categories


## products_categoriesテーブル
|column|type|options|
|------|----|-------|
|product_id|string|null: false,foreign_key:true|
|category_id|string|null: false,foreign_key:true|

### Association
- belongs_to :products
- belongs_to :categories



## categoriesテーブル
|column|type|options|
|------|----|-------|
|ladies|varchar||
|mens|varchar||
|baby_kids|varchar||
|interior|varchar||
|book|varchar||
|ticket|varchar||
|other|varchar||

### Association
- has_mamy: products,though: :products_categories


## imagesテーブル
|column|type|options|
|------|----|-------|
|image|string|null: false|
|product_id|string|null:, foreign_key:true|


### Association
belongs_to: products