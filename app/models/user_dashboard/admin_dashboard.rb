class UserDashboard::AdminDashboard
  attr_accessor :courses, :enrollment
  def initialize(user)
    self.courses = courses_query user
    self.enrollment = enrollment_query user
  end

  private

  def courses_query(user)
    user.courses
      .joins(:teacher)
      .joins(:registrations)
      .group(:id)
      .select(
    :id,
    :name,
    "MAX(users.name) as teacher_name",
    "AVG(grade) as average_grade",
    "COUNT(*) as enrollment"
    )

  end

  def enrollment_query(user)
    user.courses.joins(:registrations).count("DISTINCT student_id")
  end
end
