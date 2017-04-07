class Registration < ApplicationRecord
  validates_inclusion_of :grade, in: 0..100
  belongs_to :student
  belongs_to :course
end
