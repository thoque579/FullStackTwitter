class Session < ApplicationRecord
  belongs_to :user

  before_validation :generate_session_token

  private

  def generate_session_token
    self.token = SecureRandom.urlSafe_base64
  end
end
