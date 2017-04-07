class Api::CoursesController < ApiController
  def index
    render json: Course.all
  end

  def create
    students = student_params.fetch(:students, [])
    course = Course.new course_params

    students.each do |student|
      course.registrations.build(
        student_id: student.fetch(:id),
        grade: student.fetch(:grade, nil)
      )
    end

    if course.save
      render json: course, status: :created
    else
      render json: { errors: course.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def update
    students = student_params.fetch(:students, [])
    student_ids = students.map { |student| student.fetch(:id) }
    update_params = course_params.merge(student_ids: student_ids)
    course = Course.find params[:id]
    if course.update update_params
      students.each do |student|
        course.registrations
          .where(student_id: student.fetch(:id))
          .update_all(grade: student.fetch(:grade, nil))
      end
      render json: course
    else
      render json: { errors: course.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def destroy
    Course.destroy params[:id]
  end

  private

  def course_params
    params.require(:course).permit(:name)
  end

  def student_params
    params.require(:course).permit(students: [:id, :name, :grade])
  end
end
