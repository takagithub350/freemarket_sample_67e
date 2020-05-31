class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :validatable, password_length: 7..128
  devise :database_authenticatable, :validatable, email_regexp: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  devise :database_authenticatable, :registerable,:recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: [:facebook, :google_oauth2]

  has_many :sns_credentials
  
  validates :nickname, :birth_date, presence: true
  validates :first_name, :last_name, presence: true, format: { with: /\A[一-龥ぁ-ん]/}
  validates :first_name_kana, :last_name_kana, presence: true, format: { with: /\A[\p{katakana}\p{blank}ー－]+\z/}
  has_one :address

  def self.from_omniauth(auth)
    sns = SnsCredential.where(provider: auth.provider, uid: auth.uid).first_or_create
    user = sns.user || User.where(email: auth.info.email).first_or_initialize(
      nickname: auth.info.name,
      email: auth.info.email
    )
    if user.persisted?
      sns.user = user
      sns.save
    end
    { user: user, sns: sns } 
  end
end
