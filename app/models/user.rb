# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  birthday        :date             not null
#  photo           :string
#  color           :string
#  status          :string
#  description     :string
#
class User < ApplicationRecord
  has_secure_password
  validates :username, :email, :session_token, uniqueness: true, presence: true
  validates :username, length: {in: 3..30}, format: {without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email"}
  validates :email, length: { in: 3..255}, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :password, length: {in:2..255, allow_nil: true}
  validates :birthday, presence: true
  
  before_validation :ensure_session_token

  has_many :messages,
    dependent: :destroy 

  has_many :server_memberships,
    class_name: :Member,
    foreign_key: :user_id,
    dependent: :destroy

  has_many :servers,
    through: :server_memberships,
    source: :server

  has_one_attached :photo


  def self.find_by_credentials(credentials,pw)
    user = URI::MailTo::EMAIL_REGEXP.match(credentials) ? User.find_by(email: credentials) : User.find_by(username: credentials);
    return nil if user.nil?
    user.authenticate(pw) ? user : nil
  end

  def reset_session_token!
    self.update!(session_token: generate_session_token)
    self.session_token
  end

  private
    def generate_session_token
      loop do
        session_token = SecureRandom::urlsafe_base64
        return session_token unless User.exists?(session_token: session_token)
      end
    end

    def ensure_session_token
      self.session_token ||= generate_session_token
    end

end
