class UserDashboard::StudentDashboard
  attr_accessor :courses, :gpa
  def initialize(user)
    self.courses = course_query user
    self.gpa = gpa_query user
  end

  private

  def course_query(user)
    user.courses
      .joins(:teacher)
      .select(:id, :name, :grade, "users.name AS teacher_name")
  end

  def gpa_query(user)
    user.courses.average(%q{
        CASE
          WHEN grade < 60 THEN 0
          WHEN (grade >= 60) AND (grade < 70) THEN 1
          WHEN (grade >= 70) AND (grade < 80) THEN 2
          WHEN (grade >= 80) AND (grade < 90) THEN 3
          WHEN grade >= 90 THEN 4
        END
                                 })
  end
end

