# freemarket_sample_67e DB設計

## usersテーブル

|column|type|options|
|------|----|-------|
|nickname|string|null: false|
|first_name|string|null: false|
|first_name_kana|string|null: false|
|last_name|string|null: false|
|last_name_kana|string|null: false|
|birthday|date|null: false|
|e-mail|string|null: false|
|password|string|null: false|

### Association
- has_one :address
- has_many :creditcards
- has_mamy :comments
- has_many :products
- has_many :favorites


## addressテーブル
|column|type|options|
|------|----|-------|
|zipcode|integer|null: false|
|prefecture|integer|null: false|
|city|string|null :false|
|block|string|null :false|
|building|string||
|phone_number|string|null :false|
|user_id|integer|null :false,foreign_key:true|

### Association
- belongs_to :user


## creditcardsテーブル
|column|type|options|
|------|----|-------|
|card_number|string|null: false|
|month_data|int|null: false|
|year_data|int|null: false|
|security_code|string|null: false|
|user_id|integer|null: false,foreign_key: true|

### Association
- belongs_to :user


## commentsテーブル
|column|type|options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|product_id|integer|null :false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :product


## productsテーブル
|column|type|options|
|------|----|-------|
|product_name|string|null: false|
|price|int|null: false|
|size|string||
|status|string||
|postage|string|null: false|
|explanation|text||
|delivery_method|text||
|delivery_origin|string|null: false|
|arrival_date|string|null: false|
|brand|string||
|user_id|integer|null :false, foreign_key: true|
|category_id|integer|null :false, foreign_key: true|

### Association
- belongs_to :user
- has_mamy :comments
- has_many :images
- belongs_to :category
- has_many :favorites


## categoriesテーブル
|column|type|options|
|------|----|-------|
|name|string|null: false|
|ladies|string||
|mens|string||
|baby_kids|string||
|interior|string||
|book|string||
|ticket|string||
|other|string||

### Association
- has_mamy: products


## imagesテーブル
|column|type|options|
|------|----|-------|
|image|string|null: false|
|product_id|integer|null: false, foreign_key:true|


### Association
- belongs_to: product


## favoritesテーブル
|column|type|options|
|------|----|-------|
|user_id|integer|null: false, foreign_key:true|
|product_id|integer|null: false, foreign_key:true|

### Association
- belongs_to: user
- belongs_to: product