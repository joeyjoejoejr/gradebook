class Api::UsersController < ApiController
  before_action :authenticate_user

  def index
    render json: current_user, serializer: UserSerializer
  end

  def dashboard
    user_dashboard = case current_user
      when Student
        {
          courses: current_user.courses.joins(:teacher).select(:id, :name, :grade, "users.name AS teacher_name"),
          gpa: current_user.courses.average(%q{
            CASE
              WHEN grade < 60 THEN 0
              WHEN (grade >= 60) AND (grade < 70) THEN 1
              WHEN (grade >= 70) AND (grade < 80) THEN 2
              WHEN (grade >= 80) AND (grade < 90) THEN 3
              WHEN grade >= 90 THEN 4
            END })
        }
      when Admin
        courses = current_user.courses
          .select(
            :id,
            :name,
            "MAX(users.name) as teacher_name",
            "AVG(grade) as average_grade",
            "COUNT(*) as enrollment"
          )
          .joins(:teacher)
          .joins(:registrations)
          .group(:id)

        {
          courses: courses,
          enrollment: current_user.courses.joins(:registrations).count("DISTINCT student_id")
        }
      when Teacher
        current_user.courses
      end

    render json: user_dashboard
  end
end