class CourseService
  class StudentValidator
    include ActiveModel::Model
    validates_presence_of :id, :grade
    attr_accessor :id, :grade
  end

  include ActiveModel::Model
  include ActiveModel::Serialization

  attr_accessor :course
  delegate :id, :teacher, to: :course, allow_nil: true
  delegate :students, :name, to: :course, prefix: true
end
