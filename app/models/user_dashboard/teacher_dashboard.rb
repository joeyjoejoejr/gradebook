class UserDashboard::TeacherDashboard
  attr_accessor :courses
  def initialize(user)
    self.courses = serialized_courses user.courses
  end

  private

  def serialized_courses(courses)
    ActiveModelSerializers::SerializableResource.new(courses)
  end
end
