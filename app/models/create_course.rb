class CreateCourse < CourseService
  validates_presence_of :name, :current_user
  validate :students_are_valid
  attr_accessor :name, :students, :current_user

  def initialize(_)
    super
    self.students ||= []
  end

  def save
    if valid?
      persist!
    end
  end

  private

  def persist!
    self.course = Course.new name: name, teacher_id: current_user.id

    students.each do |student|
      course.registrations.build(
        student_id: student.fetch(:id),
        grade: student.fetch(:grade)
      )
    end

    course.save!
  end

  def students_are_valid
    students.each do |student_hash|
      student = StudentValidator.new(student_hash)
      unless student.valid?
        student.errors.full_messages.each do |err|
          errors.add :student, err
        end
      end
    end
  end
end
