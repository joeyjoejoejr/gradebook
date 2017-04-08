class UpdateCourse < CourseService
  attr_accessor :params

  validates_presence_of :course, :params

  def initialize(_)
    super
    self.params[:students] ||= [] if params
  end

  def update
    if valid?
      persist!
    end
  end

  private

  def persist!
    student_ids = params.fetch(:students).map { |student| student[:id] }
    course_params = params.slice(:name).merge(student_ids: student_ids)

    self.course.update(course_params).tap do |updated|
      if updated
        params.fetch(:students).each do |student|
          course.registrations
            .where(student_id: student.fetch(:id))
            .update(grade: student.fetch(:grade, nil))
        end
      end
    end
  end
end
