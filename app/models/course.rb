class Course < ApplicationRecord
  validates_presence_of :name
  has_many :registrations
  has_many :students, through: :registrations
end
