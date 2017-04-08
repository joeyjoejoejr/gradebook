class User < ApplicationRecord
  has_secure_password
  validates :email, uniqueness: true, presence: true

  def courses
    Course.all
  end
end
